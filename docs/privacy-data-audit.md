# Compare 政策草稿事实核对

核对日：2026-11-16；基线 main 89e7c37（后续 3843d0d 仅笔记资料）。用户确认个人维护、开源。Issue #315。

## 个人维护与联系确认

用户明确授权公开联系邮箱 anthonyli1021@gmail.com，用于网站联系与隐私请求。页面使用公开项目维护身份 GitHub anthonyli，不虚构公司或法定姓名。尚未确认运营所在地区，因此不写特定法院、仲裁、主管机关或地区适用结论；保留适用法律下权利与有管辖权主管机关投诉的一般说明。

Cloudflare 后台日志/备份保留与处理地域没有核实，页面如实注明未知，不擅自更改配置或承诺具体删除日期。公开说明不是全地区合规认证。联系邮箱由用户直接授权，不从其他来源推定；收发邮件仍经过各自邮件提供商，不暗示端到端加密。

## 代码证据

|事实|位置|
|---|---|
|个人维护项目；源码 Apache-2.0，第三方权利另计|LICENSE、NOTICE、用户明确说明|
|Cloudflare Web Analytics beacon（Pages 自动注入）；语言 localStorage|Cloudflare Pages Metrics 配置；site/src/layouts/Layout.astro|
|本地加载索引匹配搜索词|site/src/components/SearchBox.astro|
|随机推广、点击才新标签页、无专门点击跟踪|site/src/components/HomePromotion.astro|
|compare-view|site/src/pages/c/[slug].astro|
|compare-votes-changed 与 API 请求|site/src/scripts/votes.ts|
|GET 时创建一年 Cookie；随机ID、HMAC、IP限流、取消点赞|site/worker/index.js|
|D1 产品ID、浏览器ID、时间；无点赞自动到期机制|site/migrations/0001_votes.sql、site/worker/index.js|

Cookie 不等于匿名化；清除 Cookie 不等于删除 D1 行；限流到期不等于即时清理；应用未存原始 IP 不等于 Cloudflare 不处理 IP。没有核实线上行为或查用户数据、仪表盘日志，不声称实测。没有新增遥测、同意按钮或修改存储行为。

## 外部官方资料

- Cloudflare 对分析方式的声明：https://blog.cloudflare.com/the-rum-diaries-enabling-web-analytics-by-default （不使用客户端状态，不通过 IP/UA 指纹持续跟踪做分析）。与本站点赞 Cookie 区分。
- Cloudflare Web Analytics：https://developers.cloudflare.com/web-analytics/about/
- Cloudflare 隐私说明：https://www.cloudflare.com/privacypolicy/ （后续需按实际服务角色与配置核实，不能据此猜存储地域）。
- ICO 的隐私透明度清单：https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/ 。仅用于发现身份、联系、用途、保留期等缺口，不代表已认定 UK GDPR 适用。

## 验证

本批新增源码回归测试核对双语、政策链接、关键数据事实、联系邮箱和禁止零收集宣传。构建与浏览器检查结果以 PR 最终 CI 为准。不可把正则文本测试当作法律意见、线上验证或完整 UI 验收。
