# 身份验证器资料核实

2026-11-15（东八区）；仅官方文档与仓库阅读，没有安装应用、创建验证器账户、录入真实验证码/密钥或测试恢复。

来源链接逐项保存在 categories/authenticators.json。首批 2FAS Auth、Ente Auth、Aegis、Google Authenticator、Microsoft Authenticator；与密码管理器分类分开。数据去向与恢复边界放在产品 notes，不能用单一“云同步”勾选推导全部平台同步或全部账户凭据恢复。

- 2FAS：官网备份安全说明推荐独立备份密码；同操作系统云同步，跨系统文件迁移。Android 与 iOS 代码仓库标注 GPL-3.0。
- Ente：官网明确免费、离线免账户、跨平台端到端加密同步、AGPL-3.0；本次未确认密码加密导出的格式，标为未知。
- Aegis：官方 README 明确 Android、HOTP/TOTP、AES-256-GCM、加密/明文导出、指定位置自动备份；不等同内置多端同步。
- Google：官方文档明确传输/静态加密、可免账号使用与旧机二维码迁移；没有把它推断为端到端加密，也没有套用历史仓库许可到当前客户端。
- Microsoft：官方备份文档明确同系统恢复，以及组织/无密码凭据重新注册。文档预告 2027-01 Android 改 Google One，必须届时复核。

封面使用原系列 480×260 SVG 容器，浅叶绿背景、手机圆点与盾牌对勾；无数字/文字/品牌。分类说明登记在 category-cover-spec.json。
