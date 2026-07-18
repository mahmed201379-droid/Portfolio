const GROQ_API_BASE = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_TIMEOUT_MS = 60000;
const MAX_RESPONSE_TOKENS = 500;

function stripThinking(content) {
  if (!content) return content;
  return content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/<<SYS>>[\s\S]*?<</g, '')
    .replace(/^.*?<\/think>\s*/, '')
    .trim();
}

function buildGroqMessages(systemPrompt, history, message) {
  const messages = [{ role: 'system', content: systemPrompt }];
  if (Array.isArray(history)) {
    for (const entry of history) {
      if (entry && (entry.role === 'user' || entry.role === 'assistant')) {
        messages.push({ role: entry.role, content: entry.content || '' });
      }
    }
  }
  messages.push({ role: 'user', content: message });
  return messages;
}

async function generateWithGroq({ model, systemPrompt, message, history, timeoutMs }) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.log(`Groq skipped (${model}): GROQ_API_KEY not set`);
    return { content: null, status: null, error: 'GROQ_API_KEY not set' };
  }

  const messages = buildGroqMessages(systemPrompt, history, message);
  const timeout = (typeof timeoutMs === 'number' && timeoutMs > 0) ? timeoutMs : DEFAULT_TIMEOUT_MS;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const body = {
      model,
      messages,
      max_tokens: MAX_RESPONSE_TOKENS,
      temperature: 0.7,
    };

    // Only Qwen supports the 'reasoning' parameter
    if (model.startsWith('qwen/')) {
      body.reasoning = false;
    }

    const response = await fetch(GROQ_API_BASE, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (response.status === 429) {
      const retryAfter = response.headers.get('retry-after') || 'unknown';
      console.log(`Groq rate limited (${model}): retry-after ${retryAfter}s`);
      return { content: null, status: 429, error: `Rate limited. Retry after: ${retryAfter}s` };
    }

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      console.log(`Groq error (${model}): ${response.status}`);
      return { content: null, status: response.status, error: errText };
    }

    const data = await response.json().catch(() => ({}));

    if (!data || typeof data !== 'object') {
      console.log(`Groq invalid response (${model}): not an object`);
      return { content: null, status: 200, error: 'Invalid JSON response from Groq (not an object)' };
    }

    const choices = data.choices;
    if (!Array.isArray(choices) || choices.length === 0) {
      console.log(`Groq empty choices (${model})`);
      return { content: null, status: 200, error: 'Groq response choices array is empty' };
    }

    const choice = choices[0];
    if (!choice.message || typeof choice.message.content !== 'string') {
      console.log(`Groq missing message content (${model})`);
      return { content: null, status: 200, error: 'Groq response choice does not contain valid message content' };
    }

    const rawContent = choice.message.content.trim();
    const content = stripThinking(rawContent);
    if (content.length === 0) {
      console.log(`Groq empty completion after strip (${model})`);
      return { content: null, status: 200, error: 'Groq response choice has empty message content after strip' };
    }

    return { content, status: 200, error: null };
  } catch (err) {
    clearTimeout(timer);
    const isTimeout = err.name === 'AbortError' || err.name === 'TimeoutError';
    if (isTimeout) {
      console.log(`Groq timeout (${model}): exceeded ${timeout}ms`);
      return { content: null, status: 408, error: `Timeout of ${timeout}ms exceeded` };
    } else {
      console.log(`Groq exception (${model}): ${err.message}`);
      return { content: null, status: 500, error: err.message };
    }
  }
}

module.exports = { generateWithGroq };
