# Zed developer features

Verified 2026-11-18 against official stable v1.28.1, commit e8bc16acee5ae1937600d571d441c4b5d7b0d288.

- Debugging: the editor implements a DAP client supporting breakpoints, stepping and variable inspection. A language-specific debug adapter is required; some are bundled and others supplied by extensions. The yes cell means the editor has debugger integration, not universal language support or setup-free debugging.
- Remote development: local UI and remote source/language servers/tasks/terminal communicate over SSH. A reachable SSH host and compatible headless server are required. This is not a hosted cloud-environment entitlement.

Sources:
- https://github.com/zed-industries/zed/blob/e8bc16acee5ae1937600d571d441c4b5d7b0d288/docs/src/debugger.md
- https://github.com/zed-industries/zed/blob/e8bc16acee5ae1937600d571d441c4b5d7b0d288/docs/src/remote-development.md

Only two feature cells and evidence links change. DAP/SSH are language-neutral technical scope notes. Pricing, AI limits, platform list, license and all other products remain untouched. No application installation or production-site visit was performed.
