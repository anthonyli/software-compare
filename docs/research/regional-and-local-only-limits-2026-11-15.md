# 地区与模式限制维护（2026-11-15 Asia/Shanghai）

本批不新增产品。当前main及在途已去重，只修正有用户影响的范围说明。

## Microsoft Authenticator：中国使用情境
https://support.microsoft.com/en-us/authenticator/download-microsoft-authenticator-in-china
官方Android表：验证码可用、push设置及passkeys不可用。工作/学校验证码需要管理员启用方法；Android工作/学校添加方式限扫码。
iOS表：验证码及push设置可用，但push脚注要求扫码设置；passkeys不可用。页面提到境外设置的工作/学校账号可认证，但不据此承诺任何账号任意环境可用。21Vianet不支持passkeys的备注不能反推其他中国账号支持。
只添加中国地区范围提醒，不把全球功能矩阵改成no；无任何登录、扫码、账号或安全设置操作，未做中国真实网络实测。

## Anytype local-only
https://doc.anytype.io/anytype/data/sync-and-backup/local-only.md
官方当前标实验性，原因涉及手动备份的数据丢失风险。关闭远端备份节点，同局域网设备仍可同步；应定期导出并安全保存备份，不能依赖官方恢复丢失数据。该模式区别于默认Anytype Network，本地优先不等于local-only。未实际切换模式或测试恢复。
