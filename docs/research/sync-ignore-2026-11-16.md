# Desktop synchronization ignore rules

Verified 2026-11-16 Asia/Shanghai through official documentation, without installing clients, syncing files or changing settings.

## Seafile

https://help.seafile.com/syncing_client/excluding_files/ documents seafile-ignore.txt in a library's root, including wildcard and directory patterns. This establishes ignore-rule capability for the syncing client. It is not server authorization or a secure-deletion mechanism: existing synced versions remain, files created or changed through the web interface can still reach clients, and subsequent local changes to matching files are ignored. Do not generalize desktop ignore rules to every mobile or drive client.

## ownCloud

https://doc.owncloud.com/desktop/7.1/using.html documents the Ignored Files Editor and custom patterns for local files and directories. Default patterns also exist. The document warns that changing the global exclude-definition file may cause unwanted behavior or make the client unusable. This is evidence of the capability, not a recommendation to modify a user's global configuration. We cite this specific desktop documentation branch, not a claim that every server or mobile product has version 7.1 or identical behavior.

## Data and validation scope

Only the two ignore_rules cells change from unknown to yes; obsolete unverified notes are removed and the direct sources appended. All other capabilities, license, pricing, product collection dates and automatically collected release metadata remain untouched. The general comparison asks whether this capability exists, not whether it is identical across all listed clients. No shared translation, homepage, cover or blocked scrcpy change.

Focused tests retain product uniqueness, source attribution and unrelated unknown capabilities. Local unit/cover tests and final CI build/browser tests are required. No application runtime, live-server behavior, M4 performance or public-site deployment was verified.
