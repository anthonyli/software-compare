# Ark ISO support evidence

Issue #407. Verified 2026-11-18 from official KDE sources, not an installed-app test.

The libarchive read-only plugin explicitly lists ISO in its open/extract description and application/x-cd-image among supported MIME types. Its ReadWrite flag is false. Therefore the ISO feature is partial, with the existing bilingual note identifying unpacking, not creation. This does not promise all ISO variants or boot-image authoring. Other Ark fields and the English dictionary remain unchanged.

https://github.com/KDE/ark/blob/adce1ae0b77cb369b1aa835102d1e986cfdae66d/plugins/libarchive/kerfuffle_libarchive_readonly.json.cmake
