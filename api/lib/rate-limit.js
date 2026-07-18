const rateLimitStore = new Map();

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 10;

const TRUSTED_PROXY_HEADERS = ['x-forwarded-for', 'x-real-ip', 'cf-connecting-ip', 'true-client-ip'];

function getClientIp(req) {
  for (const header of TRUSTED_PROXY_HEADERS) {
    const value = req.headers[header];
    if (value && typeof value === 'string') {
      const ip = value.split(',')[0].trim();
      if (isValidIp(ip)) {
        return ip;
      }
    }
  }
  const socketIp = req.socket?.remoteAddress;
  if (socketIp && isValidIp(socketIp)) {
    return socketIp;
  }
  return 'unknown';
}

function isValidIp(ip) {
  if (!ip || ip === 'unknown' || ip === '::1' || ip === '127.0.0.1') return false;
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  if (ipv4Regex.test(ip)) {
    const parts = ip.split('.').map(Number);
    return parts.every(p => p >= 0 && p <= 255);
  }
  return ipv6Regex.test(ip) || ip.includes(':');
}

function checkRateLimit(req) {
  const ip = getClientIp(req);
  const now = Date.now();

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, []);
  }

  const timestamps = rateLimitStore.get(ip);
  const recent = timestamps.filter(t => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    rateLimitStore.set(ip, recent);
    return { allowed: false, retryAfter: Math.ceil((recent[0] + WINDOW_MS - now) / 1000) };
  }

  recent.push(now);
  rateLimitStore.set(ip, recent);
  return { allowed: true };
}

module.exports = { checkRateLimit };