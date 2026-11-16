# BaaS 第一批官方证据（2026-11-16 UTC）

Issue #359。仅 Supabase Cloud 托管服务，不与开源自托管或纯 SQL 混比。当前首条已核实，持续扩充；Appwrite 现行动态 Free 数值不足，不采用旧快照补齐、不访问认证私有接口。

## 六维与来源

1. [免费额度](https://supabase.com/pricing)、[共享范围](https://supabase.com/docs/guides/platform/billing-on-supabase)、[流量](https://supabase.com/docs/guides/platform/manage-your-usage/egress)：2 活跃免费项目，跨用户 Owner/Admin 所有组织计算，暂停不计；500MB 数据库/项目；组织共享 50,000 MAU、1GB Storage、每月5GB非缓存+5GB缓存流量（缓存仅Storage）。容量不是月增量。组织每月500,000函数调用、200万Realtime消息、峰值200连接。
2. [超额](https://supabase.com/docs/guides/platform/billing-faq)、[计算费](https://supabase.com/docs/guides/platform/manage-your-usage/compute)：Free先通知，持续超额可暂停、只读或402，不自动按量收费。额度型限制通常下账期恢复。Pro USD25/月起，含USD10计算抵扣，额外计算/超额/附加另计，Compute Hours不受Spend Cap保护。
3. [持续运行](https://supabase.com/pricing)：Free一周不活跃暂停，不保证始终在线。
4. [备份](https://supabase.com/docs/guides/platform/backups)：Free无付费每日备份权益，应定期导出异地保存；数据库备份不含Storage文件对象。
5. [商用](https://supabase.com/terms)：未获得明确覆盖Free一般商业生产用途说明，标未知，不推断禁止或全面允许。
6. [绑卡](https://supabase.com/docs/guides/platform/get-set-up-for-billing)：明确付费要求信用卡不能反推Free免绑卡；未开户实测，标未知。

仅阅读公开资料，无开户、绑卡、创建项目、调用服务、付费或部署。新增单测及真实Worker E2E，独立IP 192.0.2.249，覆盖首页封面、桌面/手机双语可见性、详情与截图；不是Supabase服务实测。本地Worker不能启动时须等CI，不能宣称E2E成功。
