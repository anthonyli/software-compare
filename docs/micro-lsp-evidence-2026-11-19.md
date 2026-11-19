# Micro LSP evidence — 2026-11-19

Issue #637. Base afa04cd975d7a08b1ac8030f9ab8e20b7ebce44c.

## Sources and scope

- https://github.com/micro-editor/plugin-channel/blob/d0d04ed64a8667979b0678bb442f825d1d6c9d92/README.md lists the optional lsp plugin and marks 2.0 support; this is channel membership, not a claim that the editor bundles it.
- https://github.com/AndCake/micro-plugin-lsp/blob/a3ed3a73b2f7576b1e2dc1ac3c98dfe695e6d05d/README.md is the plugin maintainer’s primary documentation at a fixed revision. It lists hover, definition, completion, formatting and references. It explicitly calls the implementation unfinished/proof-of-concept.
- The server configuration maps file types to external executable commands. Defaults exist, so custom configuration is not always mandatory; an available appropriate server still is.
- Known issue: not all modification events reach the server; saving re-synchronizes.

## Decision

Change only Micro lsp unknown → partial, with optional-plugin, external-server and experimental synchronization caveats. Add one translation without changing any old entries, two source URLs and collection date. Keep debugger, AI and live sharing unknown. No claims of full protocol coverage, bundled servers, all-version compatibility or commercial rights of external servers. Official channel’s 2.0 column is not independent validation on every current Micro build.

No software/plugins installed, commands from source executed, or production pages accessed. Unit and browser regression check our displayed data, not actual language-server behavior.
