# AuthPass TOTP generation

Issue #523. Verified 2026-11-19 from official sources, not an installed-app test.

- https://authpass.app/articles/time-based-one-time-tokens-for-2nd-factor-otpauth/
- https://github.com/authpass/authpass/releases/tag/v1.9.9

The February 2020 official guide (AuthPass 1.4.0) describes storing a TOTP secret in the KDBX password file, scanning an enrollment QR code and displaying the changing code with its remaining lifetime. The later v1.9.9 release additionally documents import of Google Authenticator export QR codes. These support built-in TOTP generation, not MFA for unlocking the AuthPass database or universal support for proprietary authentication protocols. Platform UI parity and all possible import formats are not inferred. Pricing, license, release snapshot and other capabilities remain unchanged. No secret was entered, account configured or authentication performed.
