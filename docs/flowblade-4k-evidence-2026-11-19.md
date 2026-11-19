# Flowblade 4K export evidence

Verified 2026-11-19. Only flowblade.features.export_4k changes from unknown to yes.

- https://jliljebl.github.io/flowblade/webhelp/rendering.html documents using the project profile or selecting another profile for rendered output.
- https://github.com/jliljebl/flowblade/blob/b02805fb0e85a7eac978aab6638f37fdc0456cc3/flowblade-trunk/Flowblade/res/profiles/uhd_2160p_30 pins the official bundled UHD profile: 3840 by 2160, progressive, 30 fps.

Together, the render workflow and explicit dimensions establish 4K output capability rather than merely 4K import. Available encoding depends on installed MLT/FFmpeg components and chosen format. No assertion covers every codec/hardware combination, realtime performance or GPU acceleration; GPU remains unknown. No price/license/platform changes.

Unit tests verify sources and boundaries, replacing only obsolete unknown expectations. Browser regression covers English/Chinese at desktop/mobile widths. No shared dictionary edits, production access/configuration or video rendering.
