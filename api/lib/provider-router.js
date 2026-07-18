const { generateWithGroq } = require('../providers/groq');
const { generateWithGemini } = require('../providers/gemini');
const { structuredFallback } = require('./local-fallback');
const {
  MAX_HISTORY_MESSAGES,
  MAX_HISTORY_TOKENS,
  estimateTokens,
  estimateRequestTokens,
  fitsModelBudget,
} = require('./context-budget');
const { getActiveModels, logDeprecationWarnings } = require('../../config/models');

const PROVIDERS = getActiveModels();

logDeprecationWarnings();

const providerState = new Map();

function getProviderKey(providerConfig) {
  if (!providerConfig || !providerConfig.provider || !providerConfig.model) {
    return null;
  }
  return `${providerConfig.provider}:${providerConfig.model}`;
}

function pruneHistory(history) {
  if (!Array.isArray(history) || history.length === 0) return [];

  let pruned = [...history];

  if (pruned.length > MAX_HISTORY_MESSAGES) {
    pruned = pruned.slice(-MAX_HISTORY_MESSAGES);
  }

  while (pruned.length > 0) {
    let total = 0;
    for (const msg of pruned) {
      total += estimateTokens(msg.content || '');
    }
    if (total <= MAX_HISTORY_TOKENS) break;
    pruned.shift();
  }

  return pruned;
}

function isOversizedContextError(status, errorText) {
  if (status !== 400) return false;
  if (!errorText) return false;
  const lower = errorText.toLowerCase();
  return lower.includes('context') ||
         lower.includes('token') ||
         lower.includes('limit') ||
         lower.includes('length') ||
         lower.includes('exceed');
}

function isCooldownActive(state) {
  if (!state || !state.cooldownUntil) return false;
  return Date.now() < state.cooldownUntil;
}

async function callProvider(providerConfig, systemPrompt, message, history) {
  if (providerConfig.provider === 'groq') {
    return await generateWithGroq({
      model: providerConfig.model,
      systemPrompt,
      message,
      history,
      timeoutMs: providerConfig.timeoutMs
    });
  } else if (providerConfig.provider === 'gemini') {
    return await generateWithGemini({
      systemPrompt,
      message,
      history,
      timeoutMs: providerConfig.timeoutMs
    });
  }
  return { content: null, status: null, error: 'Unknown provider' };
}

function updateProviderState(providerKey, state) {
  providerState.set(providerKey, state);
}

async function routeChat(profile, message, history, systemPrompt) {
  const prunedHistory = pruneHistory(history);
  const attemptedModels = new Set();

  for (let i = 0; i < PROVIDERS.length; i++) {
    const providerConfig = PROVIDERS[i];
    const providerKey = getProviderKey(providerConfig);
    const state = providerState.get(providerKey);

    if (isCooldownActive(state)) {
      console.log(`Skipping ${providerConfig.provider} (${providerConfig.model}): on cooldown until ${new Date(state.cooldownUntil).toISOString()}`);
      continue;
    }

    if (!providerConfig.model) {
      console.log(`Skipping entry ${i}: missing model ID`);
      continue;
    }

    if (attemptedModels.has(providerConfig.model)) {
      console.log(`Skipping entry ${i} (${providerConfig.model}): already attempted`);
      continue;
    }

    if (providerConfig.provider === 'groq' && !process.env.GROQ_API_KEY) {
      console.log(`Skipping entry ${i} (${providerConfig.model}): GROQ_API_KEY missing`);
      continue;
    }
    if (providerConfig.provider === 'gemini' && !process.env.GEMINI_API_KEY) {
      console.log(`Skipping entry ${i} (${providerConfig.model}): GEMINI_API_KEY missing`);
      continue;
    }

    const estimated = estimateRequestTokens(systemPrompt, prunedHistory, message);
    if (!fitsModelBudget(providerConfig.model, estimated)) {
      console.log(`Skipping entry ${i} (${providerConfig.model}): estimate ~${estimated} tok exceeds safe budget`);
      continue;
    }

    console.log(`Trying provider ${providerConfig.provider} (${providerConfig.model})`);
    attemptedModels.add(providerConfig.model);

    const result = await callProvider(providerConfig, systemPrompt, message, prunedHistory);

    if (result && result.content) {
      return {
        answer: result.content,
        provider: providerConfig.provider,
        model: providerConfig.model,
        fallbackUsed: attemptedModels.size > 1
      };
    }

    if (result && result.status === 429) {
      let retryAfter = 60;
      if (result.error && typeof result.error === 'string') {
        const retryMatch = result.error.match(/retry after:\s*(\d+)/i);
        if (retryMatch && retryMatch[1]) {
          retryAfter = parseInt(retryMatch[1], 10);
        }
      }
      const cooldownUntil = Date.now() + retryAfter * 1000;
      updateProviderState(providerKey, {
        active: false,
        cooldownUntil,
        lastRemainingTokens: state?.lastRemainingTokens ?? null,
        lastResetAt: state?.lastResetAt ?? null,
        recentUsage: state?.recentUsage ?? []
      });
      console.log(`Provider ${providerConfig.provider} (${providerConfig.model}) rate limited, cooling down until ${new Date(cooldownUntil).toISOString()}`);
      console.log(`Provider ${providerConfig.provider} (${providerConfig.model}) failed, trying next`);
      continue;
    }

    if (result && isOversizedContextError(result.status, result.error)) {
      console.warn(`[DIAGNOSTIC] HTTP 400 oversized context for model ${providerConfig.model}. Error: ${result.error}`);
      
      if (prunedHistory.length > 0) {
        const reducedHistory = prunedHistory.slice(Math.ceil(prunedHistory.length / 2));
        const newEstimate = estimateRequestTokens(systemPrompt, reducedHistory, message);
        
        if (fitsModelBudget(providerConfig.model, newEstimate)) {
          console.log(`Retrying reconstructed request for ${providerConfig.model} with reduced history (${reducedHistory.length} messages)`);
          
          const retryResult = await callProvider(providerConfig, systemPrompt, message, reducedHistory);
          if (retryResult && retryResult.content) {
            return {
              answer: retryResult.content,
              provider: providerConfig.provider,
              model: providerConfig.model,
              fallbackUsed: true
            };
          }
        } else {
          console.log(`New token estimate ~${newEstimate} still exceeds safe budget for ${providerConfig.model}`);
        }
      } else {
        console.log(`History already empty. Cannot reduce context further for ${providerConfig.model}`);
      }
    }

    console.log(`Provider ${providerConfig.provider} (${providerConfig.model}) failed, trying next`);
  }

  console.log('All API providers failed, using local fallback');
  const fallbackAnswer = structuredFallback(profile, message, history);
  return {
    answer: fallbackAnswer,
    provider: 'local_fallback',
    model: null,
    fallbackUsed: true,
  };
}

module.exports = { routeChat, pruneHistory, PROVIDERS, providerState, getProviderKey, isCooldownActive };