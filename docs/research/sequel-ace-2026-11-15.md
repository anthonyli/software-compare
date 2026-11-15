# Sequel Ace evidence — 2026-11-15

Issue #181. No installation, connection, SQL execution, MCP activation or performance measurement.

- https://sequel-ace.com/ — current requirements macOS 13.5+, Intel/Apple Silicon; MySQL 5.7+, MariaDB 10+. Not general PostgreSQL/SQLite support.
- https://github.com/Sequel-Ace/Sequel-Ace/blob/main/LICENSE — MIT, commercial use permitted subject to notices; dependencies retain their own terms.
- https://sequel-ace.com/get-started/ — sandbox socket/SSH access limitations; saved passwords in Keychain. No system configuration was changed.
- https://sequel-ace.com/queries.html and https://sequel-ace.com/ref/features.html — SQL queries and schema management. Row editing and complete import/export matrix conservatively unknown pending specific documentation.
- https://sequel-ace.com/get-started/mcp-server.html — optional MCP disabled by default, localhost only, read-only default is statement filtering not a guarantee against stored function/UDF side effects. Use server-enforced read-only accounts. AI onward processing depends on selected client/provider (inference, not an app privacy audit).

Issue body initially used an incorrect core-features URL; correct official page is /ref/features.html above. Main README may describe development features; optional MCP described as documented, not verified in an installed release. No M4 16GB benchmark or blanket data-never-leaves claim.
