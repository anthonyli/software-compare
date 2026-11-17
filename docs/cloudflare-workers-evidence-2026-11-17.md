# Cloudflare Workers 核验

日期：2026-11-17。新增完整产品而非把 Pages 当成 Workers；保留旧产品。

## 官方资料
- https://developers.cloudflare.com/workers/platform/pricing/ ：Free 每日 100,000 请求，每次 10ms CPU。
- https://developers.cloudflare.com/workers/platform/limits/ ：账号日额度 UTC 零点重置，超额 1027；路由 fail open / fail closed。静态资产 Free 每版本 20,000 文件、单文件 25MiB。
- https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/ ：直接资产请求免费不限量，存储无额外费用；SSR/函数调用另计。run_worker_first 命中路径超日额度为 429，不回退静态资产。
- https://developers.cloudflare.com/workers/ci-cd/builds/limits-and-pricing/ ：2026-10-28 更新为 Free 3,000 构建分钟/月、账号 1 并发、20 分钟超时。不是 Pages 的 500 次构建，不延用旧数字。未核清免费构建额度耗尽处理及时区，明确标未知。
- https://developers.cloudflare.com/pages/functions/pricing/ ：Pages Functions 与 Workers 共用免费日请求池。
- https://www.cloudflare.com/products/workers/ ：免费起步明确免信用卡。
- https://www.cloudflare.com/service-specific-terms-developer-platform/ ：负载、内容规则仍适用。未对免费商业项目许可作无依据保证。

## 边界
不注册、绑卡、部署或访问生产站点；不把公开免卡声明当地区开户保证。数据库、存储等另计；本条只列 Free，不把每日额度乘 30 后称月池。不修改 SendGrid 待确认工作、首页布局、封面或部署配置。
