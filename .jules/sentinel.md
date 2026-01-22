## 2025-05-22 - Reverse Tabnabbing & Unsanitized API Data
**Vulnerability:** Found `target="_blank"` links in `Leaderboard.astro` without `rel="noopener noreferrer"`, exposing the site to reverse tabnabbing attacks. Also identified direct injection of external API data into `innerHTML` without sanitization.
**Learning:** Even trusted APIs like GitHub can potentially return data that, if rendered unsanitized or linked insecurely, creates XSS or phishing vectors. Frontend components fetching data client-side must be as defensive as backend code.
**Prevention:** Always pair `target="_blank"` with `rel="noopener noreferrer"`. Sanitize all external data before injecting into the DOM, or prefer `textContent` over `innerHTML` where possible.
