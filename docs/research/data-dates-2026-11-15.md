# Catalogue date semantics — 2026-11-15

Issue #247, main1e55b83. Both README files had a blanket2026-11-12collection claim. Product-level2026-11-15entries already exist, while partial maintenance retains dates for untouched fields.

Evidence: site/src/lib/load-data.ts product collected_at falls back to category collected_at; scripts/sync-github.mjs writes separate checked_at/synced_at metadata. The README distinction matches these existing behaviors; no data or runtime change. Sources and research/commit scope—not one timestamp—determine what was checked.

No blanket freshness assertion, no date refresh, no website deployment/config change. README-only visible change; regression test covers bilingual qualifiers and independent metadata timestamps.
