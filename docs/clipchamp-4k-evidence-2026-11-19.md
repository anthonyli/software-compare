# Clipchamp 4K export entitlement

Verified 2026-11-19. Only `clipchamp.features.export_4k` changes from unknown to paid.

- https://clipchamp.com/en/pricing/ distinguishes personal Free exports up to 1080p from Premium 4K UHD. Microsoft 365 Personal/Family includes premium features.
- https://support.microsoft.com/en-us/clipchamp/4k-video-support-in-clipchamp distinguishes 4K import (free/paid tiers) from export. Personal Premium/eligible subscriptions and work/education Standard/Premium support 4K export.

The paid status means the personal free tier does not include 4K output. It does not mean an additional purchase is required for users who already have qualifying Microsoft 365 or organizational entitlement, nor that work users must upgrade Standard to Premium. No amount, billing cadence, trial or automatic-renewal claim is introduced. Existing detailed pricing fields are outside this narrowly verified entitlement change. Other unknown capabilities remain unchanged.

Unit tests cover the entitlement and sources. Browser regression verifies the paid indicator in English/Chinese at desktop/mobile widths. No shared dictionary edits, production configuration/access or video rendering.
