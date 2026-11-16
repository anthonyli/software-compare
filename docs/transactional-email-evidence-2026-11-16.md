# Transactional email evidence (2026-11-16 UTC)

Issue #358. Scope: ongoing Free transactional sending, not promotional campaigns, paid tiers, Sandbox or limited trials. No signup, domain verification, account action or live mail was performed. Mainland China signup eligibility, local reachability and guaranteed inbox delivery remain unverified; no blanket commercial-use entitlement is claimed.

## Resend
- https://resend.com/docs/knowledge-base/account-quotas-and-limits : 3,000/month AND 100 per UTC calendar day; inbound counts, each outbound To/CC/BCC recipient counts; three verified domains; quota errors 429 with no provider queue/retry. Paid overage settings are not Free behavior.
- https://resend.com/changelog/three-domains-on-the-free-tier : 2026-08-25 increase from one to three domains. Account quota does not multiply per domain.
- https://resend.com/docs/knowledge-base/does-resend-require-production-approval : no approval/sandbox wait, but DNS domain verification still required.
- https://resend.com/legal/terms-of-service : section 6 says Free needs no billing details, while reserving change, cancellation and conversion to paid upon excess usage. Do not reduce this to an unconditional permanent no-charge guarantee.
- https://resend.com/legal/acceptable-use : cold outreach and purchased/scraped contacts prohibited; complaint rate below 0.08%, bounce rate below 4%. Last updated 2026-10-13.

## MailerSend
- https://www.mailersend.com/help/plans-features-and-limits : approved Free 500 emails/30 days AND 100/day; one domain and separate 100 API requests/day. Free does not permit extra billed volume; sends pause at the allowance. Specific Free rule takes precedence over generic paid-overage language in pricing FAQ.
- https://www.mailersend.com/pricing : Free FAQ explicitly requires organization address and credit card after account approval; the vendor says Free is not charged. Separate 14-day Professional trial and Sandbox are not used as Free production eligibility. Custom-domain DNS authentication described in trial-domain FAQ.

## Brevo
- https://help.brevo.com/hc/en-us/articles/208589409-About-Brevo-s-pricing-plans : ongoing Free includes transactional email, 300/day, no rollover, no credit card.
- https://help.brevo.com/hc/en-us/articles/208580669-FAQs-What-are-the-limits-of-the-Free-plan : branding retained; transactional overflow has a maximum 1,000-email retry queue, beyond which messages are not delivered. Do not conflate manual campaign requeue with transactional queue. Not a fixed 9,000/month grant.
- https://help.brevo.com/hc/en-us/articles/4410311028626-About-the-deletion-of-inactive-Free-plan-accounts : four months inactive leads to deletion; automatic transactional activity counts as active. Not simply four months without dashboard login.
- Domain-count entitlement and exact production approval requirements unverified, visibly marked unknown.

## Integration and verification
Six separate dimensions: transactional send, free quota, domains, no approval, card-free, over-limit behavior. Context remains visible in desktop matrix and mobile cards. Free-only prices are zero without invented paid pricing. English translations added without altering prior mappings. Shared config/i18n/design/page edits must be merged as deltas with concurrent hosting/SQL work, never replacing their complete files.

Local test and visual results are recorded in docs/design/transactional-email-review.md. CI and remote publication are the coordinating parent's responsibility; this worktree does not publish.
