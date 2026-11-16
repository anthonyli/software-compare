# Amazon SES evidence

Issue #378. Checked official sources on 2026-11-16 UTC. No account signup, card entry, email sending or Compare production visits.

https://aws.amazon.com/ses/pricing/

https://aws.amazon.com/blogs/messaging-and-targeting/introducing-amazon-simple-email-service-ses-pricing-plans/

https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html

https://aws.amazon.com/free/free-tier-faqs/

https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html

New accounts default to Essentials from July 21, 2026; the old SES-specific free allowance is closed to new customers. Compare default Essentials separately from opt-in à-la-carte. AWS Free account credits are conditional and temporary, not a perpetual email allowance. Current Free Tier FAQ now says most new customers need no payment method but verification may request one. Older billing docs require payment methods; do not universalize that older rule. FAQ itself gives six months for new signup credits and twelve months for upgraded credits; we leave post-upgrade expiry account-specific rather than silently resolve inconsistent generations. Sandbox quotas do not confer free sending or production approval. Global AWS only; mainland signup eligibility unverified.

Preserve existing products/translations, layout, preview, deployment and release. Unit coverage includes real public-text cleaning. Browser tests cover bilingual desktop/mobile comparison and detail pages with screenshots; verification results recorded in PR, not assumed here.
