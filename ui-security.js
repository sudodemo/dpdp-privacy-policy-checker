/* DataSaathi client-side security boundary and control binding. */
(() => {
  'use strict';

  const MAX_URL = 2048;
  const MAX_POLICY = 1000000;

  const $ = id => document.getElementById(id);

  const saved = {
    citizen: { url: '', text: '' },
    company: { url: '', text: '' }
  };

  const app = () => window.DataSaathiApp || {};

  const t = (key, fallback) => {
    try {
      const lang = $('language')?.value || 'en';
      return (window.T?.[lang]?.[key]) || fallback;
    } catch (_) {
      return fallback;
    }
  };

  const safeText = value =>
    String(value || '')
      .replace(/[\u0000-\u001F\u007F]/g, ' ')
      .slice(0, MAX_POLICY);


  function validateUrl(raw) {
    const value = String(raw || '')
      .replace(/[\u0000-\u001F\u007F]/g, '')
      .trim();

    if (!value || value.length > MAX_URL) {
      throw Error(
        t(
          'validUrl',
          'Please enter a valid HTTP/HTTPS URL.'
        )
      );
    }

    let u;

    try {
      u = new URL(value);
    } catch (_) {
      throw Error(
        t(
          'validUrl',
          'Please enter a valid HTTP/HTTPS URL.'
        )
      );
    }

    if (!['http:', 'https:'].includes(u.protocol)) {
      throw Error('Only HTTP and HTTPS URLs are allowed.');
    }

    if (u.username || u.password) {
      throw Error(
        'URLs containing embedded credentials are not allowed.'
      );
    }

    if (u.port && !['80', '443'].includes(u.port)) {
      throw Error(
        'Only standard web ports are allowed.'
      );
    }

    const host = u.hostname.toLowerCase();

    if (
      !host ||
      host === 'localhost' ||
      host.endsWith('.localhost') ||
      host.endsWith('.local') ||
      host.endsWith('.internal') ||
      /^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)
    ) {
      throw Error(
        'Local, internal or IP-address URLs are not supported.'
      );
    }

    return u.href;
  }


  function error(mode, message) {
    const out = $(mode + 'Result');

    if (!out) return;

    const box = document.createElement('div');

    box.className = 'notice';
    box.textContent = message;

    out.replaceChildren(box);
  }


  function ensureFields(mode) {
    const tool = $('#' + mode + '-tool');
    const card = tool?.querySelector('.card');

    if (!card) return false;

    let wrap = card.querySelector('.ds-secure-inputs');

    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'ds-secure-inputs';

      const result = $(mode + 'Result');

      if (result) {
        card.insertBefore(wrap, result);
      } else {
        card.appendChild(wrap);
      }
    }


    let url = $(mode + 'Url');

    if (!url || !wrap.contains(url)) {
      if (url) {
        url.remove();
      }

      const label = document.createElement('label');

      const labelText = document.createElement('span');
      labelText.textContent = t(
        'urlLabel',
        'Privacy Policy URL'
      );

      url = document.createElement('input');

      url.type = 'url';
      url.id = mode + 'Url';
      url.className = 'input';
      url.placeholder = 'https://example.com/privacy';
      url.autocomplete = 'off';
      url.inputMode = 'url';
      url.maxLength = MAX_URL;
      url.setAttribute(
        'aria-label',
        t('urlLabel', 'Privacy Policy URL')
      );

      label.appendChild(labelText);
      label.appendChild(url);
      wrap.appendChild(label);
    }


    let text = $(mode + 'Text');

    if (!text || !wrap.contains(text)) {
      if (text) {
        text.remove();
      }

      const label = document.createElement('label');

      const labelText = document.createElement('span');
      labelText.textContent = t(
        'pasteLabel',
        'Or paste Privacy Policy text'
      );

      text = document.createElement('textarea');

      text.id = mode + 'Text';
      text.className = 'input';
      text.rows = mode === 'citizen' ? 9 : 11;
      text.maxLength = MAX_POLICY;
      text.placeholder = t(
        mode === 'citizen'
          ? 'pasteCitizen'
          : 'pasteCompany',
        'Paste the Privacy Policy text here...'
      );

      text.setAttribute(
        'aria-label',
        t('pasteLabel', 'Privacy Policy text')
      );

      label.appendChild(labelText);
      label.appendChild(text);
      wrap.appendChild(label);
    }


    if (saved[mode].url && !url.value) {
      url.value = saved[mode].url;
    }

    if (saved[mode].text && !text.value) {
      text.value = saved[mode].text;
    }

    return true;
  }


  function bindInputSecurity(mode) {
    if (!ensureFields(mode)) return;

    const url = $(mode + 'Url');
    const text = $(mode + 'Text');

    if (!url || !text) return;


    if (!url.dataset.securityBound) {
      url.dataset.securityBound = '1';

      url.addEventListener('input', () => {
        url.value = url.value
          .replace(/[\u0000-\u001F\u007F]/g, '')
          .slice(0, MAX_URL);
      });

      url.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          event.preventDefault();
          read(mode);
        }
      });
    }


    if (!text.dataset.securityBound) {
      text.dataset.securityBound = '1';

      text.addEventListener('input', () => {
        text.value = safeText(text.value);
      });
    }
  }


  function bindButtons() {

    const citizenRead = $('citizenReadPolicy');

    if (citizenRead && !citizenRead.dataset.securityBound) {
      citizenRead.dataset.securityBound = '1';

      citizenRead.addEventListener('click', event => {
        event.preventDefault();
        read('citizen');
      });
    }


    const citizenExplain = $('citizenExplain');

    if (citizenExplain && !citizenExplain.dataset.securityBound) {
      citizenExplain.dataset.securityBound = '1';

      citizenExplain.addEventListener('click', event => {
        event.preventDefault();
        assess('citizen');
      });
    }


    const companyRead = $('companyReadPolicy');

    if (companyRead && !companyRead.dataset.securityBound) {
      companyRead.dataset.securityBound = '1';

      companyRead.addEventListener('click', event => {
        event.preventDefault();
        read('company');
      });
    }


    const companyAssessment = $('companyRunAssessment');

    if (
      companyAssessment &&
      !companyAssessment.dataset.securityBound
    ) {
      companyAssessment.dataset.securityBound = '1';

      companyAssessment.addEventListener('click', event => {
        event.preventDefault();
        assess('company');
      });
    }


    document.querySelectorAll('.backBtn').forEach(button => {

      if (button.dataset.securityBound) return;

      button.dataset.securityBound = '1';

      button.addEventListener('click', event => {
        event.preventDefault();

        const fn =
          app().showChoice ||
          window.showChoice;

        if (typeof fn === 'function') {
          fn();
        }
      });

    });


    const exportButton =
      document.querySelector('[data-i18n="exportPdf"]');

    if (
      exportButton &&
      !exportButton.dataset.securityBound
    ) {
      exportButton.dataset.securityBound = '1';

      exportButton.addEventListener('click', event => {
        event.preventDefault();
        window.print();
      });
    }
  }


  function read(mode) {

    if (!ensureFields(mode)) {
      return error(
        mode,
        'The assessment form is unavailable. Please reload the page.'
      );
    }

    const input = $(mode + 'Url');

    if (!input) {
      return error(
        mode,
        'The Privacy Policy URL field is unavailable.'
      );
    }

    try {

      input.value = validateUrl(input.value);

      saved[mode].url = input.value;

      const fn =
        app().fetchPolicy ||
        window.fetchPolicy;

      if (typeof fn !== 'function') {
        throw Error(
          'The policy reader is unavailable. Please reload the page.'
        );
      }

      fn(mode);

    } catch (e) {

      error(
        mode,
        e?.message ||
        'Unable to read the Privacy Policy.'
      );

    }
  }


  function assess(mode) {

    if (!ensureFields(mode)) {
      return error(
        mode,
        'The assessment form is unavailable. Please reload the page.'
      );
    }

    const input = $(mode + 'Text');

    if (!input) {
      return error(
        mode,
        'The Privacy Policy text field is unavailable.'
      );
    }

    input.value = safeText(input.value);
    saved[mode].text = input.value;

    const fn =
      app().assess ||
      window.assess;

    if (typeof fn !== 'function') {
      return error(
        mode,
        'The assessment engine is unavailable. Please reload the page.'
      );
    }

    fn(mode);
  }


  function bindNavigation() {

    document.querySelectorAll('.backBtn').forEach(button => {

      if (button.dataset.securityBound) return;

      button.dataset.securityBound = '1';

      button.addEventListener('click', event => {

        event.preventDefault();

        const fn =
          app().showChoice ||
          window.showChoice;

        if (typeof fn === 'function') {
          fn();
        }

      });

    });


    const exportButton =
      document.querySelector('[data-i18n="exportPdf"]');

    if (
      exportButton &&
      !exportButton.dataset.securityBound
    ) {
      exportButton.dataset.securityBound = '1';

      exportButton.addEventListener('click', event => {
        event.preventDefault();
        window.print();
      });
    }
  }


  function snapshot() {

    ['citizen', 'company'].forEach(mode => {

      const url = $(mode + 'Url');
      const text = $(mode + 'Text');

      if (url) {
        saved[mode].url = url.value;
      }

      if (text) {
        saved[mode].text = text.value;
      }

    });
  }


  function bindAll() {

    bindInputSecurity('citizen');
    bindInputSecurity('company');
    bindButtons();
    bindNavigation();

  }


  const language = $('language');

  if (language) {

    language.addEventListener(
      'change',
      () => {
        snapshot();

        setTimeout(bindAll, 0);
        setTimeout(bindAll, 100);
      },
      true
    );

  }


  bindAll();


  window.DataSaathiSecurity = Object.freeze({
    sanitizeText: safeText,
    validateUrl
  });

})();
