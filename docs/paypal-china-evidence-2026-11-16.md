# PayPal 中国卖家方案证据（Issue #351）

核查日期：2026-11-16 UTC。只读官方网页和 PDF；未注册、接受协议、提交证件、绑定银行、收付款或实测。范围为 paypal.cn 新统一账户的全球收单，不代表全球所有 PayPal 产品。原五个产品不变。

## 契约与资格

- https://www.paypal.cn/portal/paypal-unified-account-ua （更新日期 2026-05-28）：业务账户包含个人类别企业用户，不等于消费者个人账户。个人为年满18岁的中国居民；非个人为境内法律实体；主体及适用控制人须符合中国税收居民、非美国税收居民/不受美国税法约束条件。KYC/KYB/CDD 和补件审核适用。卖家承担交易税务，故 MoR=no。
- https://www.paypal.cn/portal/paypal-worldwide-services-terms-and-conditions ：全球服务由 PayPal Pte. Ltd. 提供；提现路线取决于账户资格，冻结及限制可能延迟提现。
- https://www.paypal.cn/portal/help/article/441 ：合资格中国居民与法律实体分别按身份证、营业执照申请；不能把“合资格”省略。
- https://www.paypal.cn/portal/help/article/439 ：持个体工商户营业执照的经营者，官方建议企业卖家账户。
- https://www.paypal.cn/portal/landing/individual-seller-baidu ：个人卖家可用付款链接/账单等无需独立站；脚注明确统一协议和全球服务条款，而非旧个人消费账户条款。不把营销的分钟级/当日开户当保证。

## 两种开户材料与另行申请人民币结算的区别

- [个人卖家 PDF](https://objects.paypal.cn/ppcn-martech-infostore/assets/PayPal%E4%B8%AD%E5%9B%BD%E4%B8%AA%E4%BA%BA%E5%8D%96%E5%AE%B6%E6%B3%A8%E5%86%8C%E6%8C%87%E5%8D%97.pdf)：已下载提取全文；第5–6、11–18页：身份证、邮箱、大陆11位手机号，身份验证及职业、商业名称、客服号码、MCC、月销售额。没有将独立站列为一律必备；材料提交后仍待审核。
- [企业卖家 PDF](https://objects.paypal.cn/ppcn-martech-infostore/tscp-onboarding-tutorial-guide-biz-account.pdf)：图像版，已阅读第5–6页官方截图。营业执照、法代身份证、受益人身份证或护照等、邮箱手机及税务资料；准确资料及后续补件要求以申请流程为准。
- https://www.paypal.cn/portal/help/article/321 ：有效店铺 URL 是另行申请 PayPal 跨境收款/付款产品的材料，不能推广为所有全球收单都须独立站，也不能用个人卖家无网站营销去免除此结算审核条件。

## 费用和出金分路径

- https://www.paypal.com/c2/business/paypal-business-fees?locale.x=en_C2 （页内更新 2025-06-18）：明确排除《PayPal支付服务用户协议》账户，适用《PayPal中国跨境支付服务用户协议》及《全球服务条款》。4.4%加固定费；USD固定费0.30，故主价格只示例美元国际商业收款。高级卡支付另4.1%加固定费，须独立批准，不纳入此基准。退款不退原收款费。换汇、争议、退单及税费不在示例内。USD35仅为表内大陆银行电汇提现，不代表人民币结算统一收费。
- https://www.paypal.cn/portal/fees ：人民币结算标准费1%，并对服务费计当前6%增值税，非本金6%。页面另列2026-01-15至2026-12-31美元余额限时优惠及登录查看活动详情；为避免过期优惠误导，产品只放标准费，不将优惠或基础费用称为全包成本。
- https://www.paypal.cn/portal/rmb-withdrawal-terms-and-conditions ：另行申请、有效交易核验、关联境内银行；服务额度不等于余额。
- https://www.paypal.cn/portal/help/article/286 ：人民币路线以北京时间工作日13:00为分界，一般当天或下一工作日处理，不保证时效。不能套到全球所有电汇渠道。

## 数据决定与英文一致性

`cn_individual=partial`、`cn_business=partial`、`payouts=partial`；`mor=no`；`review=yes`；`recurring=unknown`，因为一般存在订阅产品并不能确认本条每类大陆账户能力。未验证版本、星数等保留空值/未知。英文完整解释相同的契约、控制人、网站及出金边界。费率字符串自带USD且currency=null，避免显示成美元4.4%；按成功交易而非月费。

## 验收

本批只更新数据、追加英文键、证据、数据测试和真实 Worker 页面测试；不改UI、封面、工作流或其他产品。E2E独立TEST-NET地址192.0.2.244，只隔离测试会话限流，不mock API，不降低生产限额。桌面1280与手机390检查新条目、实际英文名称/费率及详情边界。

本地 `npm test` 202项通过、`npm run check:covers` 通过、`ASTRO_TELEMETRY_DISABLED=1 npm run build` 通过，`git diff --check` 通过。旧5产品和2659个英文键逐项比较保持一致。单次真实Worker E2E尝试在webServer启动阶段失败：`uv_interface_addresses returned Unknown system error 1`，另有Wrangler默认日志路径EROFS；未运行任何浏览器断言，不能称视觉/E2E通过。最终提交必须独立审查与GitHub CI全绿后才可合并。
