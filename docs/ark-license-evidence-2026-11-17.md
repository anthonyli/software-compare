# Ark project license verification

Issue #402, checked 2026-11-17.

The official KDE mirror at commit adce1ae0b77cb369b1aa835102d1e986cfdae66d declares `GPL-2.0-or-later` in the AppStream `project_license`. Its `metadata_license` is CC0-1.0, which is not the application license. The main program SPDX identifier agrees. This is the declared project license, not a claim that all bundled components use one license; LICENSES also includes BSD, MIT, LGPL and CC0 texts.

- https://github.com/KDE/ark/blob/adce1ae0b77cb369b1aa835102d1e986cfdae66d/app/org.kde.ark.appdata.xml
- https://github.com/KDE/ark/blob/adce1ae0b77cb369b1aa835102d1e986cfdae66d/app/main.cpp
- https://github.com/KDE/ark/tree/adce1ae0b77cb369b1aa835102d1e986cfdae66d/LICENSES

Only the license field and these two evidence links change. Shared English mappings, releases and all other product fields remain untouched.
