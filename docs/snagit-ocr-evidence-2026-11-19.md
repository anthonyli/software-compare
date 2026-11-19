# Snagit OCR evidence — 2026-11-19

Issue #641. Base 111e1fbe143462cda765d9d4730190e017d8aaaf.

## Primary sources

- https://support.techsmith.com/hc/en-us/articles/115002031592-Snagit-Grab-Text-Edit-Text-Best-Practices (updated 2024-07-02): Grab Text recognizes image text. Angled, low-contrast, small, handwritten or decorative text can fail. Do not guarantee all scripts or accuracy. The language list is ambiguous, so no language-coverage claim is made.
- https://support.techsmith.com/hc/en-us/articles/45409168722445-Issues-With-Grab-Text-or-Other-OCR-Functions-Such-as-Edit-Text-or-Smart-Redact (updated 2026-05-13): third-party OCR licensing expired on May 1; patched branches are 2026.1.1+, 2025.4.2+, 2024.3.7+. 2023 and earlier are out of engineering support and get no patch. EXE/MSI and Windows editor settings scope this workaround; do not apply these patch numbers to Mac.
- https://download.techsmith.com/update/snagit/enu/26_updatemessage.html Windows release notes independently confirm OCR license refresh in 2026.1.1.

## Decision

Change OCR unknown → yes, with image-dependent accuracy and Windows legacy-engine license caveat. The May 2026 support article offered experimental Optimized OCR, subject to terms/admin controls. This is a historical alternative, not a current universal prerequisite: the Windows 2026.4.0 release notes explicitly switch the default engine to Microsoft OCR. The three patch thresholds apply to the legacy engine; do not claim that current 2026.4.0 requires an experimental switch or still defaults to ABBYY. No software update or terms acceptance was performed.

The historical 2024 PDF indexed by search also describes Grab Text, but direct retrieval returned HTTP429; it is not needed as the sole basis and is not added to data sources. The guessed tutorial URL was unavailable. Use the successfully read support articles and release notes above.

Keep prices, licensing, platform, pin/color-picker unknowns and existing text unchanged. Do not claim pricing re-verification, all-version support, local-only privacy or Chinese OCR. No new collection date implies all old pricing was refreshed. Add exactly one new translated note.

Tests validate this site's display, not actual OCR. Snagit was not run; production was not accessed.
