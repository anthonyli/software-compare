# NordPass sharing and emergency-access verification

Verified 2026-11-19. Issue #551.

## Official evidence

- https://support.nordpass.com/hc/en-us/articles/360017660077-Managing-access-levels-in-NordPass : initiating item sharing requires Premium. Free users can access shared items, but their changes are not propagated to others. Permissions limit editing, resharing and viewing; passkeys/notes do not have an autofill-only permission.
- https://support.nordpass.com/hc/en-us/articles/5691777958929-How-to-give-Emergency-Access-in-NordPass : setup requires individual Premium or Family; recipients can be Free users. The documented clients are desktop, Android and Web Vault, not a claim of iOS parity. The recipient accepts the invitation and requests access. The owner can approve or refuse within seven days; absent a response access is granted afterward. The article says an active subscription is not required during the emergency-access period.

Change password_sharing and emergency_access from unknown to paid, indicating the grantor's setup entitlement rather than a charge to recipients. Emergency access is for viewing passwords and notes; do not infer Bitwarden-style takeover/reset or immediate access from an invitation alone. No account action or sharing of credentials was performed.

Other feature values, price/license/platform fields, shared translations, #406 and production configuration remain unchanged. Unit regression preserves unrelated unknowns; English/Chinese paid-status tests cover both rows at desktop/mobile widths. Actual checks are recorded in the PR.
