# 中国买家钱包维度：官方证据与范围

核对日期：2026-11-16 UTC。Issue #356。基线 main `2d99d0f`。

本批只在现有六产品追加 `alipay`（明确大陆钱包）及 `wechat_pay`，并追加来源。原六特征、开户资格、费率、提现说明不变。**买家能付款不等于大陆卖家能开户；钱包支持不代表现有卡费率自动适用。** 未开户、启用设置、提交 KYC 或发起支付；未知不是不支持。

## 官方证据

- Dodo：[Payment methods](https://docs.dodopayments.com/features/payment-methods)、[WeChat Pay](https://docs.dodopayments.com/features/payment-methods/wechat)、[Asia-Pacific](https://docs.dodopayments.com/features/payment-methods/asia-pacific)。AlipayHK 不等同大陆支付宝，因此大陆支付宝 unknown。微信一次性、USD/CNY；最低 USD 0.50 / CNY 4，最高 CNY 1000 或动态等值 USD；CNY 需 Adaptive Currency。微信 partial；钱包费率另核。AlipayHK 另需 HK 买家地址、HKD 和 Adaptive Currency，一次性、最低 HKD 4，不在 CNY 结账出现；这些香港钱包条件不填成大陆支付宝能力。
- Creem：[Introducing Creem 2.0](https://www.creem.io/blog/introducing-creem-2-0)，更新于 2026-09-17，宣布 Alipay。未确认该方式细分商户/买家地区、币种及自动续费边界，故 partial。没有足够本产品微信直接证据，unknown；不能把 Creem 比较文章里 Paddle 的微信能力归给 Creem。公告自动域名验证语句对应 Apple/Google Pay，不扩张至 Alipay。
- Paddle：[Alipay](https://developer.paddle.com/concepts/payment-methods/alipay/)：审批，CN/CNY，All 设备，一次性和订阅；官方上限措辞是 “subscription renewals and charges”，CNY 1600，临时折扣前金额也受限，不泛化断言所有首购。[WeChat Pay](https://developer.paddle.com/concepts/payment-methods/wechat/)：CN，CNY/USD，Desktop，一次性而非订阅。两列 partial。
- Lemon Squeezy：[Payment methods](https://docs.lemonsqueezy.com/help/checkout/payment-methods)：列出 Alipay/WeChat Pay，支付方式按买家地点和设备显示，二者不适用于订阅。没有取得精确国家/币种表，不自行补充；两列 partial。
- Stripe Payments：[Alipay](https://docs.stripe.com/payments/alipay)、[WeChat Pay](https://docs.stripe.com/payments/wechat-pay)。两页能力表均列 single-use、Recurring payments not supported；但 Alipay 同页正文 Recurring payments 段另列邀测例外：Invoicing、Checkout subscription/setup 及保存信息供未来付款须 private preview，invite-only 且由 Alipay 单独批准。因此区分标准公开能力和受限邀测，不绝对声称 Alipay 无循环付款；微信正文同样有 private preview 例外，但只支持 off-session；Checkout 不支持 subscription/setup，Invoices 仅 send_invoice。不能仅根据能力表否定正文私测，也不能把私测等同普遍可用。独立审查发现并复核这一正文例外后修订。商户名单含香港不含中国大陆，支持币种随商户地区；Alipay 要求公开网站，微信要求运营网站及有效结账，微信仅 B2C 非 B2B。两列 partial；不会改变现有大陆开户 no，也不代表 Stripe Managed Payments；钱包费率另核。
- PayPal 中国卖家：[Online checkout](https://www.paypal.cn/portal/merchant/online-checkout)。本条范围仍是中国统一协议 + 全球收单。通用 APM 文案不能确认大陆 Alipay 或微信是否适用于该账户方案；Braintree 或其他地区 PayPal 产品不能代替证据。两列 unknown，不以搜索未找到推断不支持。

## 变更与验证

- 六个原条目所有旧字段和六特征以基线 SHA-256 单测冻结，仅排除追加 sources 与两新特征；旧 EN 键逐项比对保留。
- 新浏览器用例使用真实 Worker、独立测试 IP `192.0.2.246`，不 mock API、不放宽生产限流。桌面 1280 / 手机 390 检查中英新列和六条详情说明的实际可见性及反向隐藏。
- 分类截图先滚回顶部并轮询确认 `scrollY === 0`；命名 `payment-page-wallets-*` 复用现有 CI artifact 上传 glob，无 workflow/UI/config/封面变更。详情测试检查说明，分类折叠的其他资料不冒充已验收。
- 本地 npm ci 遇 /tmp 空间不足，只移除本批失败安装生成的 node_modules；确认 lockfile 与已有工作目录一致后以未跟踪符号链接复用依赖，不提交链接，不删除其他任务资料。
- 本地测试及构建结果待下方补录；实际 Worker E2E/CI 结果必须分别如实记录。草稿 PR 不代表可合并，本批没有合并授权，也不包含 #354 的受阻操作。

### 本地实际结果

- `npm test`：205/205 通过；`npm run check:covers`：2/2 通过。
- `ASTRO_TELEMETRY_DISABLED=1 npm run build`：549 页成功；`git diff --check` 通过。
- 基线 2670 个旧 EN 键值逐项完全保留，原 source 列表完整前缀保留。
- `npm run test:e2e -- china-wallets.spec.ts`：Worker 启动失败，`uv_interface_addresses returned Unknown system error 1`（伴随默认 Wrangler 日志写入限制），浏览器断言和截图未执行。不能视为视觉验收完成；需最终 head CI 成功后读取真实截图。
