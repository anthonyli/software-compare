# Wick Editor (2026-11-15)

Adds a distinct browser-based 2D animation/interactive authoring option; main 6c8081b has eight products and no Wick Editor. Open issue/PR search was empty before Issue195.

Official evidence:
- https://github.com/Wicklets/wick-editor README: free open-source web animation/game editor, npm development setup, desktop-build wiki separate.
- https://github.com/Wicklets/wick-editor/blob/master/LICENSE.md GPLv3. This applies to software, not a blanket clearance of media or dependencies.
- https://github.com/Wicklets/wick-editor/blob/master/engine/src/base/Path.js path engine and https://github.com/Wicklets/wick-editor/blob/master/engine/src/base/Tween.js transform interpolation (x/y/scale/rotation/opacity) support vector animation.
- Bone/raster animation and node effects remain unknown rather than inferred absent.

Only documentation/source inspection; no installation, software execution, rendering, upload, network/privacy audit or M4 benchmark. Current homepage text extractor only exposed JS requirement, so no UI behavior claims. Web platform only; do not infer current native desktop package compatibility from build instructions. Browser tests exercise Compare rendering, not Wick functionality.
