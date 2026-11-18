# Archive splitting evidence — Issue #448

Checked 2026-11-18 from official sources, not product runtime testing.

- 7-Zip GUI has a split-to-volumes input and parses its sizes into Info.VolumeSizes. This verifies split archive creation, not archive repair or universal format support.
  https://github.com/ip7z/7zip/blob/d3296e39e1f1f92c7b41c0c3848e65640428d42d/CPP/7zip/UI/GUI/CompressDialog.cpp
  https://github.com/ip7z/7zip/blob/d3296e39e1f1f92c7b41c0c3848e65640428d42d/CPP/7zip/UI/GUI/CompressDialog.rc
- PeaZip documents selecting output volume sizes, including ZIP/7Z archive volumes, and raw file splitting/joining. Raw splitting alone is not compression. Reassembly/extraction requires the necessary parts in the same directory; this is not missing-volume recovery.
  https://github.com/peazip/peazip.github.io/blob/2dca7d01bee679ef0826ea246bff5eef6bb8ac1a/file-split.html

Only the two split cells and sources change. Existing format creation, repair, platforms, prices and all translations remain untouched.
