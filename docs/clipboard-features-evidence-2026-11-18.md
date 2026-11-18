# Clipboard feature evidence — Issue #412

Checked 2026-11-18 against official stable release source, not installed-app testing.

- Maccy 2.8.0, commit 7c1644bfbed1dd0d703ecdbaf4a1b9a3a1d0b295: `Clipboard.swift` declares string, PNG and TIFF types; capture builds `HistoryItemContent` and `HistoryItem`, and copy restores the stored data. This establishes text/image history support, not universal format compatibility, encryption or synchronization. Existing privacy and permission caveats remain unchanged.
  https://github.com/p0deje/Maccy/blob/7c1644bfbed1dd0d703ecdbaf4a1b9a3a1d0b295/Maccy/Clipboard.swift
- Ditto 3.25.113.0, commit 81a667c790f5a6c9b6b63f187eb75e79bf159670: README describes saved clipboard history. `QPasteWnd.cpp` creates the search field, wires search text events and builds a filtered SQL history query. This establishes history/search, not image OCR or cloud search. Existing LAN transfer and security limits remain unchanged.
  https://github.com/sabrogden/Ditto/blob/81a667c790f5a6c9b6b63f187eb75e79bf159670/ReadMe.md
  https://github.com/sabrogden/Ditto/blob/81a667c790f5a6c9b6b63f187eb75e79bf159670/src/QPasteWnd.cpp

Only the two previously unknown feature values and supporting sources change. All other records, shared translations, version/pricing data and homepage implementation are untouched.
