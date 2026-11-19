# Bitwarden emergency access verification

Verified: 2026-11-19. Issue: #545.

Official source: https://bitwarden.com/help/emergency-access/

Change only `password-managers/bitwarden.features.emergency_access` from `unknown` to `paid`, and append the source. The badge concerns the account holder configuring access, not a fee charged to a recipient.

## Scope

- Adding trusted contacts requires premium entitlement, including membership in paid Families, Teams or Enterprise organizations.
- A contact can use a free account but must be on the same Bitwarden server.
- Accounts governed by the organization's Automatic confirmation policy cannot use this feature.
- Contacts must be arranged beforehand. A request takes effect after owner approval or the configured wait time, not simply upon invitation.
- View permits reading personal-vault items; takeover resets the master password and removes existing two-step-login methods. This is not ordinary item sharing or guaranteed organization-vault recovery.

No account operation was performed. This is the Password Manager capability, not the separate Authenticator in #406. No shared translations, prices, licenses, unrelated unknowns, application behavior or production settings are changed. Existing bilingual paid labels are used without claiming universal plan eligibility.

## Verification

Unit tests lock the status/source and preserve unrelated values; the browser regression checks visible English and Chinese paid labels/tooltips at 1280px and 390px. Existing TOTP/passkey tests are updated only for the newly verified emergency-access value. Local aggregate tests/build and final CI are reported in the PR; production is not visited.
