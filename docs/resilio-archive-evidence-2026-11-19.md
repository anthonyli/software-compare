# Resilio Sync Archive evidence

Issue #496. Official documentation checked 2026-11-19 (Asia/Shanghai); no installed-app or production testing.

https://help.resilio.com/hc/en-us/articles/204754239-Using-Archive-for-file-versioning-and-restoring-deleted-files

This is the consumer Sync guide, not Active Everywhere. Remote changes/deletions archive the previous copy on other peers, not on the originating device. Recovery is manual. Default retention is 30 days on desktop and one day on mobile; configurable age and maximum file-size limits apply. Archive cannot be accessed on iOS and does not work for Android SD-card shares. It can be disabled per folder. Restoring while Sync runs is recommended to propagate the restored copy.

Therefore the combined versions/recycle-bin capability is partial, identified as `.sync/Archive`, not universally supported or unlimited backup. Price, license, other features and shared translations are unchanged.
