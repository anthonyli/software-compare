# Lite XL multi-cursor evidence

Issue #454, checked 2026-11-18. Official stable v2.1.8 resolves to commit `0af4dae0e2748d6afe7bded41c13d96f627cb520`.

- https://github.com/lite-xl/lite-xl/blob/0af4dae0e2748d6afe7bded41c13d96f627cb520/data/core/commands/doc.lua implements cursor splitting, adding selections on adjacent lines and merging cursors.
- https://github.com/lite-xl/lite-xl/blob/0af4dae0e2748d6afe7bded41c13d96f627cb520/data/core/keymap.lua binds Ctrl-click and Ctrl-Shift-Up/Down to those core commands.

This proves built-in multiple-cursor editing, not plugin-based collaboration or every IDE capability. Existing language-server/plugin requirements, privacy warnings, unknown debugger/remote capabilities, pricing and platforms remain unchanged. Only the multi_cursor value, its obsolete unverified note and these sources change. No runtime performance or application testing is claimed; repository UI regression verifies presentation only.
