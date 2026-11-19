# NetBeans LSP client

Verified 2026-11-19. Existing lsp unknown → partial.

- https://netbeans.apache.org/front/main/blogs/entry/lsp-client-demo-ba-sh/ (2019): official client integration example installs a bash language server, registers a language module/MIME provider and connects it to LSP Client. This is historical demonstration, not current installation instructions.
- https://github.com/apache/netbeans/blob/32/ide/lsp.client/src/org/netbeans/modules/lsp/client/spi/LanguageServerProvider.java: released tag 32 retains the client SPI, MIME-specific server provider and input/output communication. Confirms continued client infrastructure independently of the historical article.

Partial reflects language integration and a corresponding server, not blanket language readiness. Do not confuse the IDE's LSP client with NetBeans Java LSP server for other editors. The old demo's commands, project-only limitation and dependency versions are not generalized to all modern integrations. No server installation/execution, no user code transmitted, no production access. Other feature values and existing translations remain unchanged.
