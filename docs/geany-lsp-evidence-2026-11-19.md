# Geany LSP Client

Verified 2026-11-19 from Geany-Plugins 2.1.0. Existing Geany lsp unknown → partial.

- https://github.com/geany/geany-plugins/releases/tag/2.1.0: adds the LSP plugin and requires Geany 2.1.
- https://github.com/geany/geany-plugins/blob/2.1.0/lsp/README: no language servers are bundled. Install/configure servers separately. Default activation is per-project; the configuration can change this policy. Features depend on server capabilities. Native plugin transport is stdin/stdout, one server per file type. A separate proxy can address limitations but is not assumed installed.

Partial distinguishes optional plugin/server setup from core default support. Do not infer all servers, all features or zero overhead. No language server installation or execution, no project-trust changes, no real files submitted to servers. Other feature values and prior dictionary entries retained. This does not generalize document-symbol renaming into a claim of core multi-cursor support.
