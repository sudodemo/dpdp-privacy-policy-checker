/* DataSaathi client-side security boundary and control binding. */
(() => {

  'use strict';


  /* ---------- Limits ---------- */

  const MAX_URL = 2048;
  const MAX_POLICY = 1000000;


  /* ---------- Helpers ---------- */

  const $ = id =>
    document.getElementById(id);


  const saved = {
    citizen: {
      url:'',
      text:''
    },

    company: {
      url:'',
      text:''
    }
  };


  const app = () =>
    window.DataSaathiApp || {};


  const t = (key, fallback) => {

    try {

      const lang =
        $('language')?.value || 'en';

      return (
        window.T?.[lang]?.[key] ||
        fallback
      );

    } catch (_) {

      return fallback;

    }

  };


  const safeText = value =>
    String(value || '')
      .replace(/[\u0000-\u001F\u007F]/g, ' ')
      .slice(0, MAX_POLICY);


  /* ---------- URL validation ---------- */

  function validateUrl(raw) {

    const value =
      String(raw || '')
        .replace(/[\u0000-\u001F\u007F]/g, '')
        .trim();


    if (
      !value ||
      value.length > MAX_URL
    ) {

      throw new Error(
        t(
          'validUrl',
          'Please enter a valid HTTP/HTTPS URL.'
        )
      );

    }


    let url;

    try {

      url = new URL(value);

    } catch (_) {

      throw new Error(
        t(
          'validUrl',
          'Please enter a valid HTTP/HTTPS URL.'
        )
      );

    }


    if (
      !['http:', 'https:']
        .includes(url.protocol)
    ) {

      throw new Error(
        'Only HTTP and HTTPS URLs are allowed.'
      );

    }


    if (
      url.username ||
      url.password
    ) {

      throw new Error(
        'URLs containing embedded credentials are not allowed.'
      );

    }


    if (
      url.port &&
      !['80', '443'].includes(url.port)
    ) {

      throw new Error(
        'Only standard web ports are allowed.'
      );

    }


    const host =
      url.hostname.toLowerCase();


    if (
      !host ||
      host === 'localhost' ||
      host.endsWith('.localhost') ||
      host.endsWith('.local') ||
      host.endsWith('.internal') ||
      /^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)
    ) {

      throw new Error(
        'Local, internal or IP-address URLs are not supported.'
      );

    }


    return url.href;
  }


  /* ---------- Error display ---------- */

  function error(mode, message) {

    const out =
      $(mode + 'Result');

    if (!out) return;


    const box =
      document.createElement('div');

    box.className = 'notice';

    box.textContent =
      message;


    out.replaceChildren(box);
  }


  /* ---------- Form handling ---------- */

  function ensureFields(mode) {

    const url =
      $(mode + 'Url');

    const text =
      $(mode + 'Text');


    /*
     * The updated index.html already contains
     * these fields. Do NOT delete and recreate them.
     *
     * This is important because recreating the fields
     * can remove values entered by the user.
     */

    if (url && text) {

      if (
        saved[mode].url &&
        !url.value
      ) {

        url.value =
          saved[mode].url;

      }


      if (
        saved[mode].text &&
        !text.value
      ) {

        text.value =
          saved[mode].text;

      }


      return true;
    }


    /*
     * Fallback: create the fields if an older
     * or incomplete HTML page is being used.
     */

    const tool =
      $('#' + mode + '-tool');

    const card =
      tool?.querySelector('.card');


    if (!card) {
      return false;
    }


    let wrap =
      card.querySelector(
        '.ds-secure-inputs'
      );


    if (!wrap) {

      wrap =
        document.createElement('div');

      wrap.className =
        'ds-secure-inputs';


      const result =
        $(mode + 'Result');


      if (result) {

        card.insertBefore(
          wrap,
          result
        );

      } else {

        card.appendChild(wrap);

      }

    }


    let urlField =
      $(mode + 'Url');


    if (!urlField) {

      const label =
        document.createElement('label');


      const labelText =
        document.createElement('span');

      labelText.textContent =
        t(
          'urlLabel',
          'Privacy Policy URL'
        );


      urlField =
        document.createElement('input');

      urlField.type = 'url';
      urlField.id = mode + 'Url';
      urlField.className = 'input';
      urlField.placeholder =
        'https://example.com/privacy';
      urlField.autocomplete = 'off';
      urlField.inputMode = 'url';
      urlField.maxLength = MAX_URL;


      urlField.setAttribute(
        'aria-label',
        t(
          'urlLabel',
          'Privacy Policy URL'
        )
      );


      label.appendChild(
        labelText
      );

      label.appendChild(
        urlField
      );

      wrap.appendChild(
        label
      );

    }


    let textField =
      $(mode + 'Text');


    if (!textField) {

      const label =
        document.createElement('label');


      const labelText =
        document.createElement('span');

      labelText.textContent =
        t(
          'pasteLabel',
          'Or paste Privacy Policy text'
        );


      textField =
        document.createElement('textarea');

      textField.id =
        mode + 'Text';

      textField.className =
        'input';

      textField.rows =
        mode === 'citizen'
          ? 9
          : 11;

      textField.maxLength =
        MAX_POLICY;

      textField.placeholder =
        t(
          mode === 'citizen'
            ? 'pasteCitizen'
            : 'pasteCompany',
          'Paste the Privacy Policy text here...'
        );


      textField.setAttribute(
        'aria-label',
        t(
          'pasteLabel',
          'Privacy Policy text'
        )
      );


      label.appendChild(
        labelText
      );

      label.appendChild(
        textField
      );

      wrap.appendChild(
        label
      );

    }


    return Boolean(
      $(mode + 'Url') &&
      $(mode + 'Text')
    );
  }


  /* ---------- Input security ---------- */

  function bindInputSecurity(mode) {

    if (!ensureFields(mode)) {
      return;
    }


    const url =
      $(mode + 'Url');

    const text =
      $(mode + 'Text');


    if (!url || !text) {
      return;
    }


    if (!url.dataset.securityBound) {

      url.dataset.securityBound =
        '1';


      url.addEventListener(
        'input',
        () => {

          url.value =
            url.value
              .replace(
                /[\u0000-\u001F\u007F]/g,
                ''
              )
              .slice(0, MAX_URL);

        }
      );


      url.addEventListener(
        'keydown',
        event => {

          if (
            event.key === 'Enter'
          ) {

            event.preventDefault();

            read(mode);

          }

        }
      );

    }


    if (!text.dataset.securityBound) {

      text.dataset.securityBound =
        '1';


      text.addEventListener(
        'input',
        () => {

          text.value =
            safeText(text.value);

        }
      );

    }

  }


  /* ---------- Button binding ---------- */

  function bindButtons() {

    /*
     * Citizen "Read policy"
     */

    document
      .querySelectorAll(
        '[data-i18n="readPolicy"]'
      )
      .forEach(button => {

        if (
          button.dataset.securityBound
        ) {
          return;
        }


        const tool =
          button.closest(
            '#citizen-tool, #company-tool'
          );


        if (!tool) {
          return;
        }


        const mode =
          tool.id === 'citizen-tool'
            ? 'citizen'
            : 'company';


        button.dataset.securityBound =
          '1';


        button.addEventListener(
          'click',
          event => {

            event.preventDefault();

            read(mode);

          }
        );

      });


    /*
     * Citizen "Explain this to me"
     */

    document
      .querySelectorAll(
        '[data-i18n="explain"]'
      )
      .forEach(button => {

        if (
          button.dataset.securityBound
        ) {
          return;
        }


        button.dataset.securityBound =
          '1';


        button.addEventListener(
          'click',
          event => {

            event.preventDefault();

            assess('citizen');

          }
        );

      });


    /*
     * Company "Run assessment"
     */

    document
      .querySelectorAll(
        '[data-i18n="runAssessment"]'
      )
      .forEach(button => {

        if (
          button.dataset.securityBound
        ) {
          return;
        }


        button.dataset.securityBound =
          '1';


        button.addEventListener(
          'click',
          event => {

            event.preventDefault();

            assess('company');

          }
        );

      });


    /*
     * Back buttons
     */

    document
      .querySelectorAll('.backBtn')
      .forEach(button => {

        if (
          button.dataset.securityBound
        ) {
          return;
        }


        button.dataset.securityBound =
          '1';


        button.addEventListener(
          'click',
          event => {

            event.preventDefault();


            const fn =
              app().showChoice ||
              window.showChoice;


            if (
              typeof fn === 'function'
            ) {

              fn();

            }

          }
        );

      });


    /*
     * Save / Export PDF
     */

    document
      .querySelectorAll(
        '[data-i18n="exportPdf"]'
      )
      .forEach(button => {

        if (
          button.dataset.securityBound
        ) {
          return;
        }


        button.dataset.securityBound =
          '1';


        button.addEventListener(
          'click',
          event => {

            event.preventDefault();

            window.print();

          }
        );

      });

  }


  /* ---------- Read button action ---------- */

  function read(mode) {

    if (
      !ensureFields(mode)
    ) {

      error(
        mode,
        'The assessment form is unavailable. Please reload the page.'
      );

      return;
    }


    const input =
      $(mode + 'Url');


    if (!input) {

      error(
        mode,
        'The Privacy Policy URL field is unavailable.'
      );

      return;
    }


    try {

      input.value =
        validateUrl(
          input.value
        );


      saved[mode].url =
        input.value;


      const fn =
        app().fetchPolicy ||
        window.fetchPolicy;


      if (
        typeof fn !== 'function'
      ) {

        throw new Error(
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


  /* ---------- Assessment button action ---------- */

  function assess(mode) {

    if (
      !ensureFields(mode)
    ) {

      error(
        mode,
        'The assessment form is unavailable. Please reload the page.'
      );

      return;
    }


    const input =
      $(mode + 'Text');


    if (!input) {

      error(
        mode,
        'The Privacy Policy text field is unavailable.'
      );

      return;
    }


    input.value =
      safeText(
        input.value
      );


    saved[mode].text =
      input.value;


    const fn =
      app().assess ||
      window.assess;


    if (
      typeof fn !== 'function'
    ) {

      error(
        mode,
        'The assessment engine is unavailable. Please reload the page.'
      );

      return;
    }


    fn(mode);

  }


  /* ---------- Save current input ---------- */

  function snapshot() {

    ['citizen', 'company']
      .forEach(mode => {

        const url =
          $(mode + 'Url');

        const text =
          $(mode + 'Text');


        if (url) {

          saved[mode].url =
            url.value;

        }


        if (text) {

          saved[mode].text =
            text.value;

        }

      });

  }


  /* ---------- Initial binding ---------- */

  function bindAll() {

    bindInputSecurity(
      'citizen'
    );

    bindInputSecurity(
      'company'
    );

    bindButtons();

  }


  /* ---------- Language changes ---------- */

  const language =
    $('language');


  if (language) {

    language.addEventListener(
      'change',
      () => {

        snapshot();

        /*
         * app.js has already changed the translations.
         * Re-bind after the DOM update.
         */

        setTimeout(
          bindAll,
          0
        );

      },
      true
    );

  }


  /* ---------- Start ---------- */

  bindAll();


  /* ---------- Public security API ---------- */

  window.DataSaathiSecurity =
    Object.freeze({
      sanitizeText: safeText,
      validateUrl
    });

})();
