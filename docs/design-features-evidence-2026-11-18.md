# Image editor capability verification

Issue #419, checked 2026-11-18. No application execution or compatibility testing claimed.

- PhotoDemon's official 9.0 announcement documents Photoshop effect plugins (8bf), restricted to 32-bit. The stable 2025.12 source still implements enumeration/loading/execution of those filter plugins. Mark partial, with the format/bitness explicitly visible, rather than claiming every Photoshop plug-in is compatible. Licensing of third-party plugins remains separate.
  - https://photodemon.org/2022/09/08/photodemon-9-0.html
  - https://github.com/tannerhelland/PhotoDemon/blob/7c39e83783361c436292570aeda54da75a2d9c8c/Modules/Plugin_8bf.bas
- Pixelitor's official guide describes creating one layer for each frame, then exporting a layer animation. The stable 4.3.1 LayerAnimation class converts layers to frames and uses AnimatedGifEncoder with a frame delay and loop. Mark partial, scoped to GIF, not a claim of a professional timeline, onion skinning, audio or video export. Tweening is separate and not used to infer frame-by-frame support.
  - https://pixelitor.sourceforge.io/user_guide.html#creating-layer-animations
  - https://github.com/lbalazscs/Pixelitor/blob/86552ad72f443faddb91dd955ed4391e65704490/src/main/java/pixelitor/io/LayerAnimation.java

Only the two previously unknown cells and source links change. Technical format labels are language-independent; no shared English mapping or alternative translation file is changed. Other capabilities, platform, price and license data remain untouched.
