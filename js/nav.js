// Feature: adenine-africa-website — nav.js
// Responsibilities: active-link highlighting, mobile menu toggle, keyboard/focus close

function initNav() {
  const nav = document.getElementById('site-nav');
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (!nav || !toggle || !navLinks) return;

  // ── Active link ──────────────────────────────────────────────────────────────
  // Normalise pathname: strip trailing slash, default to /index.html for root
  const pathname = window.location.pathname.replace(/\/$/, '') || '/index.html';

  navLinks.querySelectorAll('a').forEach(function (link) {
    // Resolve the href relative to the current origin so we can compare paths
    const linkPath = new URL(link.href, window.location.href).pathname.replace(/\/$/, '') || '/index.html';

    if (linkPath === pathname) {
      link.setAttribute('aria-current', 'page');
      link.classList.add('active');
    }
  });

  // ── Mobile toggle ─────────────────────────────────────────────────────────────
  toggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // ── Close helpers ─────────────────────────────────────────────────────────────
  function closeMenu() {
    navLinks.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  // Close on Escape key
  nav.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeMenu();
      toggle.focus();
    }
  });

  // Close when focus leaves the <nav> element
  nav.addEventListener('focusout', function (event) {
    // relatedTarget is the element receiving focus; if it's outside nav, close
    if (!nav.contains(event.relatedTarget)) {
      closeMenu();
    }
  });
}

document.addEventListener('DOMContentLoaded', initNav);
