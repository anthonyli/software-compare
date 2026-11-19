# Lapce DAP debugging

Verified 2026-11-19 from released v0.4.2 sources, not unreleased HEAD. Existing debugger unknown → yes.

- https://github.com/lapce/lapce/blob/v0.4.2/CHANGELOG.md: 0.3.0 section records DAP implementation (#1809).
- https://github.com/lapce/lapce/blob/v0.4.2/defaults/run.toml: debugger type is necessary for debugging; without it the task can run but cannot debug.
- https://github.com/lapce/lapce/blob/v0.4.2/lapce-app/src/debug.rs: DAP data, breakpoints, stack traces and variables corroborate implementation in that release.

Yes records existing support, not preinstalled adapters or all-language readiness. The note preserves configuration requirements. No claims about latest release/date, every adapter, remote debugger parity, or AI support. Existing metadata and all prior dictionary entries are retained. No debugger installation, target execution or production access.
