# REAPER batch conversion evidence (2026-11-18)

Issue: #476

- Official User Guide 7.26, §21.11: https://dlz.reaper.fm/userguide/ReaperUserGuide726c.pdf . Indexed official text describes selecting multiple files or media items and converting format, bit depth or sample rate in one pass through File > Batch File/Item Converter. Direct PDF fetch returned 502; indexed section was available. No claim of full PDF visual inspection.
- Current official download/changelog: https://www.reaper.fm/download.php . 7.86 (2026-11-13) explicitly maintains Batch converter, including an RPP-conversion fix; corroborates continuing availability rather than relying only on historical documentation.
- Official guide landing page: https://www.reaper.fm/userguide.php . Currently identifies the 7.86 guide.

Only `batch` moves from unknown to yes. This is batch file/media conversion, not arbitrary unattended workflows or a performance guarantee. No audio/video rendering was performed. Noise reduction and spectral editing remain unknown. Existing 7.85 release snapshot and pricing are unchanged; this is a capability correction, not a version refresh. No dictionary, layout, deployment or production configuration edits.

Regression covers the capability and preserved boundaries; browser regression checks both languages at desktop/mobile widths. Local browser startup limitations must be disclosed and final full CI must pass before merge.
