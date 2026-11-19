# Clipchamp basic color adjustment

Verified 2026-11-19 for #585. Only `clipchamp.color_grade` changes from unknown to yes.

## Official evidence
- https://support.microsoft.com/en-us/clipchamp/how-to-change-the-color-of-a-video documents manual exposure, contrast, saturation and temperature sliders, with reset. Applies to personal and work accounts.
- https://clipchamp.com/en/video-enhancer/ explicitly identifies these color correction tools as free; the current page is not a time-limited promotion.

## Scope
The category label is general color adjustment. This verifies basic manual clip-level adjustment, not professional nodes, color wheels, LUT import, HDR mastering, or every premium filter. Existing paid 4K and unknown keyframes, proxies and GPU acceleration are unchanged. No claim of free organizational licensing, restored lost image detail or lossless re-encoding. These are current web-editor instructions, not a promise for every historical app version.

## Verification
Unit tests cover the new status, sources and remaining boundaries. Earlier Clipchamp tests stop asserting the now-verified cell is unknown. English/Chinese desktop/mobile regression checks the existing translated support badge. No dictionary, production configuration or production browsing changes; no video render.
