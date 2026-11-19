# Padloc extension and authenticator verification

Verified 2026-11-19. Issue #547. Official source: https://padloc.app/ (already listed in product sources).

- The download section links official Google Chrome and Firefox extensions. Change browser_extension from unknown to yes; this does not assert parity with every desktop function or every browser.
- The personal pricing comparison excludes the built-in authenticator / one-time passwords from Free and includes it in Premium and Family. Change totp from unknown to paid. Hosted paid plans offer a 30-day trial, not a permanently free authenticator entitlement.
- The pricing table lists account multi-factor authentication separately from the built-in authenticator. This change concerns generating stored-item codes, not securing the Padloc account itself.
- This is the hosted plan comparison, not a claim about restrictions on independently self-hosted source builds. Other unknowns, pricing, licenses and platforms remain unchanged. No account was created or software installed.

No shared translation dictionary, #406, UI code or production configuration changes. Existing bilingual status labels are sufficient for these two basic availability facts. Regression covers English/Chinese at desktop/mobile widths; unit checks preserve unrelated unknowns. Final actual checks are recorded in the PR.
