# Neon Cloud BaaS 第二产品

Issue #363，2026-11-16 UTC 公开官方资料核实。按当前包含认证、对象存储、函数及Data API的完整托管后端比较，不当作单独SQL产品。原Supabase事实不变，仅移除已过时的“首批仅一条”描述。无注册、登录、绑卡、调用服务或部署。

## 来源及边界

- https://neon.com/pricing （更新2026-11-04）：Free为USD0；完整后端功能，无卡入门但AI Gateway需要支付卡/预付余额。Launch典型月费不是固定套餐，不写成USD15/月承诺。
- https://neon.com/docs/introduction/plans ：100项目，每项目10分支；每月每项目100 CU-hours、60k MAU、5GB共享出站；PG容量1GB/项目且账户20GB；对象容量另计5GB/项目。Functions每月每项目10 active/400 waiting Capacity-Hours及百万调用。计算/出站耗尽暂停，容量超限增加存储操作失败；查询/导出差异明确，限制不删数据。
- https://neon.com/docs/introduction/scale-to-zero ：Free五分钟空闲缩零不可关闭，新查询自动唤醒。不是长闲置人工恢复，也不是额度耗尽停机。
- https://neon.com/docs/guides/backup-restore ：根分支即时恢复；Free最长六小时且1GB变更历史，不保证完整六小时。一个手动快照额度、无定时备份。文档通用快照存储计价USD0.09/GB-month，未将额度夸大为永久免费或对象文件完整备份。
- https://neon.com/docs/storage/overview ：5GB对象存储跨项目内分支，当前仅部分区域。容量超限精确阻断方式未知。
- https://neon.com/docs/storage/troubleshooting ：503 SlowDown是频率限制，不是已核实的容量超额错误。
- https://neon.com/platform-terms 与 https://www.databricks.com/legal/mcsa ：Neon条款引用允许客户业务用途的主协议，但不推断专门Free一般生产商用许可，保持unknown。

## 回归范围

保留全部旧英文键。单测执行现有cleanPublicText实现，验证两产品六条说明以及摘要、价格说明、免费限制、计划名称规范化后均有英文译文且无汉字。真实Worker测试比较页双产品的桌面/手机、中英文可见和隐藏、详情六条英文、截图；不mock API、不改Worker配置。沿用本分类独立IP249；本地环境曾无法启动Worker，最终实际E2E和截图须CI验收。
