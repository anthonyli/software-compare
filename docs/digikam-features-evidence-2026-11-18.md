# digiKam feature verification

Issue #439, checked 2026-11-18.

- https://github.com/KDE/digikam-doc/blob/d8283d990cc1f921956111879e390a28e26d7a3e/setup_application/editor_settings.rst
- https://github.com/KDE/digikam-doc/blob/d8283d990cc1f921956111879e390a28e26d7a3e/menu_descriptions/menu_importtool.rst
- https://docs.digikam.org/en/setup_application/editor_settings.html
- https://docs.digikam.org/en/menu_descriptions/menu_importtool.html

Official documentation confirms optional non-destructive versioning in the Image Editor. The checkbox enables it; originals and selected intermediate states can be preserved. This is not a promise that every save mode always preserves originals. JPEG intermediate versions are lossy; the manual recommends a lossless intermediate format where appropriate. The feature cell identifies the Versioning mechanism.

Import Tool Device/Capture provides tethered shooting only for supported gPhoto2 devices. Mark partial, with gPhoto2 scope, rather than universal camera compatibility. No remote live-view, file-format or camera-model claims are added.

Only these two cells and their immutable evidence sources change. Pricing, licensing, platforms, other records and shared translations stay untouched. Source verification only; no camera or digiKam runtime test was performed.
