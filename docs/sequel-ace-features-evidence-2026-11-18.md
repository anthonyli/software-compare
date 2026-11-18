# Sequel Ace editing and data exchange

Issue #427. Checked 2026-11-18 against official stable release production/6.1.0-20117, commit 91c3339b0908a1166a116886264b41188cb40ac6.

- SPTableContent implements addRow, removeRow, saveRowToTable and INSERT/UPDATE queries. This verifies table row editing, not arbitrary query-result editability or bypassing database permissions.
- SPDataImport implements SQL/CSV import and the export controller dispatches SQL and CSV exporters. The comparison notes SQL / CSV, not universal format support.
- Existing MySQL/MariaDB scope, macOS requirements, sandbox and MCP/read-only-account caveats are retained. No database or software was run for this evidence review.

- https://github.com/Sequel-Ace/Sequel-Ace/blob/91c3339b0908a1166a116886264b41188cb40ac6/Source/Controllers/MainViewControllers/TableContent/SPTableContent.m
- https://github.com/Sequel-Ace/Sequel-Ace/blob/91c3339b0908a1166a116886264b41188cb40ac6/Source/Controllers/DataImport/SPDataImport.m
- https://github.com/Sequel-Ace/Sequel-Ace/blob/91c3339b0908a1166a116886264b41188cb40ac6/Source/Controllers/DataExport/SPExportController.m
