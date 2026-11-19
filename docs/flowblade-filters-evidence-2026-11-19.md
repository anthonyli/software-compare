# Flowblade filtering capabilities verification

Verified 2026-11-19. Issue #559.

Official sources:
- https://jliljebl.github.io/flowblade/features.html
- https://jliljebl.github.io/flowblade/webhelp/filtering.html

The feature page explicitly lists artistic/blur/distortion filters, Color Grading, Curves and Levels, and Chroma Key. It states most filters and all compositors support keyframes. The filtering manual documents applying/editing clip image/audio filters and timeline property editing with the Keyframe Tool. These support changing effects, keyframes, color_grade and chroma_key from unknown to yes.

The flags indicate availability, not that every filter property supports animation, that color tools equal a full grading suite, or that chroma key performs AI background removal. The feature page also has rendering/profile lists, but these are not used to infer 4K or GPU support; those remain unknown. Installed media dependencies can affect the exact filter set.

Only these four flags and official sources change. Pricing, licensing, platforms, shared dictionaries, #406 and production configuration remain untouched. No video is generated/rendered. Unit regression checks target values and preserves remaining unknowns. Browser regression covers all four rows, English/Chinese and desktop/mobile widths. Actual checks are recorded in PR.
