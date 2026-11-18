# Passbolt TOTP generation

Issue #521. Verified 2026-11-19 from official documentation, not an installed-app test.

https://www.passbolt.com/docs/user/basic-features/mobile/totp-mobile/
https://www.passbolt.com/docs/user/basic-features/browser/create-resource/

The mobile guide, marked CE/Pro/Cloud, describes TOTP creation since 4.3.0 and code preview on Android and iOS. The browser guide documents generating codes from stored secrets and requires the instance to enable the TOTP content type. Provider parameters must match. This is code generation for other services, distinct from using an external authenticator to unlock Passbolt. No passkey, pricing, universal-version parity or security-equivalence claim is made. Other product data remains unchanged; no secrets were entered or accounts configured.
