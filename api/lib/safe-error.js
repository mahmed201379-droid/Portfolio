const ERROR_CODES = {
  CHAT_UNAVAILABLE: 'CHAT_UNAVAILABLE',
  RATE_LIMITED: 'RATE_LIMITED',
  INVALID_REQUEST: 'INVALID_REQUEST',
  PROVIDER_FAILED: 'PROVIDER_FAILED',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  PROMPT_INJECTION: 'PROMPT_INJECTION',
  INVALID_ORIGIN: 'INVALID_ORIGIN',
  INVALID_CONTENT_TYPE: 'INVALID_CONTENT_TYPE',
  PAYLOAD_TOO_LARGE: 'PAYLOAD_TOO_LARGE',
};

function safeError(message, code) {
  return { error: message, code };
}

function isSafeError(obj) {
  return obj && typeof obj.error === 'string' && typeof obj.code === 'string';
}

function normalizeError(err) {
  if (isSafeError(err)) return err;
  const message = err?.message || 'Internal error';
  return safeError(message, ERROR_CODES.PROVIDER_FAILED);
}

module.exports = { ERROR_CODES, safeError, isSafeError, normalizeError };