# NordPass integrated TOTP verification

Verified 2026-11-19. Issue #553.

Official sources:
- https://support.nordpass.com/hc/en-us/articles/8061258237585-How-to-use-NordPass-Authenticator
- https://support.nordpass.com/hc/en-us/articles/360006700458-Premium-vs-Free-version-of-NordPass

The authenticator guide describes time-based six-digit codes stored with password items for external websites/apps. The plan guide includes Authenticator among Premium benefits; Family includes Premium benefits. Thus totp changes from unknown to paid, not universally free.

The documented clients are Android/iOS and extensions for Chromium-based browsers on macOS/Windows and Firefox on Windows. No native desktop, Linux, Safari or every-platform parity is inferred. Viewing codes requires biometric confirmation according to the guide; code autofill is conditional on NordPass having filled the preceding username/password. The guide warns not to store the NordPass account's own TOTP in this vault because of lockout risk. This is distinct from Nord Account sign-in MFA and from #406 Bitwarden Authenticator.

Only the capability and sources change. Pricing, platforms, licenses, other unknowns and shared translation dictionaries stay unchanged. No credentials were accessed or account settings changed. Unit tests lock the paid status; browser test checks visible EN/ZH labels and tooltips at desktop/mobile widths. Actual verification recorded in PR.
