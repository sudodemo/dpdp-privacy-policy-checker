/* DataSaathi client-side security and UI bindings. */
(() => {
  'use strict';
  const MAX_URL = 2048;
  const MAX_POLICY = 1000000;
  const $ = id => document.getElementById(id);
  const buttons = (key, root = document) => [...root.querySelectorAll(`[data-i18n="${key}"]`)];

  const publicUrl = raw => {
    const value = String(raw || '').replace(/[\u0000-\u001F\u007F]/g, '').trim();
    if (!value || value.length > MAX_URL) throw new Error('Invalid or oversized URL.');
    let u;
    try { u = new URL(value); } catch (_) { throw new Error('Invalid URL.'); }
    if (u.protocol !== 'https:' && u.protocol !== 'http:') throw new Error('Only HTTP and HTTPS URLs are allowed.');
    if (u.username || u.password) throw new Error('URLs containing embedded credentials are not allowed.');
    if (u.port && u.port !== '80' && u.port !== '443') throw new Error('Only standard web ports are allowed.');
    const host = u.hostname.toLowerCase();
    if (!host || host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local') || host.endsWith('.internal') || host.includes(':')) throw new Error('Local or internal hosts are not allowed.');
    if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)) throw new Error('IP-address URLs are not supported; use the public website domain.');
    return u.href;
  };

  const sanitizeText = value => String(value || '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ' ')
    .slice(0, MAX_POLICY);

  const showInputError = (mode, message) => {
    const out = $(mode + 'Result');
    if (!out) return;
    const box = document.createElement('div');
    box.className = 'notice';
    box.textContent = message;
    out.replaceChildren(box);
  };

  const safeRead = mode => {
    const input = $(mode + 'Url');
    try {
      const normalized = publicUrl(input.value);
      input.value = normalized;
      window.fetchPolicy(mode);
    } catch (e) {
      showInputError(mode, e.message);
    }
  };

  const safeAssess = mode => {
    const input = $(mode + 'Text');
    if (!input) return;
    input.value = sanitizeText(input.value);
    window.assess(mode);
  };

  ['citizen','company'].forEach(mode => {
    const url = $(mode + 'Url');
    const text = $(mode + 'Text');
    if (url) {
      url.maxLength = MAX_URL;
      url.addEventListener('input', () => { if (url.value.length > MAX_URL) url.value = url.value.slice(0, MAX_URL); });
      url.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); safeRead(mode); } });
    }
    if (text) {
      text.maxLength = MAX_POLICY;
      text.addEventListener('input', () => { if (text.value.length > MAX_POLICY) text.value = text.value.slice(0, MAX_POLICY); });
      text.addEventListener('paste', () => setTimeout(() => { text.value = sanitizeText(text.value); }, 0));
    }
    buttons('readPolicy').filter(b => b.closest('#' + mode + '-tool')).forEach(b => b.addEventListener('click', e => { e.preventDefault(); safeRead(mode); }));
    buttons(mode === 'citizen' ? 'explain' : 'runAssessment').filter(b => b.closest('#' + mode + '-tool')).forEach(b => b.addEventListener('click', e => { e.preventDefault(); safeAssess(mode); }));
  });

  buttons('citizenSelect').forEach(b => b.addEventListener('click', e => { e.preventDefault(); window.showMode('citizen'); }));
  buttons('companySelect').forEach(b => b.addEventListener('click', e => { e.preventDefault(); window.showMode('company'); }));
  buttons('heroCitizen').forEach(b => b.addEventListener('click', e => { e.preventDefault(); window.showMode('citizen'); }));
  buttons('heroCompany').forEach(b => b.addEventListener('click', e => { e.preventDefault(); window.showMode('company'); }));
  document.querySelectorAll('.backBtn').forEach(btn => btn.addEventListener('click', e => { e.preventDefault(); window.showChoice(); }));
  buttons('exportPdf').forEach(b => b.addEventListener('click', e => { e.preventDefault(); window.print(); }));

  // Remove legacy inline event attributes. The CSP already blocks them; this also
  // keeps the DOM free of inline JavaScript and leaves only external handlers.
  document.querySelectorAll('[onclick]').forEach(el => el.removeAttribute('onclick'));
})();
