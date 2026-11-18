# Mutagen conflict handling

Issue #507. Verified 2026-11-19 from official documentation, not an installed synchronization test.

https://mutagen.io/documentation/synchronization/

The three-way reconciliation detects endpoint changes and conflicts. Default two-way-safe and one-way-safe retain unresolved conflicts in session state, inspectable with `mutagen sync list`. Manual resolution is documented. Auto-resolved modes instead give alpha precedence and can discard unsynchronized beta content. Thus conflict handling is supported; this does not claim automatic semantic text merging, backups, or universally lossless resolution. No synchronization or file deletion was performed. Other metadata and unknown encryption status remain unchanged.
