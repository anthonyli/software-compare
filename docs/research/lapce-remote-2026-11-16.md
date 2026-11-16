# Lapce 远程开发资料核实

2026-11-16，只读官方资料，未安装或连接远端。

https://lap.dev/lapce/ 当前产品页标 Version 0.4.2，Remote Development 段说明可连接远端机器；https://github.com/lapce/lapce README 也明确内置远程开发。据此把 remote_dev 从 unknown 改为 yes。

只表示存在该能力，不保证每个服务器操作系统、网络或扩展组合均兼容，也不把作者性能宣传视为实测。Lapdev 是另外的环境管理平台，不将其套餐、Kubernetes 能力或价格自动归到 Lapce，未验证是否需要某类账户或具体协议的全套配置。

初步查找的文档子路径不可访问，未依赖该路径；采用可读官方产品页与 README。调试器、AI、多光标本轮没有足够展开核实，保持未知；不更新整行采集基线、价格或许可证。没有配置远程权限、运行命令或处理用户代码。

后续候选：Kate 稳定手册 GDB 插件页面明确需启用插件和外部 DAP server（https://docs.kde.org/stable_kf6/en/kate/kate/kate-application-plugin-gdb.html）；如日后补调试器需保留依赖边界，非本轮修改。
