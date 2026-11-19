# iMovie 4K export evidence

Verified 2026-11-19 for #563. Only `imovie.features.export_4k` changes from unknown to yes.

Official source: https://support.apple.com/en-ie/102276 (Apple, published June 1, 2026).

Apple describes 3840 × 2160 UHD project sharing on Mac, iPhone and iPad, with file/Photos export steps. Project setup matters: Mac uses the first video clip to set the project format; mobile projects need suitable source media (photo-only projects are also supported). Device requirements apply. This is evidence of a 4K export capability, not a promise for every machine, clip or share destination. Some online destinations reduce resolution.

The article discusses 4K at 30 fps separately from 1080p60. This change does not assert a universal frame-rate ceiling or 4K60 availability: current platform guides may vary. No assumptions are made about proxy editing, GPU acceleration or keyframes, which remain unknown. No pricing, licensing, platform or shared translation changes.

Tests cover the capability and official source plus unchanged unknowns; browser regression checks the 4K status in English/Chinese at desktop/mobile widths. No video was rendered and no production page was visited.
