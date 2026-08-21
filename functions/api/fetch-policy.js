const MAX_URL_LENGTH = 2048;
const MAX_BODY_BYTES = 2_000_000;
const TIMEOUT_MS = 10000;

function isBlockedHostname(hostname) {
  const h = hostname.toLowerCase().replace(/\.$/, '');
  if (h === 'localhost' || h.endsWith('.localhost') || h.endsWith('.local') || h.endsWith('.internal')) return true;
  if (/^(?:127\.|10\.|192\.168\.|169\.254\.)/.test(h)) return true;
  if (h.startsWith('172.')) {
    const n = Number(h.split('.')[1]);
    if (n >= 16 && n <= 31) return true;
  }
  if (h === '0.0.0.0' || h === '::1' || h === '::' || h.includes(':')) return true;
  return false;
}

function validateTarget(raw) {
  if (typeof raw !== 'string' || raw.length === 0 || raw.length > MAX_URL_LENGTH) throw new Error('Invalid URL');
  const u = new URL(raw);
  if (!['http:', 'https:'].includes(u.protocol)) throw new Error('Only HTTP and HTTPS URLs are allowed');
  if (u.username || u.password) throw new Error('URLs containing credentials are not allowed');
  if (u.port && !['80', '443'].includes(u.port)) throw new Error('Non-standard ports are not allowed');
  if (isBlockedHostname(u.hostname)) throw new Error('Local or private network targets are not allowed');
  return u;
}

function corsHeaders(origin, allowedOrigin) {
  const h = new Headers({
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'"
  });
  if (origin && origin === allowedOrigin) {
    h.set('Access-Control-Allow-Origin', origin);
    h.set('Vary', 'Origin');
  }
  return h;
}

export async function onRequestOptions({ request, env }) {
  const origin = request.headers.get('Origin') || '';
  const allowed = env.ALLOWED_ORIGIN || 'https://sudodemo.github.io';
  const headers = corsHeaders(origin, allowed);
  headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  headers.set('Access-Control-Max-Age', '86400');
  return new Response(null, { status: 204, headers });
}

export async function onRequestGet({ request, env }) {
  const origin = request.headers.get('Origin') || '';
  const allowed = env.ALLOWED_ORIGIN || 'https://sudodemo.github.io';
  const headers = corsHeaders(origin, allowed);
  if (origin && origin !== allowed) return new Response(JSON.stringify({ error: 'Origin not allowed' }), { status: 403, headers });

  const input = new URL(request.url).searchParams.get('url');
  let target;
  try { target = validateTarget(input); } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 400, headers });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(target.toString(), {
      method: 'GET',
      redirect: 'manual',
      signal: controller.signal,
      headers: {
        'Accept': 'text/html,text/plain,application/xhtml+xml',
        'User-Agent': 'DataSaathi-Policy-Reader/1.0'
      }
    });
    if (response.status >= 300 && response.status < 400) {
      return new Response(JSON.stringify({ error: 'Redirected policy URLs are not fetched automatically. Please use the final Privacy Policy URL.' }), { status: 400, headers });
    }
    if (!response.ok) return new Response(JSON.stringify({ error: `Policy page returned HTTP ${response.status}` }), { status: 400, headers });
    const type = (response.headers.get('content-type') || '').toLowerCase();
    if (!type.includes('text/html') && !type.includes('text/plain') && !type.includes('application/xhtml+xml')) {
      return new Response(JSON.stringify({ error: 'The URL did not return an HTML or text policy page.' }), { status: 415, headers });
    }
    const length = Number(response.headers.get('content-length') || 0);
    if (length > MAX_BODY_BYTES) return new Response(JSON.stringify({ error: 'Policy page is larger than the 2 MB safety limit.' }), { status: 413, headers });
    const text = await response.text();
    if (new TextEncoder().encode(text).byteLength > MAX_BODY_BYTES) return new Response(JSON.stringify({ error: 'Policy page is larger than the 2 MB safety limit.' }), { status: 413, headers });
    return new Response(JSON.stringify({ text }), { status: 200, headers });
  } catch (e) {
    const message = e.name === 'AbortError' ? 'The policy page timed out.' : 'The policy page could not be fetched.';
    return new Response(JSON.stringify({ error: message }), { status: 502, headers });
  } finally { clearTimeout(timer); }
}
