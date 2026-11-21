# TUI frameworks: source snapshot (2026-11-21)

This category compares building an interactive terminal interface, not shell syntax, argument parsing, or terminal emulation. A TUI can sit behind a CLI subcommand. No runtime benchmarks or operating-system parity are claimed.

| Framework | Pinned evidence | Important boundaries |
| --- | --- | --- |
| Bubble Tea | [v2.1.2 README](https://github.com/charmbracelet/bubbletea/blob/v2.1.2/README.md), [MIT](https://github.com/charmbracelet/bubbletea/blob/v2.1.2/LICENSE), [Go 1.26 manifest](https://github.com/charmbracelet/bubbletea/blob/v2.1.2/go.mod) | Model/update/view and keyboard and mouse support are core. Common controls are from [Bubbles](https://github.com/charmbracelet/bubbles); [Lip Gloss](https://github.com/charmbracelet/lipgloss) is separate. |
| Ratatui | [v0.30.2 minimum Rust version](https://github.com/ratatui/ratatui/blob/ratatui-v0.30.2/Cargo.toml), [MIT](https://github.com/ratatui/ratatui/blob/ratatui-v0.30.2/LICENSE), [backends](https://ratatui.rs/concepts/backends/) | Widgets and layout are core. The application usually uses a backend directly for input and owns the event loop. TestBackend checks the rendered buffer, not complete user interaction. |
| Textual | [v8.2.8 README](https://github.com/Textualize/textual/blob/v8.2.8/README.md), [MIT](https://github.com/Textualize/textual/blob/v8.2.8/LICENSE), [Python manifest](https://github.com/Textualize/textual/blob/v8.2.8/pyproject.toml), [testing](https://textual.textualize.io/guide/testing/), [pinned serving guide](https://github.com/Textualize/textual/blob/v8.2.8/docs/guide/devtools.md#serve) | Core layout, widgets, events and headless interaction via Pilot. Serving an application to a browser is not a static export and does not imply free hosting. |

Unknown means the reviewed core sources did not establish the capability; it is not an assertion about all add-ons. License claims apply to the pinned upstream frameworks, not every dependency or host.
