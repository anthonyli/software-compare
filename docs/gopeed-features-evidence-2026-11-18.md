# Gopeed ED2K and browser integration evidence

Issue: #474. Checked 2026-11-18. Documentation verification, not actual downloading or speed benchmarking.

- https://github.com/GopeedLab/gopeed/blob/v1.9.3/README.md explicitly lists ED2K in supported protocols and links the official browser extension for Chrome, Edge and Firefox. This matches the recorded 1.9.3 release, rather than assuming capabilities from the 2.0 beta.
- https://gopeed.com/docs currently confirms ED2K support.
- https://github.com/GopeedLab/browser-extension supplies official store links and requires installed Gopeed >= 1.6.8. Its README notes that Linux automatic takeover may need TCP/API configuration; remote server configuration is optional. Browser integration support is not a promise of zero-configuration interception on every OS or support for every browser.

Only `ed2k` and `browser_ext` change from unknown to yes; obsolete unverified notes are removed. Other feature values, platform/license/pricing and release metadata remain unchanged. No new translation keys or deployment/layout changes. No inference of website extraction, m3u8 support, scheduling or speed limiting.
