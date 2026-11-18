# Pitivi effects verification (2026-11-18)

Issue: #464

Official source: https://www.pitivi.org/manual/usingeffects.html

The Effect Library lists audio/video effects installed on the system, with search/category filtering and adjustable clip-effect properties. This directly supports the generic effects capability. Change only `effects` from unknown to yes. Do not infer a fixed effect inventory, support for a particular chroma-key or color-grading effect, acceleration, or 4K export. Only eligible properties support keyframe control; this batch does not broaden keyframe claims. Linux scope and other data remain unchanged.

Validation: targeted positive unit coverage, existing adjacent-feature assertions preserved except superseded effects-unknown assertions; bilingual desktop/mobile feature-row regression. No actual media rendering or performance measurement. No translation, layout, deployment or production-site changes.

The combined effects/transitions column is also supported by https://www.pitivi.org/manual/transitions.html: overlapping clips create crossfades, and the Transition tab offers other transitions. No fixed inventory is claimed.
