# Geany column editing evidence — 2026-11-19

Issue #639. Base ca6aaf23f387d890e3cf300a9f35a845f1261696.

## Primary source

https://github.com/geany/geany/blob/2.1.0/doc/geany.txt

The fixed Geany 2.1.0 manual section “Column mode editing (rectangular selections)” documents basic rectangular column editing: changes affect each selected line. Zero-column selections permit insertion on multiple lines. This is positive evidence for a constrained multi-position editing subset, not evidence for arbitrary discontiguous cursors.

## Decision and boundaries

Geany multi_cursor unknown → partial. The note explicitly limits the claim to rectangular/zero-width column selections; it neither claims nor denies arbitrary discontiguous multi-cursor support. Do not generalize shortcuts: the manual distinguishes mouse selection on Windows, and other sections warn of keyboard/window-manager conflicts. No plugin requirement is inferred for this documented core feature.

Keep AI, remote development and collaboration unknown. Existing debugger/LSP/Git qualifications remain untouched. One new translated note; all older translations preserved. No pricing/platform/license change.

Unit and bilingual desktop/mobile browser regression validate the comparison display, not actual Geany editing. Geany was not installed or run; production was not accessed.
