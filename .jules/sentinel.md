# Sentinel's Journal 🛡️

## 2024-05-22 - [XSS Risk in Astro Components]
**Vulnerability:** Client-side `innerHTML` usage with external API data (GitHub contributors) in `Leaderboard.astro`.
**Learning:** Even in static sites, client-side scripts can introduce XSS if they render external data unsafely.
**Prevention:** Use `document.createElement`, `textContent` and `setAttribute` instead of `innerHTML`. Validate URLs (protocol check) before using them in `href` or `src`.
