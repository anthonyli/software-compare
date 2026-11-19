# Kdenlive 4K export evidence

Verified 2026-11-19. Only `kdenlive.features.export_4k` changes from unknown to yes.

Official source: https://docs.kdenlive.org/en/getting_started/introduction.html (26.08 manual).

The manual's export section explicitly lists UHD/4K output with FFmpeg-supported formats. This provides direct output evidence, not merely 4K source import or proxy editing. Encoding availability depends on the installed components and selected format/settings. No claim is made about all codec/hardware combinations, realtime performance or GPU acceleration. The GPU field remains unknown. Pricing, licensing and platforms are unchanged.

Unit coverage verifies the flag, official source and preserved GPU uncertainty/platforms. Existing regressions stop expecting the now-verified flag to remain unknown. Browser regression checks the 4K status in English/Chinese at desktop/mobile widths. No shared dictionary changes, production access or video rendering.
