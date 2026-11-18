# OpenSCAD 2D SVG output evidence

Issue #425, checked 2026-11-18. Official tag openscad-2021.01 resolves to 41f58fe57c03457a3a8b4dc541ef5654ec3e8c78. Its SVG exporter writes SVG paths from Polygon2d outlines; PolySet is rejected. Thus the combined PDF/SVG feature is partial, explicitly scoped to verified 2021.01 / 2D / SVG. This is not a statement that PDF is unsupported, nor a claim of unrestricted 3D export.

- https://github.com/openscad/openscad/blob/41f58fe57c03457a3a8b4dc541ef5654ec3e8c78/src/export_svg.cc
- https://github.com/openscad/openscad/blob/41f58fe57c03457a3a8b4dc541ef5654ec3e8c78/src/export_pdf.cc

The PDF exporter has Cairo build requirements and A4 single-page behavior; its detailed comparison remains outside this narrow change. DWG stays unknown. No feature was locally exercised in OpenSCAD; this is official source verification. No release, price, platform, translation or layout changes.
