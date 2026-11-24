# 独立 Bitwarden Authenticator

Issue #406。2026-11-24 仅阅读官方产品页、帮助中心和现行代码仓库，没有安装应用、登录账号、导入验证码或访问生产站点。

这条记录的是独立 Bitwarden Authenticator，不是 Password Manager 内置验证码。内置验证码仍按 https://bitwarden.com/help/integrated-authenticator/ 记为付费档，本条目不改密码管理器数据。

## 已核对

- 产品页与帮助中心：免费、开源，iOS 与 Android，生成 TOTP。本地使用不要求 Bitwarden Password Manager 账号。
- 帮助中心对比表：独立应用仅移动端；Password Manager 内置验证码覆盖桌面、浏览器扩展和网页。
- 同步：https://bitwarden.com/help/totp-sync/ 。需同一设备上的两个应用、已登录的 Password Manager，并按账号打开 Allow authenticator syncing。官方要求 iOS 或 Android 12+。本地验证码默认不同步；复制到金库是单向操作。登出 Password Manager 后，已同步验证码在 Authenticator 中不可用。保护 Bitwarden 账号的验证码应存为本地验证码，避免锁出。
- 存储：帮助中心写明本地数据库未加密，本地验证码不同步到 Bitwarden 服务器。产品页的“端到端加密”表述不覆盖这一句。系统 iCloud 或 Google One 备份是另一条路径。
- 导入导出：https://bitwarden.com/help/authenticator-import-export/ 。Authenticator 导出只有 .json 和 .csv，示例 JSON 将 encrypted 标为 false，并包含明文 otpauth 密钥；步骤没有导出密码。已同步到金库的验证码不在这份导出里。不能导入带密码的 2FAS 备份或加密的 Aegis JSON。因此“密码加密文件导出”记为不支持，而不是未知。
- 代码许可：现行 https://github.com/bitwarden/android 与 https://github.com/bitwarden/ios 的 LICENSE.txt 均为 GPL-3.0。Authenticator Android 模块使用版本目录 minSdk 29。已归档的 authenticator-android 与 authenticator-ios README 指向上述仓库。两个现行仓库同时包含 Password Manager，所以不填写 github_url，避免把密码管理器的星标或 Release 显示成验证器版本。

## 尚未确认

- 自托管 Password Manager 账号能否使用上述同步。
- 当前 iOS 工程的最低系统版本。帮助中心写 iOS 15+，没有把它写成已从现行 Xcode 配置核对的结论。
- 生物识别解锁是否改变帮助中心所称的本地未加密数据库。
- 第三方依赖和图形资产是否另有许可。
- 帮助中心安装说明仍写 Android 9+，与当前 Android 模块 minSdk 29（Android 10）不一致，两边都保留，不取其一当作唯一要求。
