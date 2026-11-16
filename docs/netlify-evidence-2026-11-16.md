# Netlify 网站部署资料核验

核验日期：2026-11-16 UTC。Issue #372；现行 credit-based Free，不覆盖旧 Legacy 合同。只读官方页面，未开户、绑卡、部署或调用云服务；免卡注册要求保留 unknown。

## 六维证据

- 静态托管：Free 团队每月账期共享 300 credits，带宽 20 credits/GB，请求 2 credits/10,000。所有项目共池，不能把换算的资源量当作分别赠送的额度。
- 构建：成功生产部署每次 15 credits；失败、回滚、Deploy Previews、分支部署不扣生产部署积分，但预览/分支的请求和计算仍扣共享积分。Free 1 并发构建，不单独计量 build minutes。
- 函数：compute 10 credits/GB-hour，覆盖 Serverless、Scheduled、Background Functions 等。Edge Functions 不计 compute，按 web requests 计量。表单现行免费不限，不沿用旧版按提交扣积分的资料。
- 商用：当前官方迁移指南明确 Free 可运行商业项目，该正文同时描述 300-credit 套餐，不是仅依赖旧博客。仍受服务条款、额度和内容规则约束。
- 超额：Free 耗尽使团队全部项目暂停，访问和新部署（含预览）受影响。Free 不支持额外 credit packs 或 auto-recharge；下一账期自动恢复或升级。免费月度积分不结转，账期不是自然月。
- 绑卡：现行支付文档确认 Personal/Pro 需支付方式，Free 可移除支付方式，但不能推出新 Free 注册永远免卡。2024 年介绍旧 100GB / 300 build-minute 套餐的博客不用作现行免卡证据。

## 官方来源

1. https://www.netlify.com/pricing/ — 当前 Free 价格和积分制。
2. https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/ — Free 300 credits、1 并发、升级与加购范围；2025-09-04 前可能为 Legacy。
3. https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/ — 生产部署、compute、bandwidth、requests 扣减比例；预览部署动作与请求区别；Edge 边界。
4. https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/billing-faq-for-credit-based-plans/ — 月账期及共池、重置与超额。
5. https://docs.netlify.com/manage/accounts-and-billing/billing/resume-paused-projects/ — 全团队暂停、访问和部署受影响、恢复路径。
6. https://www.netlify.com/knowledge-base/migrate-to-netlify-from-vercel/ — 当前 Free 商业项目许可表述。
7. https://docs.netlify.com/manage/accounts-and-billing/billing/manage-payments/ — 付费档支付方式和 Free 移除支付方式；不等同注册免卡保证。

## 变更及验证范围

只追加第四产品和中英数据、证据及测试；原 Vercel、Cloudflare Pages、Render 对象逐值不变，全旧英文键值保留。没有修改布局、组件、配置、封面、设计预览 PR 或 tag。

单测验证实际 cleanPublicText 处理后的 summary、price_summary、free_tier_limits、价格档与说明、六维说明均能翻译。真实 Worker 浏览器套件扩展四产品桌面/手机中英文比较，增加 Netlify 双语详情的可见/隐藏与英文无汉字断言和截图。实际 Worker 浏览器执行及截图验收等待最终提交 CI；本地仅解析测试清单，不把解析当作浏览器通过。
