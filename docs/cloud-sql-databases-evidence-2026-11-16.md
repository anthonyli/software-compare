# 云 SQL 数据库免费档证据

日期：2026-11-16 UTC。Issue #355；基线 `346603e2c8451cf52e53885ba258ff1b05339c53`。仅本地准备，未发布、建 PR、合并或部署；没有移入 #354 的文件。

比较 Turso 托管云服务和 Cloudflare D1，不混入 BaaS 认证、对象存储或本地开源数据库。仅列 Free 档价格，付费档及超额单价不作未核实推断。六维为免费容量、读行、写行、同步/出站、恢复、绑卡；商用与闲置暂停缺可靠结论，保留未知。

## 官方来源与方法

- [Turso pricing](https://turso.tech/pricing)：Free 100 库、5 GB 总容量，每月 500 million reads、10 million writes、3 GB sync，PITR 1 day，页面明确无信用卡。动态付费月年切换未纳入本批。
- 定价页 HTML `application/ld+json` FAQ 在本地读取复核：Free 任一项（storage/read/write/sync）超限会阻断其余使用；付费启用 Overages 的逻辑不能套到 Free。Embedded Syncs 是云与本地嵌入库双向同步的页数据量；不是任意网络流量。
- [Usage & Billing](https://docs.turso.tech/help/usage-and-billing)：读取按扫描行而不是返回行；更新等亦耗读写，存储包括表及索引。该页部分计划名称仍旧，当前免费数值以 pricing 为准，避免套旧计划。
- [Turso terms](https://turso.tech/terms-of-use)：internal business 与 personal/non-commercial 措辞存在范围歧义；不自行宣布商用无限许可或完全禁止。闲置存储计费宣传不等于保证不暂停；本批未知。
- [D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/)：Workers Free 每日 500 万读行、10 万写行，UTC 00:00 重置；到限查询返回错误。存储限后不能新增数据、创建/修改表或创建索引和触发器，须清理或升级。扫描行可能多于返回行，索引亦可能额外消耗写行。D1 出站/带宽无单独收费不解除 Workers 调用限制。
- [D1 limits](https://developers.cloudflare.com/d1/platform/limits/)：Free 10 库、每库 500 MB、账户 5 GB，Time Travel 7 days。不能把 Paid 的 10 GB/库搬到免费档。绑卡要求及免费商用/闲置暂停不凭产品名称推定。

## 验收范围

- 原产品与旧英文键保持；新分类独立追加 cloud 分组、labels、EN、showContext。免费档需绑卡列的 no 明确表示无需卡；unknown 不等于需要卡。
- 原系列封面由独立设计工作完成：`#E3F0EB`、480×260 SVG、组合提示词及两张并排预览，见 `docs/design/cloud-sql-databases-review.md`。插画验收不替代实际网页。
- 浏览器用例 IP `192.0.2.247`，真实 Worker，不 mock，不改生产限流；1280/390、中英可见/隐藏断言、展开资料、六详情字段。截图 `payment-page-sql-*` 复用既有 artifact glob，分类截图前回顶并轮询；不改 workflow。未发布期间不声称 CI 已执行。
- 使用已核 lockfile 一致的现有 node_modules 只读符号链接，链接不提交；没有重复安装占满 /tmp 或清理其他任务资产。

## 本地验证结果

- `npm test`：209/209；`npm run check:covers`：2/2；构建 552 页成功；`git diff --check` 通过。
- 2684 个基线英文键值逐项完整保留，包含已合并钱包分类的 14 项新增译文；没有改旧分类数据。
- 实际打开桌面/手机两张插画并排预览，与 cleaners/code-editors 比对：比例、浅色底、白色实体、黑色细节和留白一致，无文字或裁切。
- `npm run test:e2e -- cloud-sql-databases.spec.ts` 在 Worker 启动阶段失败：`uv_interface_addresses returned Unknown system error 1`，伴随默认 Wrangler 日志写入限制；没有执行浏览器断言或生成网页截图。`playwright --list` 解析成功，不冒充 E2E 通过。
- 仅本地准备；独立审查与任何未来获准发布后的最终 CI/实际截图仍需完成。

## 整合最新 main 后复验

- 已整合 `331e4bf26f6e3bea4cc68dc890266638e105a6ce`，5 个共享文件冲突以最新 main 为底，只追加 SQL 分类。hosting 与 payments 两份数据完全等于 main；全部已有封面 spec 保留。
- main 的 2714 个英文键值逐项完整保留，SQL 新增后共 2737 键。免费增值/月等已存在键不重复覆盖。
- 整合后完整单测 212/212、封面 2/2、构建 555 页通过。此前独立事实与代码审查通过，整合保留性再次送独审；真实 Worker 页面仍待最终 CI，未把本地构建当浏览器通过。
