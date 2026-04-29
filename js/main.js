/* ============================================================
   GRAPHIC DESIGN TUTORING — Main JavaScript
   ============================================================ */

'use strict';

// ---------- Sticky header shadow ----------
const header = document.getElementById('site-header');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- Mobile navigation ----------
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-menu');

function openMenu() {
  navMenu.classList.add('is-open');
  navToggle.setAttribute('aria-expanded', 'true');
  navToggle.setAttribute('aria-label', 'Close menu');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navMenu.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open menu');
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.contains('is-open');
  isOpen ? closeMenu() : openMenu();
});

// Close nav when a link is clicked (single-page navigation)
navMenu.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
    closeMenu();
    navToggle.focus();
  }
});

// ---------- Active nav link on scroll ----------
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link:not(.nav__link--cta)');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(section => sectionObserver.observe(section));

// ---------- Contact form validation & submission ----------
const form          = document.getElementById('contact-form');
const formSuccess   = document.getElementById('form-success');

const validators = {
  name: {
    el: document.getElementById('name'),
    errorEl: document.getElementById('name-error'),
    validate(val) {
      if (!val.trim()) return 'Please enter your name.';
      if (val.trim().length < 2) return 'Name must be at least 2 characters.';
      return '';
    }
  },
  email: {
    el: document.getElementById('email'),
    errorEl: document.getElementById('email-error'),
    validate(val) {
      if (!val.trim()) return 'Please enter your email address.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Please enter a valid email address.';
      return '';
    }
  },
  message: {
    el: document.getElementById('message'),
    errorEl: document.getElementById('message-error'),
    validate(val) {
      if (!val.trim()) return 'Please enter a message.';
      if (val.trim().length < 10) return 'Message must be at least 10 characters.';
      return '';
    }
  }
};

function showError(field, message) {
  field.el.classList.toggle('error', !!message);
  field.errorEl.textContent = message;
}

function validateField(fieldKey) {
  const field = validators[fieldKey];
  const error = field.validate(field.el.value);
  showError(field, error);
  return !error;
}

// Real-time validation on blur
Object.keys(validators).forEach(key => {
  validators[key].el.addEventListener('blur', () => validateField(key));
  validators[key].el.addEventListener('input', () => {
    if (validators[key].el.classList.contains('error')) validateField(key);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const allValid = Object.keys(validators).map(validateField).every(Boolean);
  if (!allValid) {
    const firstError = Object.values(validators).find(f => f.el.classList.contains('error'));
    if (firstError) firstError.el.focus();
    return;
  }

  // Show success state (in production you would POST to a backend/service here)
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  setTimeout(() => {
    form.reset();
    Object.values(validators).forEach(f => showError(f, ''));
    formSuccess.hidden = false;
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }, 800);
});

// ---------- Footer: dynamic year ----------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
