# Shottr: window capture and pinned screenshots

Checked 2026-11-18 for issue #480. Official source: https://shottr.cc

The current homepage describes pinned screenshots as borderless, floating, always-on-top windows. Its v1.6.1 release notes document an assignable Capture Any Window hotkey. These directly resolve the existing window_capture unknown and pin_to_screen partial values to yes; the old explanations relied on absence of explicit wording which is no longer accurate.

Only those two cells change. Existing macOS scope, pricing, release snapshot and other feature values remain unchanged. This is documentation verification, not a claim of hands-on performance or compatibility testing. It does not imply arbitrary capture restrictions are bypassed or that every fullscreen/Space interaction works identically.

Unit and bilingual desktop/mobile regressions cover the two supported cells. No shared translation dictionary changes.


## Follow-up: delayed capture and color picking (#483)

Checked 2026-11-18. https://shottr.cc/kb/urlschemes documents `shottr://grab/delayed` (3-second default) and a custom seconds parameter; schemes have been supported since v1.8. https://shottr.cc/ explicitly describes taking a screenshot and copying a pixel color with Tab. These resolve `delay_timer` and `color_picker` to yes, removing obsolete unverified notes.

Boundary: color picking operates on captured pixels, not a claim of a live-screen eyedropper. https://shottr.cc/kb/faq says raster operations do not apply to overlay/annotation objects until rasterized into the base image. No claim of repeated/automated scheduling or all UI paths exposing custom delay. Price, release snapshot and other capabilities unchanged. No screenshot software was executed or benchmarked.
