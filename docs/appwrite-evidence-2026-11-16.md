# Appwrite Cloud BaaS 第三产品

Issue #367。2026-11-16 UTC只读官方核实；不开户、绑卡、调用服务或部署，不修改前两产品事实。仅比较Cloud托管权益，不把自托管开源许可推导为云服务许可。

## 当前来源

- https://appwrite.io/pricing ：Free超限冻结、Console只读。当前动态额度表缺失，不拿旧查询参数缓存补容量/带宽/执行次数。
- https://appwrite.io/docs/advanced/billing/free ：一免费组织、两项目、组织共享额度；不能购买额外资源。存储超额上传停止，跨账期持续。页底降级表旧3bucket/5function不采用。
- https://appwrite.io/alternative-to/clerk ：当前官方比较明确Free75,000 MAU；不是每项目另送一份。
- https://appwrite.io/docs/advanced/billing/compute ：每月100GB-hours由构建与执行共用；默认512MB/0.5CPU；15分钟只构建。其泛称自动超额计费不能覆盖Free文档的不能买额外资源规则。
- https://appwrite.io/changelog/entry/2026-01-08 ：每项目两函数，优先于旧降级表。
- https://appwrite.io/changelog/entry/2026-02-20-1 ：七天无Console开发活动暂停，不以API流量推断保活。
- https://appwrite.io/changelog/entry/2026-06-29 ：持续暂停九十天删除全部资源，之前邮件预警；不能只讲暂停不删数据。
- https://appwrite.io/docs/advanced/security/backups ：用户备份及恢复要求Pro+；平台内部灾备不能替代Free自主恢复承诺。
- https://appwrite.io/terms ：Education商用禁止不套用普通Free；普通Free商用和免卡均保持未知，不依据过时博客或付款方式反推。

## 验证

沿用BaaS真实Worker测试IP249，扩为三产品比较并新增Appwrite详情双语可见/反向隐藏、六维英文无汉字及关键句、全页截图。单测调用实际cleanPublicText覆盖所有产品公开说明、摘要、免费限制与价格备注。依赖lockfile一致复用未提交symlink，不改Worker配置。真实Worker和网页截图由最终CI验证；本地不宣称服务实测。
