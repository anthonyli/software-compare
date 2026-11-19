# Pitivi proxy editing and audio mixing verification

Verified 2026-11-19. Issue #557.

Official sources:
- https://www.pitivi.org/tour/ explicitly lists background clip-proxy generation and mixing concurrent audio layers, alongside volume keyframes.
- https://www.pitivi.org/manual/importing.html explains optimized media: transcoding an input to an editing-friendly format into a separate file, controlled during import and managed afterward through the media library.

Change proxy and audio_mix from unknown to yes. This is more than timeline audio playback and more than an unimplemented design proposal: both appear in the public feature tour and proxy workflow in the user manual. The manual warns some formats are slow/imprecise without optimization; supported decoding/encoding relies on GStreamer. Do not infer all-codec support, GPU-accelerated encoding, 4K performance or professional audio-routing parity.

No other feature values, pricing, platforms, licensing, shared translations or production settings change. No media was rendered or software installed. Existing tests stop asserting the now-verified proxy is unknown; new unit tests preserve remaining unknowns. Browser regression checks both supported rows in English/Chinese at desktop/mobile widths. Actual test results are recorded in PR.
