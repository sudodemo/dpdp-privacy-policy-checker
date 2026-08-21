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

  function ensureFields(mode) {
    const tool = $('#' + mode + '-tool');
    if (!tool) return;
    let url = $(mode + 'Url');
    let text = $(mode + 'Text');
    const labels = [...tool.querySelectorAll('label')];
    const urlLabel = labels[0];
    const textLabel = labels[1];
    if (!url && urlLabel) {
      url = document.createElement('input');
      url.type = 'url'; url.id = mode + 'Url'; url.className = 'input';
      url.placeholder = 'https://example.com/privacy'; url.autocomplete = 'off';
      urlLabel.appendChild(url);
    }
    if (!text && textLabel) {
      text = document.createElement('textarea');
      text.id = mode + 'Text'; text.className = 'input'; text.rows = mode === 'citizen' ? 9 : 11;
      text.placeholder = mode === 'citizen' ? 'Paste the policy text here...' : 'Paste the full policy text here...';
      textLabel.appendChild(text);
    }
    if (url && saved[mode].url && !url.value) url.value = saved[mode].url;
    if (text && saved[mode].text && !text.value) text.value = saved[mode].text;
    if (url) { url.maxLength = MAX_URL; url.setAttribute('aria-label', 'Privacy Policy URL'); }
    if (text) { text.maxLength = MAX_POLICY; text.setAttribute('aria-label', 'Privacy Policy text'); }
  }

  function showError(mode, message) {
    const out = $(mode + 'Result');
    if (!out) return;
    const box = document.createElement('div'); box.className = 'notice'; box.textContent = message; out.replaceChildren(box);
  }

  function read(mode) {
    ensureFields(mode);
    const input = $(mode + 'Url');
    if (!input) return showError(mode, 'Privacy Policy URL field is unavailable. Please refresh the page.');
    try { input.value = publicUrl(input.value); window.fetchPolicy(mode); }
    catch (e) { showError(mode, e.message); }
  }

  function assess(mode) {
    ensureFields(mode);
    const input = $(mode + 'Text');
    if (!input) return showError(mode, 'Privacy Policy text field is unavailable. Please refresh the page.');
    input.value = sanitizeText(input.value);
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

  const language = $('language');
  if (language) language.addEventListener('change', () => {
    ['citizen', 'company'].forEach(mode => {
      const u = $(mode + 'Url'), t = $(mode + 'Text');
      saved[mode].url = u ? u.value : saved[mode].url;
      saved[mode].text = t ? t.value : saved[mode].text;
    });
    setTimeout(() => { bind('citizen'); bind('company'); }, 0);
  }, true);

  bind('citizen'); bind('company');
  buttons('citizenSelect').forEach(b => b.addEventListener('click', e => { e.preventDefault(); window.showMode('citizen'); }));
  buttons('companySelect').forEach(b => b.addEventListener('click', e => { e.preventDefault(); window.showMode('company'); }));
  buttons('heroCitizen').forEach(b => b.addEventListener('click', e => { e.preventDefault(); window.showMode('citizen'); }));
  buttons('heroCompany').forEach(b => b.addEventListener('click', e => { e.preventDefault(); window.showMode('company'); }));
  document.querySelectorAll('.backBtn').forEach(btn => btn.addEventListener('click', e => { e.preventDefault(); window.showChoice(); }));
  buttons('exportPdf').forEach(b => b.addEventListener('click', e => { e.preventDefault(); window.print(); }));
  document.querySelectorAll('[onclick]').forEach(el => el.removeAttribute('onclick'));
})();
