# Postmark 事务邮件证据

2026-11-16 UTC，Issue #376；只读官方资料，未注册、发信或绑卡。

Developer 100 封/账户/月，无到期日。当前 pricing 明确适合测试、投递评估、低量副项目；并非纯模拟发送，也不承诺全面生产商用。价格表表头 Free / Basic / Pro / Platform，对应 custom domains 10 / 5 / 10 / unlimited，daily limit 四列均 Unlimited。仍受每月 100 限额，不按每域名赠送。旧手册域名不限说法不采用。

月度定价文档说明事务、广播、Sandbox 与处理的入站消息计量，CC/BCC 另计，未用量不结转。Free 不允许 overage，但精确拒收码、排队、重试未确认，不沿用旧 credits 文档或付费超额机制。Free 重置具体日期未确认，不宣称自然月。

新账户人工审批。审批说明正文明确获批前只能向账户已添加和验证的自有域名收件人发送，不泛化为 From 同域，也不混同发件身份验证。账户 Owner 提交审批，链接追踪同样要求获批。SMTP 官方落地页同时明确 100/月与免信用卡。

Sender Signature 可确认单地址，或验证整域；商业内容仍受服务条款、名单许可和反垃圾约束。新客户条款第 5 节规定许可名单、禁止购买租用名单、投诉率低于 0.1%、退信低于 10%；本表不承诺所有业务内容获准。大陆开户资格未知。

## 官方来源

- https://postmarkapp.com/pricing
- https://postmarkapp.com/support/article/1107-how-does-monthly-pricing-work
- https://postmarkapp.com/support/article/1002-getting-started-with-postmark
- https://postmarkapp.com/support/article/1084-how-does-the-account-approval-process-work
- https://postmarkapp.com/lp/postmark-smtp
- https://postmarkapp.com/support/article/how-do-i-verify-a-domain
- https://postmarkapp.com/terms-of-service

## 验证范围

保留旧四产品与全部旧英文；只追加数据、英文、证据与测试。实际 cleanPublicText 全公开文本翻译回归；真实 Worker 五产品中英桌面/手机比较，Postmark 独立详情四截图，六维可见/反向隐藏、无汉字及关键事实断言。实际 Worker 与视觉验收待 CI，本地清单解析不等于浏览器通过。不改布局、组件、配置、封面、预览或 tag。
