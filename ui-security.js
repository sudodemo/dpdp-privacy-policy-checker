/* DataSaathi client-side security and UI bindings. */
(() => {
  'use strict';
  const MAX_URL = 2048;
  const MAX_POLICY = 1000000;
  const $ = id => document.getElementById(id);
  const buttons = (key, root = document) => [...root.querySelectorAll(`[data-i18n="${key}"]`)];
  const saved = { citizen: { url: '', text: '' }, company: { url: '', text: '' } };

  const publicUrl = raw => {
    const value = String(raw || '').replace(/[\u0000-\u001F\u007F]/g, '').trim();
    if (!value || value.length > MAX_URL) throw new Error('Invalid or oversized URL.');
    let u;
    try { u = new URL(value); } catch (_) { throw new Error('Invalid URL.'); }
    if (!['http:', 'https:'].includes(u.protocol)) throw new Error('Only HTTP and HTTPS URLs are allowed.');
    if (u.username || u.password) throw new Error('URLs containing embedded credentials are not allowed.');
    if (u.port && !['80', '443'].includes(u.port)) throw new Error('Only standard web ports are allowed.');
    const host = u.hostname.toLowerCase();
    if (!host || host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local') || host.endsWith('.internal') || /^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)) throw new Error('Local, internal or IP-address URLs are not supported.');
    return u.href;
  };

  const sanitizeText = value => String(value || '').replace(/[\u0000-\u001F\u007F]/g, ' ').slice(0, MAX_POLICY);

  // The localization code can replace label contents. Inputs must never be
  // children of a node whose innerHTML is translated. Keep the controls in
  // dedicated wrappers and recreate them if an older cached script removes them.
  function ensureFields(mode) {
    const tool = $('#' + mode + '-tool');
    if (!tool) return;

    let url = $(mode + 'Url');
    let text = $(mode + 'Text');

    if (!url) {
      const row = document.createElement('div');
      row.className = 'security-control';
      const label = document.createElement('label');
      const labelText = document.createElement('span');
      labelText.textContent = mode === 'citizen' ? 'Privacy Policy URL' : 'Privacy Policy URL';
      url = document.createElement('input');
      url.id = mode + 'Url'; url.type = 'url'; url.className = 'input';
      url.placeholder = 'https://example.com/privacy'; url.autocomplete = 'off';
      label.append(labelText, url); row.appendChild(label);

      const oldLabels = tool.querySelectorAll('label[data-i18n="urlLabel"]');
      if (oldLabels.length) oldLabels[0].replaceWith(row);
      else {
        const heading = tool.querySelector('h2');
        heading ? heading.after(row) : tool.prepend(row);
      }
    }

    if (!text) {
      const row = document.createElement('div');
      row.className = 'security-control';
      const label = document.createElement('label');
      const labelText = document.createElement('span');
      labelText.textContent = mode === 'citizen' ? 'Or paste Privacy Policy text' : 'Or paste Privacy Policy text';
      text = document.createElement('textarea');
      text.id = mode + 'Text'; text.className = 'input'; text.rows = mode === 'citizen' ? 9 : 11;
      text.placeholder = mode === 'citizen' ? 'Paste the policy text here...' : 'Paste the full policy text here...';
      label.append(labelText, text); row.appendChild(label);

      const oldLabels = tool.querySelectorAll('label[data-i18n="pasteLabel"]');
      if (oldLabels.length) oldLabels[0].replaceWith(row);
      else {
        const primary = [...tool.querySelectorAll('button')].find(b => b.dataset.i18n === (mode === 'citizen' ? 'explain' : 'runAssessment'));
        primary ? primary.before(row) : tool.appendChild(row);
      }
    }

    if (saved[mode].url && !url.value) url.value = saved[mode].url;
    if (saved[mode].text && !text.value) text.value = saved[mode].text;
    url.maxLength = MAX_URL; url.setAttribute('aria-label', 'Privacy Policy URL');
    text.maxLength = MAX_POLICY; text.setAttribute('aria-label', 'Privacy Policy text');
  }

  function showError(mode, message) {
    const out = $(mode + 'Result');
    if (!out) return;
    const box = document.createElement('div'); box.className = 'notice'; box.textContent = message; out.replaceChildren(box);
  }

  function read(mode) {
    ensureFields(mode);
    const input = $(mode + 'Url');
    if (!input) return showError(mode, 'Privacy Policy URL field could not be created. Please reload the page.');
    try {
      input.value = publicUrl(input.value);
      if (typeof window.fetchPolicy !== 'function') throw new Error('Policy reader is not available. Please reload the page.');
      window.fetchPolicy(mode);
    } catch (e) { showError(mode, e.message); }
  }

  function assess(mode) {
    ensureFields(mode);
    const input = $(mode + 'Text');
    if (!input) return showError(mode, 'Privacy Policy text field could not be created. Please reload the page.');
    input.value = sanitizeText(input.value);
    if (typeof window.assess !== 'function') return showError(mode, 'Assessment engine is not available. Please reload the page.');
    window.assess(mode);
  }

  function bind(mode) {
    ensureFields(mode);
    const url = $(mode + 'Url');
    const text = $(mode + 'Text');
    if (url && !url.dataset.securityBound) {
      url.dataset.securityBound = '1';
      url.addEventListener('input', () => { if (url.value.length > MAX_URL) url.value = url.value.slice(0, MAX_URL); });
      url.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); read(mode); } });
    }
    if (text && !text.dataset.securityBound) {
      text.dataset.securityBound = '1';
      text.addEventListener('input', () => { text.value = sanitizeText(text.value); });
      text.addEventListener('paste', () => setTimeout(() => { text.value = sanitizeText(text.value); }, 0));
    }
    buttons('readPolicy').filter(b => b.closest('#' + mode + '-tool') && !b.dataset.securityBound).forEach(b => {
      b.dataset.securityBound = '1'; b.addEventListener('click', e => { e.preventDefault(); read(mode); });
    });
    buttons(mode === 'citizen' ? 'explain' : 'runAssessment').filter(b => b.closest('#' + mode + '-tool') && !b.dataset.securityBound).forEach(b => {
      b.dataset.securityBound = '1'; b.addEventListener('click', e => { e.preventDefault(); assess(mode); });
    });
  }

  function saveFields() {
    ['citizen', 'company'].forEach(mode => {
      const u = $(mode + 'Url'), t = $(mode + 'Text');
      if (u) saved[mode].url = u.value;
      if (t) saved[mode].text = t.value;
    });
  }

  const language = $('language');
  if (language) language.addEventListener('change', () => {
    saveFields();
    // Run after app.js's localization handler, then again shortly afterwards
    // so cached/legacy DOM mutations cannot permanently remove the controls.
    setTimeout(() => { bind('citizen'); bind('company'); }, 0);
    setTimeout(() => { bind('citizen'); bind('company'); }, 50);
  }, true);

  bind('citizen'); bind('company');

  // Defensive observer: if a translation update replaces a label/input, restore
  // the controls without touching user-entered values.
  const observer = new MutationObserver(() => {
    ensureFields('citizen'); ensureFields('company');
    bind('citizen'); bind('company');
  });
  observer.observe(document.body, { subtree: true, childList: true });

  buttons('citizenSelect').forEach(b => b.addEventListener('click', e => { e.preventDefault(); window.showMode('citizen'); }));
  buttons('companySelect').forEach(b => b.addEventListener('click', e => { e.preventDefault(); window.showMode('company'); }));
  buttons('heroCitizen').forEach(b => b.addEventListener('click', e => { e.preventDefault(); window.showMode('citizen'); }));
  buttons('heroCompany').forEach(b => b.addEventListener('click', e => { e.preventDefault(); window.showMode('company'); }));
  document.querySelectorAll('.backBtn').forEach(btn => btn.addEventListener('click', e => { e.preventDefault(); window.showChoice(); }));
  buttons('exportPdf').forEach(b => b.addEventListener('click', e => { e.preventDefault(); window.print(); }));
  document.querySelectorAll('[onclick]').forEach(el => el.removeAttribute('onclick'));
})();
