# PDF Arranger conversion scope

Checked 2026-11-16 Asia/Shanghai, documentation only.

https://github.com/pdfarranger/pdfarranger/wiki/User-Manual identifies its scope as version 1.14.0. It lists image import into PDF pages, PNG/JPEG export and rasterized PDF export. Image import requires img2pdf; transparent images require img2pdf >= 0.4.2. This is limited image/PDF conversion, not Word/Excel/PowerPoint conversion or a promise of preserved editable text in raster output.

https://github.com/pdfarranger/pdfarranger confirms the application is a pikepdf frontend, supports image import when img2pdf is installed, and links the manual. This corroborates the core image-to-PDF capability independently of the manual's version-specific export list. Distribution packages may differ; no claim is made that every older build has all listed exports.

Change the existing convert=no cell to partial and remove its obsolete categorical negative explanation. Append the manual source. Leave editing, OCR, form, signature, encryption, compression and automatic version metadata unchanged; this patch does not certify those capabilities or reinterpret lack of documentation as no support. Existing generic partial status is translated without modifying the shared translation file.

Focused regression test plus unit/cover suite and final CI build/browser checks are required. No software, files, archives or PDF exports were executed, and no M4 performance or deployed-site behavior was verified. No shared translation, homepage, cover or blocked scrcpy/Syncthing changes; no manual deployment.
