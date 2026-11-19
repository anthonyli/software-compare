# Filmora desktop keyframe animation

Verified 2026-11-19 for #589. Only `filmora.keyframes` changes from unknown to yes.

## Official evidence
- https://filmora.wondershare.com/guide/add-animation-keyframing.html is the current Windows guide. It describes adding keyframes to position, scale, rotation and opacity, changing values at another timeline point, and deleting individual or all keyframes.
- https://filmora.wondershare.com/guide-mac/keyframing.html independently documents the corresponding Mac workflow and interpolation between points.

## Scope
This verifies user-defined parameter animation, not merely applying a preset. The current unversioned desktop guides do not establish identical behavior in every older release or mobile version. No inference of AI tracking, universal keyframability of all effects, or free/watermark-free exports. Existing commercial pricing and trial cautions remain unchanged. Chroma key, GPU acceleration and 4K export stay unknown; proxy support remains verified.

## Verification
Unit tests cover the capability and preserve boundaries; the proxy test no longer asserts the newly verified field is unknown. English/Chinese desktop/mobile regression checks the existing support badge. No shared dictionary, production changes, production browsing, installation or video rendering.
