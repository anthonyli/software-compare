# Shotcut partial GPU acceleration

Verified 2026-11-19 for #595. Only `shotcut.gpu_accel` changes from unknown to partial.

## Official sources
- https://www.shotcut.org/FAQ/ distinguishes interface rendering, optional hardware decoding and encoding, and GPU effects in the 10-bit Linear GPU/CPU mode. Default CPU processing still performs substantial filters/transitions/compositing work on the CPU.
- https://www.shotcut.org/blog/new-release-26.01.30/ dates hardware decoding behavior to 26.1: hardware-codec support and software fallback, preview limits, non-zero-copy processing. Export hardware decoding is a separate option and can increase export time.

## Scope
Partial reflects a mixed processing pipeline, not absence of hardware encoding and not universal GPU acceleration. Settings, OS, drivers, hardware codec support and the operation matter. Preview decoding limits are not universal export limits. No promise of guaranteed speedup, zero CPU use, specific M4 performance, or identical historical-version support. Current FAQ is used alongside the versioned introduction; unrelated capabilities and release metadata are unchanged.

## Verification
Unit tests preserve the partial classification and source links. Browser regression checks existing localized partial status on desktop/mobile. No shared dictionary, production access/configuration or video rendering.
