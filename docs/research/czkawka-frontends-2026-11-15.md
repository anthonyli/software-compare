# Czkawka frontends — 2026-11-15
Main69d0201, row free_tier_limits none and summary not distinguishing old/new. No open/duplicate before227.
Official https://github.com/qarmin/czkawka identifies old GTK GUI12.0 as last release/no further binaries, Krokiet recommended. https://github.com/qarmin/czkawka/blob/master/krokiet/README.md Slint, GPL3 whole project/MIT own code/CCBY4art; mandatory runtime dependencies none in prebuilt binaries except similar-video feature FFmpeg. Do not generalize legacy frontend to abandoned entire repository, or GitHub aggregate release tag to old GUI release.
Kept existing productID,name and metadata; added source and precise public summary/limits/price explanation in data.json plus legacyCSV. No broad collected-date bump. No scanning, deleting, installing or video work. OpenTracks publicpage200 confirmed. Deployment403not retried.

## License correction, 10:00 UTC
Read the four official master Cargo.toml files (all version 12.0.2): krokiet declares GPL-3.0-only; czkawka_core, czkawka_cli and czkawka_gui declare MIT. Corrected license and price explanation in CSV/data/English. The Krokiet README's own-code MIT wording must not override its package declaration or be generalized to all binary dependencies. Art remains separately described as CC-BY 4.0. This is source/document verification, not a distribution license audit or software test.
Sources: https://github.com/qarmin/czkawka/blob/master/krokiet/Cargo.toml
https://github.com/qarmin/czkawka/blob/master/czkawka_core/Cargo.toml
https://github.com/qarmin/czkawka/blob/master/czkawka_gui/Cargo.toml
https://github.com/qarmin/czkawka/blob/master/czkawka_cli/Cargo.toml
