# Screenshot feature verification (Issue #410)

Checked official stable-version source on 2026-11-18, without installing the applications. Only two previously unverified feature cells are resolved. No other feature, version, price, translation mapping or layout is changed.

## Flameshot: pin to screen

v15.0.0 resolves to f4f2e4e879f0e9b4cb7efb59f6b3f44ed05b1843. PinTool describes pinning an image to the desktop and adds a PIN capture task. PinWidget displays that pixmap in an always-on-top, frameless window. This establishes the pin-to-screen capability, not OCR or scrolling capture.

- https://github.com/flameshot-org/flameshot/blob/f4f2e4e879f0e9b4cb7efb59f6b3f44ed05b1843/src/tools/pin/pintool.cpp
- https://github.com/flameshot-org/flameshot/blob/f4f2e4e879f0e9b4cb7efb59f6b3f44ed05b1843/src/tools/pin/pinwidget.cpp

## ShareX: history

v22.4.0 resolves to 08bfff15e748a945944e609aca7faffbe888c7af. MainMenuBuilder exposes both History and ImageHistory commands. TaskHelpers.OpenHistory/OpenImageHistory open the corresponding history windows using the application's history manager. This is actual image/history browsing, not merely an upload list. This does not promise unlimited retention or restoration of deleted image files.

- https://github.com/ShareX/ShareX/blob/08bfff15e748a945944e609aca7faffbe888c7af/ShareX/Presentation/MainWindow/MainMenuBuilder.cs
- https://github.com/ShareX/ShareX/blob/08bfff15e748a945944e609aca7faffbe888c7af/ShareX/TaskHelpers.cs
