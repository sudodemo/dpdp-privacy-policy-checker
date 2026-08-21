/* Same-origin policy reader. Browser fetches to arbitrary sites are blocked by CORS;
   this adapter uses the site's own /api/fetch-policy endpoint when deployed on a
   platform that supports Pages Functions (such as Cloudflare Pages). */
(() => {
  'use strict';
  const app = window.DataSaathiApp || {};
  const $ = id => document.getElementById(id);
  const lang = () => $('language')?.value || 'en';
  const message = (key, fallback) => window.T?.[lang()]?.[key] || fallback;
  const clean = s => String(s || '').replace(/\s+/g, ' ').trim();

  async function fetchPolicy(mode) {
    const urlEl = $(mode + 'Url');
    const textEl = $(mode + 'Text');
    const out = $(mode + 'Result');
    if (!urlEl || !textEl || !out) return;

    let url;
    try {
      url = new URL(String(urlEl.value || '').trim());
      if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || (url.port && !['80', '443'].includes(url.port))) throw new Error('Invalid URL');
    } catch (_) {
      out.textContent = message('validUrl', 'Please enter a valid HTTP/HTTPS URL.');
      return;
    }

    out.textContent = message('loading', 'Reading the Privacy Policy…');
    try {
      const response = await fetch('/api/fetch-policy?url=' + encodeURIComponent(url.href), {
        method: 'GET',
        credentials: 'same-origin',
        cache: 'no-store',
        headers: { Accept: 'application/json' }
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Policy page could not be fetched.');
      let html = String(data.text || '');
      html = html.replace(/<script[\s\S]*?<\/script>/gi, ' ')
        .replace(/<style[\s\S]*?<\/style>/gi, ' ')
        .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
        .replace(/<[^>]+>/g, ' ');
      html = clean(html).slice(0, 1000000);
      if (html.length < 200) throw new Error('The page did not contain enough readable policy text.');
      textEl.value = html;
      out.textContent = message('loaded', 'Policy text loaded locally. Confirm that this is the intended Privacy Policy page.');
    } catch (e) {
      out.textContent = (message('failed', 'Automatic reading failed. Please paste the exact Privacy Policy text below.') + ' ' + String(e.message || '')).trim();
    }
  }

  window.DataSaathiApp = Object.assign({}, app, { fetchPolicy });
})();
