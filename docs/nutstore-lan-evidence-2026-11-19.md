# Nutstore LAN acceleration

Checked 2026-11-19 for #613.

https://help.jianguoyun.com/?p=777 describes detection of other clients holding the same file on the same LAN. Already-synchronized files can be distributed directly on that LAN, but must first upload to cloud servers. Thus the combined P2P/LAN comparison cell is **partial** rather than no or unrestricted yes. This does not promise cloud-free offline operation, arbitrary peer connectivity or a particular protocol.

The article is dated 2012-02-20. Its capability remains listed in the official current feature index https://help.jianguoyun.com/?page_id=843 (already a product source). Directly read the detailed article; no measured speed or universal client/platform/version parity is claimed. The old note saying traffic goes through Nutstore servers alone omitted the later LAN distribution stage.

Only Nutstore p2p_lan and its note/source change. Existing version retention and incremental-sync restrictions remain. One new English translation, no existing translations changed or deleted. No account operation, live file sync, traffic capture, production visit or configuration/deployment change.

Regression tests retain the separate feature states and verify the cloud dependency in both languages, desktop/mobile. Independent review, full unit/cover/build and exact-head push/PR CI required before merge.
