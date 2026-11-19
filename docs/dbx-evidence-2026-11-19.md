# DBX database client

Verified 2026-11-19 for #591. The user confirmed t8y2/dbx and authorized exactly three DBX-specific English dictionary additions. No other dictionary entry or #406 is changed.

## Identity, license and cost
- https://github.com/t8y2/dbx identifies the project and describes DBX as free and open source. https://github.com/t8y2/dbx/blob/main/LICENSE is Apache-2.0.
- This is not another product named DBX. No invented price, star count or release date is recorded. Free client software does not include hosted database, AI provider or infrastructure charges; no API quota is promised.

## Official capabilities
- https://dbxio.com/en/docs/getting-started documents Windows, macOS, Linux and self-hosted Docker/Web. Desktop local files and Web server paths/integrations differ. MySQL, PostgreSQL, SQLite, Redis, MongoDB, DuckDB, ClickHouse and other profiles are listed; compatibility and Agent/JDBC profiles are not equivalent to every engine being bundled or feature-identical.
- https://dbxio.com/en/docs/query-editor documents SQL editing and execution. This does not make Redis or MongoDB SQL engines.
- https://dbxio.com/en/docs/data-grid documents editable relational grids when target rows can be reliably identified; joins/unsupported result shapes and read-only permissions can prevent editing. Specialized engines have separate interfaces.
- https://dbxio.com/en/docs/table-import documents file parsing, preview, target and mapping review followed by real writes. Formats and targets differ, for example Parquet is DuckDB-specific.
- https://dbxio.com/en/docs/database-export documents logical SQL exports, not universal physical backup, incremental backup or point-in-time recovery. Coverage depends on engine/driver; current openGauss sequence/cyclic-foreign-key limitations mean exports are not universally restorable.
- https://dbxio.com/en/docs/ai-assistant documents schema, SQL, errors and result previews in context, external APIs and local CLI providers. Agent tools can query data; do not infer offline-only operation or guaranteed read-only behavior. Use least-privilege database credentials and review targets and outgoing context.

## Validation scope
Only documentation was inspected: no client installation, live database connection, production website access or video rendering. Generic capability badges do not promise parity for every engine. Unit tests verify complete fields and translations; browser regression covers category and product pages in both languages and desktop/mobile widths.
