## 2026-02-04 - Countdown Timer Accessibility
**Learning:** Using `aria-live` on a second-by-second countdown creates excessive noise for screen reader users.
**Action:** Use a `title` attribute on the countdown element to provide the absolute target time (e.g., "Next prayer at 5:30 PM"). This offers a static, accessible reference on hover and for assistive technologies without constant updates.
