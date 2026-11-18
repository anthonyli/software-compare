# File synchronization capability verification

Issue #431, checked 2026-11-18.

- Unison v2.54.0 official manual describes rsync-based transfer for large files with small changes. Its transfer implementation has a block-size threshold and falls back when appropriate. The yes status means an incremental-transfer capability exists, not that every transfer uses it or has guaranteed savings.
  - https://github.com/bcpierce00/unison/blob/b1a49141e7eb5334e31efcf4d08073c192d6c1ae/doc/unison-manual.tex
  - https://github.com/bcpierce00/unison/blob/b1a49141e7eb5334e31efcf4d08073c192d6c1ae/src/transfer.ml
- Resilio Sync, not Active Everywhere, supports `.sync/IgnoreList` rules. They are local and case-sensitive, with OS-specific path separators. Ignoring is not retroactive removal of previously synchronized content; indexed directory structure may continue to propagate. This feature cell does not claim cross-peer rule replication or data-erasure protection.
  - https://help.resilio.com/hc/en-us/articles/205458165-Ignoring-files-in-Sync-Ignore-List

Only two feature cells and source links change. Existing pricing, platform, encryption, conflict and sharing caveats remain unchanged. No shared English mapping or layout changes. No software installation or production visit.
