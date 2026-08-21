/* DataSaathi client-side security boundary and resilient control binding. */
(() => {
  'use strict';

  const MAX_URL = 2048;
  const MAX_POLICY = 1000000;
  const $ = id => document.getElementById(id);
  const saved = { citizen: { url: '', text: '' }, company: { url: '', text: '' } };

  const t = (key, fallback) => {
    try {
      const lang = $('language')?.value || 'en';
      return (window.T && window.T[lang] && window.T[lang][key]) || fallback;
    } catch (_) { return fallback; }
  };

  function publicUrl(raw) {
    const value = String(raw || '').replace(/[\u0000-\u001F\u007F]/g, '').trim();
    if (!value || value.length > MAX_URL) throw new Error(t('validUrl', 'Please enter a valid HTTP/HTTPS URL.'));
    let u;
    try { u = new URL(value); } catch (_) { throw new Error(t('validUrl', 'Please enter a valid HTTP/HTTPS URL.')); }
    if (!['http:', 'https:'].includes(u.protocol)) throw new Error('Only HTTP and HTTPS URLs are allowed.');
    if (u.username || u.password) throw new Error('URLs containing embedded credentials are not allowed.');
    if (u.port && !['80', '443'].includes(u.port)) throw new Error('Only standard web ports are allowed.');
    const host = u.hostname.toLowerCase();
    if (!host || host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local') || host.endsWith('.internal') || /^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)) {
      throw new Error('Local, internal or IP-address URLs are not supported.');
    }
    return u.href;
  }

  function sanitizeText(value) {
    return String(value || '').replace(/[\u0000-\u001F\u007F]/g, ' ').slice(0, MAX_POLICY);
  }

  function showError(mode, message) {
    const out = $(mode + 'Result');
    if (!out) return;
    const box = document.createElement('div');
    box.className = 'notice';
    box.textContent = message;
    out.replaceChildren(box);
  }

  /*
   * Critical design rule: never put the controls inside a translatable label.
   * app.js may replace the label's text. These controls live in their own
   * container, so changing English/Hindi/Marathi can never remove them.
   */
  function ensureFields(mode) {
    const tool = $('#' + mode + '-tool');
    if (!tool) return false;
    const card = tool.querySelector('.card');
    if (!card) return false;

    let wrap = card.querySelector('.ds-secure-inputs');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'ds-secure-inputs';
      const result = $(mode + 'Result');
      if (result) card.insertBefore(wrap, result);
      else card.appendChild(wrap);
    }

    let url = $(mode + 'Url');
    if (!url || !wrap.contains(url)) {
      if (url) url.remove();
      const label = document.createElement('label');
      label.setAttribute('data-security-label', 'url');
      label.textContent = t('urlLabel', 'Privacy Policy URL');
      url = document.createElement('input');
      url.type = 'url'; url.id = mode + 'Url'; url.className = 'input';
      url.placeholder = 'https://example.com/privacy';
      url.autocomplete = 'off'; url.inputMode = 'url'; url.maxLength = MAX_URL;
      url.setAttribute('aria-label', t('urlLabel', 'Privacy Policy URL'));
      label.appendChild(url); wrap.appendChild(label);
    }

    let text = $(mode + 'Text');
    if (!text || !wrap.contains(text)) {
      if (text) text.remove();
      const label = document.createElement('label');
      label.setAttribute('data-security-label', 'text');
      label.textContent = t('pasteLabel', 'Or paste Privacy Policy text');
      text = document.createElement('textarea');
      text.id = mode + 'Text'; text.className = 'input';
      text.rows = mode === 'citizen' ? 9 : 11; text.maxLength = MAX_POLICY;
      text.placeholder = t(mode === 'citizen' ? 'pasteCitizen' : 'pasteCompany', 'Paste the Privacy Policy text here...');
      text.setAttribute('aria-label', t('pasteLabel', 'Privacy Policy text'));
      label.appendChild(text); wrap.appendChild(label);
    }

    if (saved[mode].url && !url.value) url.value = saved[mode].url;
    if (saved[mode].text && !text.value) text.value = saved[mode].text;
    return true;
  }

  function bind(mode) {
    if (!ensureFields(mode)) return;
    const url = $(mode + 'Url');
    const text = $(mode + 'Text');
    if (!url || !text) return;

    if (!url.dataset.securityBound) {
      url.dataset.securityBound = '1';
      url.addEventListener('input', () => { url.value = url.value.replace(/[\u0000-\u001F\u007F]/g, '').slice(0, MAX_URL); });
      url.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); read(mode); } });
    }
    if (!text.dataset.securityBound) {
      text.dataset.securityBound = '1';
      text.addEventListener('input', () => { text.value = sanitizeText(text.value); });
      text.addEventListener('paste', () => setTimeout(() => { text.value = sanitizeText(text.value); }, 0));
    }

    const readButtons = [...document.querySelectorAll(`[data-i18n="readPolicy"]`)].filter(b => b.closest('#' + mode + '-tool'));
    readButtons.forEach(b => {
      if (b.dataset.securityBound) return;
      b.dataset.securityBound = '1';
      b.addEventListener('click', e => { e.preventDefault(); read(mode); });
    });

    const assessmentKey = mode === 'citizen' ? 'explain' : 'runAssessment';
    [...document.querySelectorAll(`[data-i18n="${assessmentKey}"]`)].filter(b => b.closest('#' + mode + '-tool')).forEach(b => {
      if (b.dataset.securityBound) return;
      b.dataset.securityBound = '1';
      b.addEventListener('click', e => { e.preventDefault(); assess(mode); });
    });
  }

  function read(mode) {
    if (!ensureFields(mode)) return showError(mode, 'The assessment form is unavailable. Please reload the page.');
    const input = $(mode + 'Url');
    if (!input) return showError(mode, 'The URL field is unavailable. Please reload the page.');
    try {
      input.value = publicUrl(input.value);
      saved[mode].url = input.value;
      if (typeof window.fetchPolicy !== 'function') throw new Error('The policy reader is unavailable. Please reload the page.');
      window.fetchPolicy(mode);
    } catch (e) { showError(mode, e.message); }
  }

  function assess(mode) {
    if (!ensureFields(mode)) return showError(mode, 'The assessment form is unavailable. Please reload the page.');
    const input = $(mode + 'Text');
    if (!input) return showError(mode, 'The Privacy Policy text field is unavailable. Please reload the page.');
    input.value = sanitizeText(input.value); saved[mode].text = input.value;
    if (typeof window.assess !== 'function') return showError(mode, 'The assessment engine is unavailable. Please reload the page.');
    window.assess(mode);
  }

  function bindNavigation() {
    document.querySelectorAll('.backBtn').forEach(btn => {
      if (!btn.dataset.securityBound) { btn.dataset.securityBound = '1'; btn.addEventListener('click', e => { e.preventDefault(); if (typeof window.showChoice === 'function') window.showChoice(); }); }
    });
    document.querySelectorAll('[data-i18n="exportPdf"]').forEach(btn => {
      if (!btn.dataset.securityBound) { btn.dataset.securityBound = '1'; btn.addEventListener('click', e => { e.preventDefault(); window.print(); }); }
    });
  }

  function snapshot() {
    ['citizen', 'company'].forEach(mode => {
      const u = $(mode + 'Url'), text = $(mode + 'Text');
      if (u) saved[mode].url = u.value;
      if (text) saved[mode].text = text.value;
    });
  }

  function bindAll() { bind('citizen'); bind('company'); bindNavigation(); }

  const language = $('language');
  if (language) language.addEventListener('change', () => { snapshot(); setTimeout(bindAll, 0); setTimeout(bindAll, 50); }, true);

  bindAll();

  /* Recover only the controls, never application content. */
  const observer = new MutationObserver(() => {
    if (!document.querySelector('.ds-secure-inputs')) bindAll();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  /* Remove inline event attributes after listeners are attached. */
  document.querySelectorAll('[onclick]').forEach(el => el.removeAttribute('onclick'));

  window.DataSaathiSecurity = Object.freeze({ sanitizeText, publicUrl });
})();
