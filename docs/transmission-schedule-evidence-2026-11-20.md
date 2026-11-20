# Transmission alternate-speed scheduling
Issue #646. Base 05fc5d6848e9e50ba8ee75fa527944bb6b18f2db.

Official fixed-version documentation: https://github.com/transmission/transmission/blob/4.0.6/docs/Editing-Configuration-Files.md#scheduling . Scheduling toggles alternate bandwidth limits, with time of day and weekday selection and default disabled. The Bandwidth section identifies this as Turtle Mode. This is not evidence for arbitrary task start/stop scheduling. Set schedule to partial, preserving that distinction.

Current development documentation uses underscore keys while 4.0.6 uses hyphens; the user-facing note deliberately avoids configuration syntax. No version metadata, pricing, license or unrelated capability reverified or changed. No Transmission install, real download, configuration, production access or deployment performed. Tests validate comparison display, not the target software.
