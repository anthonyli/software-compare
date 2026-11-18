# UltraVNC feature verification (2026-11-18)

Scope: issue #452; only file transfer and clipboard synchronization.

The official [Viewer GUI guide](https://uvnc.com/docs/ultravnc-viewer/71-ultravnc-viewer-gui.html) lists the File Transfer dialog, toolbar button and Ctrl+Alt+F7 shortcut. This supports file transfer between UltraVNC Viewer and UltraVNC Server, not arbitrary third-party VNC implementations. The fixed [FileTransfer.cpp](https://github.com/ultravnc/UltraVNC/blob/edc654df7e95e7151bb02ebaa5d6ef2b16e3e5ed/vncviewer/FileTransfer.cpp) implements transfer handling.

The official [command-line guide](https://uvnc.com/docs/ultravnc-viewer/52-ultravnc-viewer-commandline-parameters.html) documents -disableclipboard as disabling clipboard transfer. The fixed [VNCOptions.cpp](https://github.com/ultravnc/UltraVNC/blob/edc654df7e95e7151bb02ebaa5d6ef2b16e3e5ed/vncviewer/VNCOptions.cpp) initializes m_DisableClipboard to false and handles the disableclipboard option. Thus clipboard synchronization is supported but configurable, not guaranteed in every session. The short data note retains the exact option name.

These sources do not establish file copy/paste through the clipboard, all clipboard formats, universal server compatibility, or end-to-end encryption. No UltraVNC session was operated. Existing platform, license, privacy, encryption and other feature assessments are unchanged. Browser regression checks only the local Compare presentation, in Chinese/English at desktop/mobile widths; it is not an application interoperability test.
