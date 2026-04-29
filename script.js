/* ============================================================
   Renee Kiffin Tutoring — script.js
   Vanilla JS only. Sections in order:
     1. Footer copyright year
     2. Mobile nav toggle (hamburger)
     3. Close mobile nav after clicking a link
     4. FAQ — close other items when one opens
     5. Reveal-on-scroll via IntersectionObserver
     6. Lazy-load Lunacal embed when booking section nears viewport
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 1. Copyright year ---------- */
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 2. Mobile nav toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.getElementById('primary-nav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
      primaryNav.classList.toggle('is-open', !isOpen);
    });

    /* ---------- 3. Close nav after tapping a link ---------- */
    primaryNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
        primaryNav.classList.remove('is-open');
      });
    });
  }

  /* ---------- 4. FAQ accordion behaviour ----------
     Native <details>/<summary> already works without JS.
     This just closes other items when one opens. */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach((other) => {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  /* ---------- 5. Reveal on scroll ---------- */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ---------- 6. Lunacal lazy-load ---------- */
  const bookingSection = document.querySelector('#book');
  let lunacalLoaded = false;

  function loadLunacal() {
    if (lunacalLoaded) return;
    lunacalLoaded = true;

    (function (L, U, N) {
      let p = (a, ar) => a.q.push(ar);
      let d = L.document;
      L.Lunacal = L.Lunacal || function () {
        let lun = L.Lunacal, ar = arguments;
        if (!lun.loaded) {
          lun.ns = {};
          lun.q = lun.q || [];
          d.head.appendChild(d.createElement('script')).src = U;
          lun.loaded = true;
        }
        if (ar[0] === N) {
          const api = function () { p(api, arguments); };
          const ns = ar[1];
          api.q = api.q || [];
          if (typeof ns === 'string') {
            lun.ns[ns] = lun.ns[ns] || api;
            p(lun.ns[ns], ar);
            p(lun, ['initNamespace', ns]);
          } else {
            p(lun, ar);
          }
          return;
        }
        p(lun, ar);
      };
      if (!L.Cal) L.Cal = L.Lunacal;
    })(window, 'https://app.lunacal.ai/embed/embed.js', 'init');

    Lunacal('init', 'designtutoring', { origin: 'https://app.lunacal.ai' });
    Lunacal.config = Lunacal.config || {};
    Lunacal.config.forwardQueryParams = true;

    Lunacal.ns.designtutoring('inline', {
      elementOrSelector: '#my-lunacal-inline-designtutoring',
      config: { layout: '' },
      calLink: 'reneekiffin/designtutoring',
    });

    Lunacal.ns.designtutoring('preload', {
      calLink: 'reneekiffin/designtutoring',
      type: 'inline',
      options: { prerenderIframe: true },
    });

    Lunacal.ns.designtutoring('ui', {
      theme: 'light',
      styles: { branding: {} },
      hideEventTypeDetails: false,
      layout: '',
      cssVarsPerTheme: {
        light: {
          'theme-border': '#DFDFDF',
          'theme-background-primary': '#000000',
          'theme-background-secondary': '#EDEDED',
          'theme-background-card': '#FFFFFF',
          'theme-background-base': '#FFFFFF',
          'theme-text-primary': '#FFFFFF',
          'theme-text-secondary': '#000000',
          'theme-text-card': '#000000',
          'theme-text-base': '#0B0D0E',
          'theme-rounded-base': '20px',
          'theme-rounded-calendar': '24px',
          'theme-rounded-timeslot': '12px',
          'theme-rounded-day': '6px',
          'theme-rounded-button': '6px',
          'theme-shadow-calendar': '2px 2px 4px 0px #0000001A',
          'theme-shadow-button': '2px 2px 2px 0px #0000001A',
          'theme-shadow-timeslot': '0px 0px 0px 0px #000000',
          'theme-font-family': 'Outfit',
        },
        dark: {
          'theme-border': '#202020',
          'theme-background-primary': '#FFFFFF',
          'theme-background-secondary': '#333333',
          'theme-background-card': '#090909',
          'theme-background-base': '#000000',
          'theme-text-primary': '#000000',
          'theme-text-secondary': '#FFFFFF',
          'theme-text-card': '#FFFFFF',
          'theme-text-base': '#FFFFFF',
          'theme-rounded-base': '20px',
          'theme-rounded-calendar': '24px',
          'theme-rounded-timeslot': '12px',
          'theme-rounded-day': '6px',
          'theme-rounded-button': '6px',
          'theme-shadow-calendar': '2px 2px 4px 0px #0000001A',
          'theme-shadow-button': '2px 2px 2px 0px #0000001A',
          'theme-shadow-timeslot': '0px 0px 0px 0px #000000',
          'theme-font-family': 'Outfit',
        },
      },
      displayedContent: {
        image: true,
        name: true,
        designation: true,
        description: true,
        eventName: true,
        highlightBar: true,
      },
      background: null,
      stylePreset: null,
    });
  }

  if (bookingSection) {
    if ('IntersectionObserver' in window) {
      const lunacalObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadLunacal();
          lunacalObserver.disconnect();
        }
      }, { rootMargin: '400px' });
      lunacalObserver.observe(bookingSection);
    } else {
      loadLunacal();
    }
  }
})();
