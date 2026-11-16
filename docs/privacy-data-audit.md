# Compare 政策草稿事实核对

核对日：2026-11-16；基线 main 89e7c37（后续 3843d0d 仅笔记资料）。用户确认个人维护、开源。Issue #315。

## 发布阻碍（不得直接合并）

- 尚未确认可公开、实际有人接收的私密隐私请求联系渠道。
- 尚未确认运营所在地区、需要公开的运营者法定身份，以及相应权利/投诉途径、处理依据和跨境要求。GitHub 用户名、中文页面与网站时区都不能证明这些事实。
- Cloudflare 后台日志/备份保留与处理地域没有核实，不擅自更改配置。
- 两页带明确草稿标记。用户补充事实后修订并再审查，不能把草稿当已生效政策发布。生效日期不能提前虚构。

## 代码证据

|事实|位置|
|---|---|
|个人维护项目；源码 Apache-2.0，第三方权利另计|LICENSE、NOTICE、用户明确说明|
|Cloudflare Web Analytics beacon；语言 localStorage|site/src/layouts/Layout.astro|
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

本批新增源码回归测试核对双语、政策链接、关键数据事实、草稿阻断和禁止零收集宣传。构建与浏览器检查结果以 PR 最终 CI 为准。不可把正则文本测试当作法律意见、线上验证或完整 UI 验收。
