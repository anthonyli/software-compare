# Resilio Sync filename conflicts

Issue #517. Official documentation checked 2026-11-19, not a live synchronization test.

https://help.resilio.com/hc/en-us/articles/204753629-Conflict-files-in-Sync

The Sync-specific guide describes filename case and encoding collisions producing `.Conflict` files and a manual recovery workflow. This supports partial conflict handling, not a claim of automatic content merging or protection against every concurrent edit. Conflict copies correspond to remote files; deleting them can propagate deletion. The documented remedy requires first protecting the healthy file outside the synchronized directory and removing the conflicting naming condition. No files were synchronized or deleted in this investigation. Pricing, Archive limits and other capabilities are unchanged; Active Everywhere documentation is not used as Sync evidence.
