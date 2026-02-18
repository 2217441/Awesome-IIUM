## 2026-01-24 - StatusDashboard XSS Vulnerability

**Vulnerability:** Unsanitized data from internal API used in `innerHTML`
assignment in `StatusDashboard.astro`. **Learning:** Even internal data sources
(like `status.json`) should be treated as untrusted in client-side scripts to
prevent XSS if the source is compromised. **Prevention:** Always sanitize data
using an escape helper or use `textContent` / DOM creation methods instead of
`innerHTML`.

## 2026-01-27 - PrayerTimes External API XSS

**Vulnerability:** Unsanitized data from external API (aladhan.com) used in `innerHTML` in `PrayerTimes.astro`.
**Learning:** External APIs, even trusted ones, can be vectors for XSS if their response is injected directly into the DOM.
**Prevention:** Implement local `escapeHtml` helper in Astro client scripts and sanitize all dynamic data before using `innerHTML`.

## 2026-02-04 - Client-Side DoS via Unbounded Inputs
**Vulnerability:** `GPACalculator.astro` allowed unlimited row creation and unbounded input strings.
**Learning:** Client-side tools without input constraints can lead to browser resource exhaustion (DOM/Memory).
**Prevention:** Always enforce `maxlength` on text inputs and reasonable upper bounds (e.g. `max`, row limits) on dynamic collections.

## 2026-02-05 - XSS in ErrorBoundary via innerHTML
**Vulnerability:** The `ErrorBoundary` component injected error messages directly into `innerHTML` without sanitization, allowing XSS if a child component threw an error containing HTML.
**Learning:** `document.currentScript` is unreliable in Astro client scripts, leading to component failure (which masked the XSS). Reliable selection requires generated IDs.
**Prevention:** Always use `escapeHtml` for dynamic data in `innerHTML`. Use unique IDs passed via `define:vars` for robust DOM selection in Astro.

## 2026-02-07 - Security Headers via Meta Tags (Static Site)
**Vulnerability:** Lack of security headers (CSP, Referrer-Policy) on GitHub Pages deployment.
**Learning:** For static hosting platforms like GitHub Pages where HTTP headers are not customizable, critical security headers can be enforced via `<meta>` tags injected at build time (e.g., in Astro config).
**Prevention:** Configure `astro.config.mjs` to inject `Content-Security-Policy` and `Referrer-Policy` meta tags in the `<head>`.

## 2026-02-07 - Conflicting CSP Definitions
**Vulnerability:** Multiple conflicting `Content-Security-Policy` and `referrer` meta tags were defined in `astro.config.mjs`, leading to potential security gaps and maintenance confusion.
**Learning:** Redundant security configurations can drift apart, causing some environments to be less secure than intended or breaking functionality unpredictably.
**Prevention:** Consolidate security headers/meta tags into a single source of truth (or strictly synchronized definitions) and remove duplicates.
