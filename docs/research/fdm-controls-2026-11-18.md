# FDM traffic controls and browser integration

Issue #472; verified 2026-11-18. Only `speed_limit` and `browser_ext` change from unknown to yes; obsolete unverified notes are removed. Existing scheduling, metadata and other unknown features remain unchanged.

## Official evidence

- https://www.freedownloadmanager.org/features.htm lists Traffic control in modern core features.
- https://www.freedownloadmanager.org/landing.htm?from=b_si_version lists traffic adjustment / Snail Mode, supporting bandwidth limiting rather than a guarantee of download performance.
- https://addons.mozilla.org/en-US/firefox/addon/free-download-manager-addon/ is the official extension published by freedownloadmanager.org. It explicitly integrates Firefox with the installed FDM application on Windows, Mac and Linux. The extension is not a standalone downloader. It requests browser/download/history/site access permissions; support does not imply absence of privacy considerations.

No inference of arbitrary browser support, guaranteed speed, per-download granularity, current video-site coverage, remote Web UI, or legacy-version features. No installation or transfer benchmark performed. Existing application license is not replaced by the extension's separate license. No dictionary, layout or deployment changes; production site not visited.
