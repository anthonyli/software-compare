# XDM scheduling and speed limit evidence (2026-11-18)

Issue: #470

Official sources:
- https://xtremedownloadmanager.com/guide/schedule-downloads/
- https://xtremedownloadmanager.com/help/slow-downloads/
- https://github.com/subhra74/xdm (links the official domain and lists scheduler/queues)

The scheduler guide confirms timed start/stop, once or weekly. Start joins the download queue; stop pauses rather than discarding progress. XDM must be running at the scheduled time. The troubleshooting guide explicitly documents Settings → Downloads → Limit download speed. These support the existing schedule and speed_limit cells; no new feature labels or translations are necessary.

Only these two unknown cells become yes and their obsolete unverified notes are removed. No claim of cloud/offline execution, guaranteed speeds or a fixed speed increase. Other metadata stays unchanged. In particular, the current README describes newly rebuilt torrent support, but this batch does not infer its availability in the recorded 9.0.9 release.

Documentation verification only, not installed-application testing. No production Compare page visited.
