const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const DEFAULT_TIMEOUT_MS = 60000;
const MAX_OUTPUT_TOKENS = 500;

function buildGeminiContents(systemPrompt, history, message) {
  const contents = [];
  if (Array.isArray(history)) {
    for (const entry of history) {
      if (!entry || typeof entry.content !== 'string') continue;
      const role = entry.role === 'assistant' ? 'model' : 'user';
      contents.push({ role, parts: [{ text: entry.content }] });
    }
  }
  contents.push({ role: 'user', parts: [{ text: message }] });
  return contents;
}

async function generateWithGemini({ systemPrompt, message, history, timeoutMs }) {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL;

  if (!apiKey) {
    console.log('Gemini skipped: GEMINI_API_KEY not set');
    return { content: null, status: null, error: 'GEMINI_API_KEY not set' };
  }
  if (!model) {
    console.log('Gemini skipped: GEMINI_MODEL not set');
    return { content: null, status: null, error: 'GEMINI_MODEL not set' };
  }

  const contents = buildGeminiContents(systemPrompt, history, message);
  if (contents.length === 0) {
    console.log('Gemini skipped: empty contents');
    return { content: null, status: null, error: 'Empty contents' };
  }

  const timeout = (typeof timeoutMs === 'number' && timeoutMs > 0) ? timeoutMs : DEFAULT_TIMEOUT_MS;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  const url = `${GEMINI_API_BASE}/${model}:generateContent`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents,
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: {
          maxOutputTokens: MAX_OUTPUT_TOKENS,
          temperature: 0.7,
        },
      }),
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (response.status === 429 || response.status === 403) {
      console.log(`Gemini quota exhausted (${model}): ${response.status}`);
      return { content: null, status: response.status, error: 'Gemini quota exhausted or permission denied' };
    }

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      console.log(`Gemini error (${model}): ${response.status}`);
      return { content: null, status: response.status, error: errText };
    }

    const data = await response.json().catch(() => ({}));

    if (!data || typeof data !== 'object') {
      console.log(`Gemini invalid response (${model}): not an object`);
      return { content: null, status: 200, error: 'Gemini response is not an object' };
    }

    const candidates = data.candidates;
    if (!Array.isArray(candidates) || candidates.length === 0) {
      console.log(`Gemini empty candidates (${model})`);
      return { content: null, status: 200, error: 'Gemini candidates array is empty' };
    }

    const candidate = candidates[0];
    if (!candidate.content || typeof candidate.content !== 'object') {
      console.log(`Gemini missing content (${model})`);
      return { content: null, status: 200, error: 'Gemini candidate content is missing' };
    }

    const parts = candidate.content.parts;
    if (!Array.isArray(parts) || parts.length === 0) {
      console.log(`Gemini empty parts (${model})`);
      return { content: null, status: 200, error: 'Gemini candidate parts array is empty' };
    }

    const text = parts[0].text;
    if (typeof text !== 'string' || text.trim().length === 0) {
      console.log(`Gemini empty completion (${model})`);
      return { content: null, status: 200, error: 'Gemini completion text is empty' };
    }

    return { content: text.trim(), status: 200, error: null };
  } catch (err) {
    clearTimeout(timer);
    const isTimeout = err.name === 'AbortError' || err.name === 'TimeoutError';
    if (isTimeout) {
      console.log(`Gemini timeout (${model}): exceeded ${timeout}ms`);
      return { content: null, status: 408, error: `Timeout of ${timeout}ms exceeded` };
    } else {
      console.log(`Gemini exception (${model}): ${err.message}`);
      return { content: null, status: 500, error: err.message };
    }
  }
}

module.exports = { generateWithGemini };
