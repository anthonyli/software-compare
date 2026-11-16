# Antares SQL（Issue #347）

核查日期2026-11-16；站点基线 main817946b。仅追加数据库客户端条目与英文、测试，不改布局、封面或其他产品。

## 官方证据

官网 https://antares-sql.app/ 与官方仓库 https://github.com/antares-sql/antares 只读研究。源码克隆未安装依赖、构建或运行；未连接任何数据库，未跟随README的系统警告绕过步骤。

固定源码提交：`1a9ccc7ba957cc435ad4beb86b56c1f19c2c830e`，产品sources使用相同提交链接。

- LICENSE首行MIT，版权Fabio Di Stasio，直接阅读完整许可；不是由GitHub徽标推断。
- README原始checkbox：MySQL/MariaDB、PostgreSQL、SQLite、Firebird已勾，DuckDB/SQL Server未勾。x64三平台勾选；ARM只Linux勾选，Windows/macOS未勾，未以目标宣言替代支持表。
- README的当前功能表与官网支持SQL建议、自动完成、历史。官网说明无付费功能/订阅，价格为免费客户端，不涵盖服务器成本。
- 数据编辑不单靠“table management”：`WorkspaceTabQueryTable.vue` updateField组装row/field/content；`useResultTables.ts`调用`Tables.updateTableCell`/`deleteTableRows`，IPC `tables.ts`中的update-table-cell和delete-table-rows执行SQL。仅证明源码提供功能，非真实数据库验证或任意结果集可编辑承诺。
- importer.ts/exporter.ts选择mysql/maria/pg实现，default返回不可用错误；以partial记录SQL dump能力，不宣称所有引擎/格式可双向导入导出或备份恢复。
- GitHub统计、最新发行时间、维护状态保留null，不凭当前源码推断最新发布状态。

## 验证

独立单测覆盖许可、免费、空统计、字段完整、ARM/路线图/dump边界与中英文；浏览器测试用独立测试IP242，保留真实Worker和原有生产限流。最终CI必须成功，本地浏览器受限时不宣称通过。

本地结果：196项单测、封面检查、Astro构建通过；原9个数据库条目与2635个英文原键值逐一比较保持不变，git diff --check干净。E2E尝试一次，在现有Wrangler服务器启动时遇 `uv_interface_addresses returned Unknown system error 1`，未运行浏览器断言，待最终提交CI补验。
