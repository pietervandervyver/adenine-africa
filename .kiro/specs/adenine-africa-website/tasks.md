# Implementation Plan: Adenine Research Website

## Overview

Build a static multi-page website for Adenine Research (Pty) Ltd. using plain HTML5, CSS3, and vanilla JavaScript. The site is hosted on AWS S3 with an optional CloudFront distribution. Implementation proceeds page-by-page, with shared infrastructure (CSS, nav, layout shell) established first, then individual pages, then JavaScript modules, and finally production optimisation.

## Tasks

- [x] 1. Set up project structure, CSS foundation, and shared layout shell
  - Create the full directory structure: `css/`, `js/`, `assets/team/`, `assets/research/`
  - Create `css/reset.css` with a minimal CSS reset
  - Create `css/variables.css` defining all brand tokens (`--color-primary`, `--color-accent`, `--color-background`, `--color-surface`, `--color-text`, `--color-text-muted`, font variables, font-size scale)
  - Create `css/main.css` importing reset and variables, with base typography, layout utilities, header/nav/footer styles, and responsive breakpoints (collapse nav below 768px)
  - Create `assets/logo.svg` as a styled text wordmark "Adenine Research" (placeholder until final logo asset is available)
  - Create placeholder `assets/hero.webp`, `assets/team/placeholder.svg`, and `assets/research/placeholder.svg`
  - _Requirements: 8.1, 8.4, 9.4, 11.1, 11.2, 11.3, 11.4_

- [ ] 2. Implement shared HTML layout shell and navigation
  - [x] 2.1 Create `index.html` with the full shared layout shell: `<header>` containing `<nav id="site-nav">` with logo/wordmark, `#nav-toggle` button, and `<ul id="nav-links">` with links to all five pages; `<main>` placeholder; `<footer>` with company name and copyright
    - Ensure `<header>`, `<nav>`, `<main>`, `<footer>` are all present
    - Include `<script src="js/nav.js" defer></script>` and `<noscript>` fallback message
    - _Requirements: 2.1, 2.2, 10.2, 11.3, 11.4_

  - [ ]* 2.2 Write property test for navigation structure completeness (Property 1)
    - **Property 1: Navigation structure is complete on every page**
    - **Validates: Requirements 2.1, 2.2**
    - Use `jsdom` to parse each HTML file and assert the `<nav>` contains links to Home, About, Research, Team, and Contact

  - [ ]* 2.3 Write property test for semantic structural elements (Property 9)
    - **Property 9: Every page uses semantic structural elements**
    - **Validates: Requirements 10.2**
    - For each HTML file assert presence of `<header>`, `<nav>`, `<main>`, `<footer>`

  - [ ]* 2.4 Write property test for logo/wordmark in nav (Property 11)
    - **Property 11: Navigation header contains logo or wordmark on every page**
    - **Validates: Requirements 11.3, 11.4**
    - For each HTML file assert `<nav>` contains either a logo `<img>` with non-empty `alt` or text containing "Adenine Research"

- [ ] 3. Implement `js/nav.js` — active-link highlighting and mobile menu toggle
  - [x] 3.1 Implement `initNav()` in `js/nav.js`
    - On `DOMContentLoaded`, compare `window.location.pathname` against each nav link `href`; add `aria-current="page"` and class `active` to the matching link
    - Wire `#nav-toggle` click handler: toggle a CSS class on `#nav-links` to show/hide, update `aria-expanded` on the button
    - Close mobile menu on Escape key press and when focus leaves the `<nav>` element
    - _Requirements: 2.4, 2.5, 8.2, 8.3, 10.5_

  - [ ]* 3.2 Write property test for active navigation link (Property 2)
    - **Property 2: Active navigation link matches current page**
    - **Validates: Requirements 2.4**
    - Use `fc.constantFrom(...pagePathnames)` to generate page pathnames; for each, assert exactly one link receives `aria-current="page"` and `.active`

  - [ ]* 3.3 Write property test for mobile navigation toggle ARIA state (Property 7)
    - **Property 7: Mobile navigation toggle updates ARIA state**
    - **Validates: Requirements 8.3**
    - Use `fc.boolean()` for initial open/closed state; toggle and assert `aria-expanded` flips and `#nav-links` visibility changes accordingly

- [x] 4. Checkpoint — Ensure nav tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Implement Home Page (`index.html`)
  - [x] 5.1 Build the Home Page `<main>` content inside `index.html`
    - Hero section: company name "Adenine Research (Pty) Ltd.", tagline describing the optical fiber cochlear implant mission, CTA button linking to `research.html`
    - Summary section: 3–5 sentences on Computational Neuroscience and cochlear implant research in Africa
    - Visual element: `<img>` with descriptive `alt` text referencing neuroscience/cochlear implant research (use placeholder asset)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 10.1_

  - [ ]* 5.2 Write unit tests for Home Page structure
    - Assert `index.html` parses without errors
    - Assert hero section contains "Adenine Research (Pty) Ltd." and a link to `research.html`
    - Assert visual element `<img>` has non-empty `alt`
    - _Requirements: 3.2, 3.4, 10.1_

- [ ] 6. Implement About Page (`about.html`)
  - [x] 6.1 Create `about.html` using the shared layout shell
    - `<main>` content: founding mission section, African base of operations, focus on advancing cochlear implant technology through Computational Neuroscience
    - Include legal name "Adenine Research (Pty) Ltd." and South African private company registration context
    - _Requirements: 4.1, 4.2, 4.3_

  - [ ]* 6.2 Write unit test for About Page
    - Assert `about.html` contains "Adenine Research (Pty) Ltd."
    - _Requirements: 4.3_

- [ ] 7. Implement Research Page (`research.html`)
  - [x] 7.1 Create `research.html` using the shared layout shell
    - Section: optical fibers vs. metal electrodes — scientific rationale
    - Section: Computational Neuroscience methods
    - Section: patient benefits of optical cochlear implants
    - Section: publications/references list (placeholder entries with `Publication` structure: authors, title, venue, year, optional URL)
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 8. Implement Team Page (`team.html`)
  - [x] 8.1 Create `team.html` using the shared layout shell
    - Render at least one team member card using the `TeamMember` model: name, role, bio, `<img>` with descriptive `alt`, optional profile link
    - Use `assets/team/placeholder.svg` as photo source with appropriate `alt` text
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 10.1_

  - [ ]* 8.2 Write property test for team member card completeness (Property 3)
    - **Property 3: Team member cards are structurally complete**
    - **Validates: Requirements 6.2, 6.3**
    - Use `fc.record({ name: fc.string({minLength:1}), role: fc.string({minLength:1}), bio: fc.string({minLength:1}), photoSrc: fc.string({minLength:1}), photoAlt: fc.string({minLength:1}) })` to generate team member data, render card HTML, assert required elements are present and non-empty

- [ ] 9. Implement Contact Page (`contact.html`) and `js/contact.js`
  - [x] 9.1 Create `contact.html` using the shared layout shell
    - Company info section: email address placeholder and city/country location
    - Contact form: fields for name, email, subject, message — each with a `<label for="...">` and matching `id`
    - Submit button labeled "Send Message"
    - Success confirmation element (hidden by default)
    - Inline error message elements adjacent to each field (hidden by default)
    - Include `<script src="js/contact.js" defer></script>`
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 10.4_

  - [x] 9.2 Implement `js/contact.js`
    - Export/expose `validateEmail(email: string) → boolean`: RFC 5322 simplified regex — must contain exactly one `@`, non-empty local part, non-empty domain with at least one `.`
    - Export/expose `validateField(field) → { valid: boolean, message: string }`: returns invalid with message if field value is empty
    - Implement `initContactForm(formSelector)`: intercept `submit` event; run `validateField` on all required fields and `validateEmail` on the email field; on failure show inline errors and prevent submission; on success hide form and show success banner; handle third-party service fetch errors with a generic error banner preserving form data
    - Call `initContactForm('#contact-form')` on `DOMContentLoaded`
    - _Requirements: 7.5, 7.6, 7.7_

  - [ ]* 9.3 Write property test for valid form submission → success state (Property 4)
    - **Property 4: Valid contact form submission produces success state**
    - **Validates: Requirements 7.5**
    - Use `fc.record({ name: fc.string({minLength:1}), email: validEmailArb, subject: fc.string({minLength:1}), message: fc.string({minLength:1}) })` to generate valid `ContactFormData`; assert success UI shown and form hidden

  - [ ]* 9.4 Write property test for invalid form submission → inline errors (Property 5)
    - **Property 5: Invalid contact form submission produces inline errors**
    - **Validates: Requirements 7.6**
    - Generate `ContactFormData` with at least one empty/invalid field; assert submission is prevented and at least one inline error is displayed

  - [ ]* 9.5 Write property test for email validation (Property 6)
    - **Property 6: Email validation accepts valid addresses and rejects invalid ones**
    - **Validates: Requirements 7.7**
    - Use `fc.emailAddress()` for valid inputs (assert `true`); use `fc.string()` filtered to exclude `@` for invalid inputs (assert `false`)

  - [ ]* 9.6 Write property test for contact form label association (Property 10)
    - **Property 10: Every contact form field has an associated label**
    - **Validates: Requirements 10.4**
    - Parse `contact.html` with `jsdom`; for each `<input>`/`<textarea>` with an `id`, assert a `<label for="...">` with matching value exists

  - [ ]* 9.7 Write unit tests for contact form
    - Assert `contact.html` contains a submit button with text "Send Message"
    - Assert fields for name, email, subject, message are present
    - Assert `validateEmail("user@example.com")` returns `true`
    - Assert `validateEmail("not-an-email")` returns `false`
    - Assert `validateEmail("")` returns `false`
    - _Requirements: 7.3, 7.4, 7.7_

- [x] 10. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Implement Error Page (`error.html`)
  - Create `error.html` using the shared layout shell
  - Friendly 404/error message and a prominent link back to `index.html`
  - No JavaScript required
  - _Requirements: 1.3, 1.5_

- [ ] 12. Implement alt text and accessibility audit across all pages
  - [x] 12.1 Audit all `<img>` elements across all HTML pages
    - Ensure every non-decorative image has a non-empty `alt` attribute
    - Ensure decorative images use `alt=""`
    - _Requirements: 10.1_

  - [ ]* 12.2 Write property test for non-decorative image alt text (Property 8)
    - **Property 8: All non-decorative images have non-empty alt text**
    - **Validates: Requirements 10.1**
    - Parse each HTML file with `jsdom`; for every `<img>` where `alt !== ""`, assert `alt` is present and non-empty

  - [x] 12.3 Verify color contrast compliance in `css/variables.css`
    - Confirm `--color-text` (#1c1c1e) on `--color-background` (#f8f9fa) yields ≥ 4.5:1 contrast ratio
    - Confirm `--color-primary` (#1a3a5c) on `--color-background` (#f8f9fa) yields ≥ 4.5:1 for heading text
    - _Requirements: 10.3_

  - [ ]* 12.4 Write unit test for color contrast ratio
    - Assert computed contrast ratio for `--color-text` (#1c1c1e) on `--color-background` (#f8f9fa) is ≥ 4.5:1
    - _Requirements: 10.3_

- [ ] 13. Wire all pages together and apply responsive CSS
  - [x] 13.1 Copy the shared layout shell to `about.html`, `research.html`, `team.html`, `contact.html`, and `error.html` (if not already done per-page)
    - Ensure each page links `css/reset.css`, `css/variables.css`, `css/main.css`
    - Ensure each page includes `<script src="js/nav.js" defer></script>`
    - Verify all inter-page navigation links resolve correctly
    - _Requirements: 2.1, 2.2, 8.1, 8.4_

  - [x] 13.2 Implement responsive layout in `css/main.css`
    - Fluid layout containers using `%`, `vw`, `rem`, `em` — no fixed pixel widths on primary containers
    - Media query at 768px: collapse nav into hamburger menu (hide `#nav-links` by default, show on `.nav-open` class)
    - Responsive team card grid, research section layout, and hero section
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [x] 14. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use **fast-check** with `fc.configureGlobal({ numRuns: 100 })`
- HTML structure tests use **jsdom** for DOM parsing in a Node.js test environment (Jest or Vitest recommended)
- Checkpoints ensure incremental validation at key milestones
- The production build step (minification, image optimisation, S3 upload) is infrastructure work outside the scope of coding tasks
