const test = require('node:test');
const assert = require('node:assert');
const { pruneHistory, PROVIDERS, routeChat, providerState, getProviderKey, isCooldownActive } = require('./provider-router');

test('pruneHistory tests', async (t) => {
  await t.test('keeps history within message and token limits', () => {
    const history = Array.from({ length: 30 }, (_, i) => ({
      role: i % 2 === 0 ? 'user' : 'assistant',
      content: 'Hello ' + i
    }));
    const pruned = pruneHistory(history);
    assert.ok(pruned.length <= 20, 'History should be at most 20 messages');
  });

  await t.test('handles empty history', () => {
    const pruned = pruneHistory([]);
    assert.deepStrictEqual(pruned, []);
  });
});

test('Legacy models deprecated check', () => {
  const deprecated = PROVIDERS.find(p => p.status === 'deprecated');
  assert.ok(deprecated, 'Should have a deprecated provider');
  
  const shutdownDate = new Date(deprecated.shutdownDate);
  const beforeShutdown = new Date('2026-08-15');
  const afterShutdown = new Date('2026-08-17');

  assert.ok(beforeShutdown < shutdownDate, 'Aug 15 is before shutdown');
  assert.ok(afterShutdown >= shutdownDate, 'Aug 17 is after shutdown');
});

test('routeChat fallback to local_fallback when keys are missing', async () => {
  const origGroqKey = process.env.GROQ_API_KEY;
  const origGeminiKey = process.env.GEMINI_API_KEY;

  delete process.env.GROQ_API_KEY;
  delete process.env.GEMINI_API_KEY;

  const dummyProfile = {
    name: 'Md Sayem Ahamed',
    summary: 'pytorch brainstorm brain tumor classification'
  };

  try {
    const result = await routeChat(dummyProfile, 'hi', [], 'System prompt');
    assert.strictEqual(result.provider, 'local_fallback', 'Should fall back to local_fallback');
    assert.ok(result.answer.includes('ByteBuddy'), 'Should return chatbot greeting answer');
    assert.strictEqual(result.fallbackUsed, true, 'fallbackUsed should be true');
  } finally {
    if (origGroqKey) process.env.GROQ_API_KEY = origGroqKey;
    if (origGeminiKey) process.env.GEMINI_API_KEY = origGeminiKey;
  }
});

test('routeChat handles oversized context HTTP 400 retry', async () => {
  const origGroqKey = process.env.GROQ_API_KEY;
  process.env.GROQ_API_KEY = 'mock_key';
  
  const origFetch = globalThis.fetch;
  let callCount = 0;
  
  globalThis.fetch = async (url, options) => {
    callCount++;
    if (callCount === 1) {
      return {
        status: 400,
        ok: false,
        text: async () => 'Context length exceeded maximum sequence limit.',
      };
    } else {
      return {
        status: 200,
        ok: true,
        json: async () => ({
          choices: [{
            message: { content: 'Success on retry!' }
          }]
        })
      };
    }
  };

  const dummyProfile = { name: 'Sayem' };
  const history = [
    { role: 'user', content: 'Long history message 1' },
    { role: 'assistant', content: 'Long history response 1' }
  ];

  try {
    const result = await routeChat(dummyProfile, 'test query', history, 'System instructions');
    assert.strictEqual(result.answer, 'Success on retry!', 'Should succeed on retry');
    assert.strictEqual(result.model, 'qwen/qwen3.6-27b', 'Should be Qwen model');
    assert.strictEqual(callCount, 2, 'Should have called fetch exactly twice');
  } finally {
    globalThis.fetch = origFetch;
    if (origGroqKey) {
      process.env.GROQ_API_KEY = origGroqKey;
    } else {
      delete process.env.GROQ_API_KEY;
    }
  }
});

test('routeChat puts provider on cooldown after HTTP 429', async () => {
  const origGroqKey = process.env.GROQ_API_KEY;
  process.env.GROQ_API_KEY = 'mock_key';
  
  const origFetch = globalThis.fetch;
  
  globalThis.fetch = async (url, options) => {
    return {
      status: 429,
      ok: false,
      headers: {
        get: (name) => name === 'retry-after' ? '30' : null
      },
      text: async () => 'Rate limit exceeded',
      json: async () => ({ error: { message: 'Rate limit exceeded' } })
    };
  };

  const dummyProfile = { 
    name: 'Sayem',
    summary: 'pytorch'
  };
  const history = [{ role: 'user', content: 'test' }];

  try {
    const result = await routeChat(dummyProfile, 'test query', history, 'System instructions');
    
    assert.strictEqual(result.provider, 'local_fallback', 'Should fall back to local_fallback after 429');
    assert.strictEqual(result.fallbackUsed, true, 'fallbackUsed should be true');
    
    const providerKey = getProviderKey({ provider: 'groq', model: 'qwen/qwen3.6-27b' });
    const state = providerState.get(providerKey);
    assert.ok(state, 'Should have state for provider');
    assert.ok(isCooldownActive(state), 'Provider should be on cooldown');
    
    const now = Date.now();
    assert.ok(state.cooldownUntil > now, 'cooldownUntil should be in the future');
    // Cooldown should be at least a few seconds (from retry-after or default)
    assert.ok(state.cooldownUntil - now >= 1000, 'Cooldown should be set');
  } finally {
    globalThis.fetch = origFetch;
    providerState.clear();
    if (origGroqKey) {
      process.env.GROQ_API_KEY = origGroqKey;
    } else {
      delete process.env.GROQ_API_KEY;
    }
  }
});

test('routeChat skips provider on cooldown', async () => {
  const origGroqKey = process.env.GROQ_API_KEY;
  process.env.GROQ_API_KEY = 'mock_key';
  
  providerState.clear();
  
  const providerKey = getProviderKey({ provider: 'groq', model: 'qwen/qwen3.6-27b' });
  providerState.set(providerKey, {
    active: false,
    cooldownUntil: Date.now() + 60000,
    lastRemainingTokens: null,
    lastResetAt: null,
    recentUsage: []
  });

  const origFetch = globalThis.fetch;
  let callCount = 0;
  
  globalThis.fetch = async (url, options) => {
    callCount++;
    return {
      status: 200,
      ok: true,
      json: async () => ({
        choices: [{
          message: { content: 'Second provider success!' }
        }]
      })
    };
  };

  const dummyProfile = { 
    name: 'Sayem',
    summary: 'pytorch'
  };
  const history = [{ role: 'user', content: 'test' }];

  try {
    const result = await routeChat(dummyProfile, 'test query', history, 'System instructions');
    
    assert.strictEqual(result.model, 'openai/gpt-oss-120b', 'Should skip cooldown provider and use next available');
    assert.strictEqual(result.answer, 'Second provider success!', 'Should return second provider response');
    assert.strictEqual(callCount, 1, 'Should have made only one external call');
  } finally {
    globalThis.fetch = origFetch;
    providerState.clear();
    if (origGroqKey) {
      process.env.GROQ_API_KEY = origGroqKey;
    } else {
      delete process.env.GROQ_API_KEY;
    }
  }
});