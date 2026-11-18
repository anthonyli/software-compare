# AB Download Manager scheduling and speed limits

Issue #433. Verified 2026-11-18 against stable v1.11.4, commit b1d067c9b3c2f069c3b75fae631da9bd1793191e.

The README advertises queues and schedulers. DownloadQueue implements optional scheduled start and stop times, and repeats them for the next day while its coroutine/application is running. This confirms basic scheduling, not operating-system wake-up, execution while the application is closed, or a promise that a stopped device performs downloads.

The desktop ToggleableSpeedLimitConfigurableRenderer provides an enable checkbox, numerical rate input and unit selection; zero disables the limit. DownloadManager owns the SpeedLimiter and updates its bytes-per-second target. This confirms configurable speed limits, not measured throughput or exact network-bandwidth guarantees.

Only schedule and speed_limit become yes; obsolete unverified notes are removed. Other feature values, platforms, pricing and shared English mappings stay unchanged. No software installed or real download performed.

- https://github.com/amir1376/ab-download-manager/blob/b1d067c9b3c2f069c3b75fae631da9bd1793191e/README.md
- https://github.com/amir1376/ab-download-manager/blob/b1d067c9b3c2f069c3b75fae631da9bd1793191e/downloader/core/src/commonMain/kotlin/ir/amirab/downloader/queue/DownloadQueue.kt
- https://github.com/amir1376/ab-download-manager/blob/b1d067c9b3c2f069c3b75fae631da9bd1793191e/desktop/app/src/main/kotlin/com/abdownloadmanager/desktop/ui/configurable/comon/renderer/ToggleableSpeedLimitConfigurableRenderer.kt
- https://github.com/amir1376/ab-download-manager/blob/b1d067c9b3c2f069c3b75fae631da9bd1793191e/downloader/core/src/commonMain/kotlin/ir/amirab/downloader/DownloadManager.kt
