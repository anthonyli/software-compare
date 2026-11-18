# File Roller project license verification

Issue #404, checked 2026-11-18.

The official GNOME read-only mirror at commit 8ab872836c7f126c8def2762ff2496b4efe971cd declares `GPL-2.0+` as its AppStream project license. The application source explicitly allows GPL version 2 or any later version. Normalize this to `GPL-2.0-or-later`, not version-2-only. AppStream metadata is CC0-1.0; that is not the application license. This records the project license, not a claim that every dependency has identical terms.

- https://github.com/GNOME/file-roller/blob/8ab872836c7f126c8def2762ff2496b4efe971cd/data/org.gnome.FileRoller.metainfo.xml.in
- https://github.com/GNOME/file-roller/blob/8ab872836c7f126c8def2762ff2496b4efe971cd/src/fr-window.c

Only File Roller license and these source links change. Other product fields, records, and the shared English dictionary remain untouched. No production site was visited.
