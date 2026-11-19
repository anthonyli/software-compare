# Waveform Free audio export

Verified 2026-11-19 for #583. Only `waveform-free.export_formats` changes from unknown to yes.

## Official evidence
- https://www.tracktion.com/products/waveform-free identifies the current Free release as 14.1, without trial expiry.
- https://www.tracktion.com/products/waveform-free-features explicitly includes the rebuilt Render & Export workflow in Free and Pro, while reserving Advanced mode for Pro.
- https://tracktion.github.io/waveform_manual/latest/quick-start/ section 11 describes rendering a selected range to WAV or MP3. Its licensing section requires account-based unlocking; existing account caveats remain intact.

## Scope
This verifies ordinary multi-format audio file export, not that every codec, Advanced stem routing, AI feature, or expansion is free. Do not infer format support from old Waveform 8 screenshots. The current Free-specific page anchors edition eligibility, while the current manual supplies the concrete WAV/MP3 workflow. Noise reduction, spectral editing and batch processing remain unknown; a render queue alone is not being treated as proof of batch processing.

## Verification
A focused unit test preserves these boundaries. Browser regression checks the translated support status on English/Chinese desktop/mobile product pages. No shared dictionary or production configuration changes, production browsing, software installation or video rendering.
