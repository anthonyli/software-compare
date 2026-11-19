# OpenShot 4K export verification

Verified 2026-11-19. Issue #561.

Official sources:
- https://www.openshot.org/static/files/user-guide/export.html
- https://www.openshot.org/static/files/user-guide/profiles.html

The current official guide is labeled 4.1.0. The export chapter explicitly points users to the YouTube (4K) target. The profiles chapter explains selecting export profiles independently and lists 4K UHD 2160p profiles at 3840 by 2160, including 24/25/30/50/60 fps. This directly establishes 4K output, rather than confusing support for high-DPI monitors or importing 4K footage with export capability.

Change only export_4k from unknown to yes and append sources. Availability does not guarantee realtime playback, a particular encoder on every machine, or lossless recovery of detail from lower-resolution inputs. Proxy and GPU flags remain unknown. No claim about latest release/version metadata is changed.

No pricing, platform, licensing, shared dictionary, #406 or production configuration changes. No video is rendered. Unit tests check the status and official sources while retaining adjacent unknowns; English/Chinese desktop/mobile browser regression verifies the existing supported label. Actual verification is recorded in the PR.
