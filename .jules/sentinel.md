## 2025-01-25 - Unsanitized External Data in innerHTML

**Vulnerability:** `PrayerTimes.astro` used `innerHTML` to render data fetched
from an external API (`api.aladhan.com`) without sanitization, leading to
potential XSS if the API is compromised. **Learning:** Client-side fetching in
Astro components often leads to manual DOM manipulation. Developers might assume
external JSON data is safe, but it must be treated as untrusted. **Prevention:**
Always sanitize data interpolated into `innerHTML`. Prefer `textContent` or
robust DOM creation methods over template strings. Local `escapeHtml` helpers
are effective for simple cases.
