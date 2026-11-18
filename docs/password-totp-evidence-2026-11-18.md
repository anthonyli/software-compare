# gopass / KeeWeb TOTP verification

Issue #441. Checked 2026-11-18. This is official-source review, not a security audit or live credential test.

- gopass stable v1.17.4, commit 83f0487de897753118e3dba65ef99a457e9874e3: built-in `otp` command generates TOTP from stored OTP input. Its optional screenshot QR ingestion has platform/build constraints; none are claimed here. HOTP needs a counter.
  https://github.com/gopasspw/gopass/blob/83f0487de897753118e3dba65ef99a457e9874e3/docs/commands/otp.md
- KeeWeb stable v1.18.7, commit dfc6201285ec1dfecd2e8f80363d82811e75bc6d: OTP parser accepts totp/hotp and next() derives the time-step counter, computes HMAC and displays a token. Existing v1.18 release notes also document filling OTP in extensions. This only establishes code-generation capability, not current browser integration reliability.
  https://github.com/keeweb/keeweb/blob/dfc6201285ec1dfecd2e8f80363d82811e75bc6d/app/scripts/util/data/otp.js

Only the two TOTP cells and source links change. A stored TOTP generator is not a second factor protecting vault unlock, nor a recommendation to co-store passwords and OTP seeds. No real credentials were read, generated, imported or transmitted. Pricing, licensing, platform, storage, sharing, autofill and all other cells are untouched. The shared English dictionary is byte-identical.
