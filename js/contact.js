/**
 * contact.js — Contact form validation and submission feedback.
 * Validates fields and email, shows inline errors, and handles success/failure UI.
 */

/**
 * Validates an email address using a simplified RFC 5322 regex.
 * Requires exactly one @, non-empty local part, non-empty domain with at least one dot.
 * @param {string} email
 * @returns {boolean}
 */
function validateEmail(email) {
  // Exactly one @, non-empty local part, non-empty domain with at least one dot
  return /^[^@]+@[^@]+\.[^@]+$/.test(email);
}

/**
 * Validates that a form field has a non-empty value.
 * @param {HTMLInputElement|HTMLTextAreaElement} field
 * @returns {{ valid: boolean, message: string }}
 */
function validateField(field) {
  if (!field.value.trim()) {
    const label = document.querySelector(`label[for="${field.id}"]`);
    const fieldName = label ? label.textContent.trim() : 'This field';
    return { valid: false, message: `${fieldName} is required.` };
  }
  return { valid: true, message: '' };
}

/**
 * Initialises the contact form: intercepts submit, validates, shows errors or success.
 * @param {string} formSelector - CSS selector for the form element.
 */
function initContactForm(formSelector) {
  const form = document.querySelector(formSelector);
  if (!form) return;

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const fields = ['name', 'email', 'subject', 'message'];
    let isValid = true;

    // Clear previous errors
    fields.forEach(function (id) {
      const input = document.getElementById(id);
      const errorSpan = document.getElementById(id + '-error');
      if (input) input.removeAttribute('aria-invalid');
      if (errorSpan) errorSpan.textContent = '';
    });

    // Validate each required field
    fields.forEach(function (id) {
      const input = document.getElementById(id);
      const errorSpan = document.getElementById(id + '-error');
      if (!input) return;

      const result = validateField(input);
      if (!result.valid) {
        isValid = false;
        input.setAttribute('aria-invalid', 'true');
        if (errorSpan) errorSpan.textContent = result.message;
        return;
      }

      // Additional email format validation
      if (id === 'email' && !validateEmail(input.value.trim())) {
        isValid = false;
        input.setAttribute('aria-invalid', 'true');
        if (errorSpan) errorSpan.textContent = 'Please enter a valid email address.';
      }
    });

    if (!isValid) return;

    // Attempt submission if form has an action URL (third-party service)
    const action = form.getAttribute('action');
    if (action) {
      try {
        const data = new FormData(form);
        const response = await fetch(action, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Submission failed');
        }
      } catch (_err) {
        showErrorBanner();
        return;
      }
    }

    // Show success state
    form.hidden = true;
    const successBanner = document.getElementById('form-success');
    if (successBanner) successBanner.hidden = false;
  });
}

/**
 * Displays a generic error banner while preserving form data.
 */
function showErrorBanner() {
  let banner = document.getElementById('form-error-banner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'form-error-banner';
    banner.setAttribute('role', 'alert');
    banner.setAttribute('aria-live', 'assertive');
    banner.className = 'form-error-banner';
    banner.innerHTML =
      '<p>Something went wrong. Please try again or email us directly at ' +
      '<a href="mailto:info@adenine.africa">info@adenine.africa</a>.</p>';
    const form = document.getElementById('contact-form');
    if (form) form.insertAdjacentElement('beforebegin', banner);
  }
  banner.hidden = false;
}

// Expose on window for testability
window.validateEmail = validateEmail;
window.validateField = validateField;
window.initContactForm = initContactForm;

document.addEventListener('DOMContentLoaded', function () {
  initContactForm('#contact-form');
});
