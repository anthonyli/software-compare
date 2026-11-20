# CLI frameworks source audit (2026-11-20)

Scope: libraries used to build a command-line application, not an AI coding CLI, terminal emulator or full-screen TUI framework. No candidate software was installed or executed. Product metadata such as stars and release dates remains null rather than implying a continuously current version inventory.

## License verification

Official tagged files read during research:

- Cobra v1.10.2: https://github.com/spf13/cobra/blob/v1.10.2/LICENSE.txt — Apache-2.0.
- clap v4.6.9: https://github.com/clap-rs/clap/blob/v4.6.9/Cargo.toml — workspace license `MIT OR Apache-2.0`.
- Commander.js v15.1.0: https://github.com/tj/commander.js/blob/v15.1.0/LICENSE — MIT.
- Click 8.5.1: https://github.com/pallets/click/blob/8.5.1/LICENSE.txt — BSD-3-Clause.
- Typer 0.29.2: https://github.com/fastapi/typer/blob/0.29.2/LICENSE — MIT.
- @oclif/core 5.1.12: https://github.com/oclif/core/blob/5.1.12/LICENSE — MIT.

These licenses cover the named project sources, not every third-party dependency, extension, packaged application or service built with them.

## Capability boundaries

- Cobra official completion guide documents generated scripts and custom completion callbacks. Scripts still need loading by the user's shell.
- clap's core parser is separate from official `clap_complete`. Static script generation and dynamic completion are different mechanisms with feature-specific boundaries; the matrix therefore marks completion Partial.
- Commander.js's reviewed tagged README establishes argument/option parsing, subcommands and generated help. Shell completion and interactive prompts remain Unknown, not No, because reviewed core evidence does not establish them.
- Click official shell-completion documentation requires an installed entry point and shell activation. Direct `python script.py` execution is not equivalent. Prompt/confirm functions are distinct from a complete interactive line editor.
- Typer's official prompt and completion tutorials document prompts and custom completion callbacks. Avoid older assumptions about external Click dependencies: current documentation includes a vendored implementation discussion.
- oclif documentation points to `@oclif/plugin-autocomplete` for completion and Inquirer for prompts. Both are additional components, not core built-ins; matrix values are Partial.

Source URLs supporting these boundaries are stored with each product. Unknown does not imply no ecosystem solution. Free/open-source development libraries do not guarantee zero distribution, hosting or service costs.

## Verification

- All existing English dictionary entries preserved; 24 new keys only.
- 415 unit tests and category-cover checks passed.
- Production build completed (606 pages).
- Targeted bilingual 1280px/390px browser regression added. Local Wrangler failed before starting the server with `uv_interface_addresses returned Unknown system error 1`; no browser-pass claim. Final CI is required before merging.
- Static cover reviewed at 340px alongside cleaners and screen-recorders. No production page visited or manual deployment performed.
