# FreeFileSync（2026-11-15 UTC+8）
main 8bf5b39，文件同步14→15；open issue/PR及名称检索未发现重复。

https://freefilesync.org/faq.php 明确 Standard/Donation 仅私人个人用途，商业个人与组织需 Business。€20/设备、无限期使用含一年更新，邮件通知仅保证更新期内，不能写永久免费商用。Donation 包含并行复制、自动更新、邮件等增强；不是购买Business授权。

https://freefilesync.org/ 与 download.php 宣称 Open Source 且提供源码。尝试读取官方14.13源码ZIP时Web工具不支持二进制、HTTP返回内容无法作为ZIP读取，因此未核实内含许可证；不使用第三方镜像猜GPL版本。open_source依官方自述，license栏明确源码核验局限与二进制条款差异，无GitHub仓库猜测。

https://freefilesync.org/manual.php?topic=synchronization-settings ：Mirror会删除目标以匹配源，Two way会传播删除。https://freefilesync.org/manual.php?topic=versioning ：版本保留须配置；Recycle bin限本地且控制有限。https://freefilesync.org/manual.php?topic=realtimesync ：目录事件加空闲等待触发命令/批任务，不是服务器持续流式同步。

FAQ支持Windows/macOS/Linux、本地/共享/FTP/FTPS/SFTP/Google Drive；据此说明目的地数据流，不把传输加密当E2E；块级同步、移动客户端、分享链接没有足够证据标unknown。官方privacy.php主要描述网站/论坛，不能当完整应用遥测审计。未安装运行、同步、删除、上传文件或购买，M4未测。

新增双语、单元与宽/窄屏展示测试；状态以CI为准。
