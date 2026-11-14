# API 与数据库工具补充（2026-11-14）

关联 Issue #51。仅核实官方资料，未安装或实测这些客户端，不使用真实 API 密钥或数据库。

## 选型与边界

- Insomnia：官方仓库 https://github.com/Kong/insomnia 与 https://insomnia.rest/pricing 确认 Apache-2.0、跨平台、REST/GraphQL、集合和 Inso CLI；本地、Git、云存储可选，付费协作能力不算免费。未承诺不限团队人数或永久免费额度。
- Postman：专有客户端，不能用开源 Newman 的许可代替。https://www.postman.com/pricing/ 与 https://learning.postman.com/docs/getting-started/installation/install-app/ 确认免费/付费计划及三平台；https://learning.postman.com/docs/tests-and-scripts/running-collections/intro-to-collection-runs/ 明确 GraphQL/gRPC 集合运行需要付费，与单请求支持分开。避免记录页面内不一致的 AI 免费额度。
- Beekeeper Studio Community：https://github.com/beekeeper-studio/beekeeper-studio 与 https://www.beekeeperstudio.io/pricing/。社区版 GPL-3.0，仓库亦含商业代码。表格编辑免费，但直接编辑 SQL 查询结果、导入/导出及部分数据库支持属于付费能力。云工作区不是本地客户端必需路径。
- HeidiSQL：https://www.heidisql.com/、https://www.heidisql.com/download.php、https://github.com/HeidiSQL/HeidiSQL。GPL-2.0、免费，可捐赠；当前下载页已有 Linux/macOS arm64，不沿用“仅 Windows”的过时判断。不同平台实现/预览版本不保证功能一致。
- pgAdmin 4：https://www.pgadmin.org/features/、https://www.pgadmin.org/licence/、https://www.pgadmin.org/docs/pgadmin4/latest/import_export_data.html。PostgreSQL 许可证，桌面或服务端部署；限 PostgreSQL 及支持的衍生数据库，不标作跨引擎通用客户端。服务端鉴权、文件权限和连接凭据由部署者负责。

## 数据与验证

新增 5 个产品，复用现有分类与封面。新增产品核实日期为 2026-11-14；已有产品保留原核实日期，未重新核实的 Stars/Release 由现有同步流程负责，不伪造即时数字。
补齐英文内容及产品字段回归测试；增加桌面/手机中英文页面与限制文本浏览器测试。所有价格以官方页面为准，不把商业套餐、服务器开销或企业权益默认为免费。
