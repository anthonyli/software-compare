# 网络数据包分析：Wireshark / tcpdump
日期 2026-11-19；Issue #599；基线 a9159e92c60a79f1cb2bbaefa3c1d7bc5eed46f1。

## 分类与证据
本类针对接口数据包和捕获文件，不与 HTTP 调试代理、VPN 或 API 请求客户端混列。
- Wireshark https://www.wireshark.org/about.html 确认 GUI、TShark、跨平台、实时/离线分析和协议解析；https://www.wireshark.org/docs/wsug_html_chunked/ChapterCapture.html 确认捕获过滤。
- https://github.com/wireshark/wireshark/blob/master/README.md 与 COPYING：整体按 GPLv2 发布，多数部分为 v2-or-later，部分工具有不同许可；因此主字段保守记 GPL-2.0，不推断全部组件统一许可。
- https://wiki.wireshark.org/TLS ：解密要求适用密钥或会话秘密，不是仅捕获即能查看全部明文。
- tcpdump https://github.com/the-tcpdump-group/tcpdump/blob/master/README.md 确认基于 libpcap 和当前源码支持 Linux/macOS/Windows 等；Windows 需 Visual Studio/CMake 与 WinPcap 或 Npcap，不伪称现成官方安装包或所有历史版本支持。
- https://github.com/the-tcpdump-group/tcpdump/blob/master/tcpdump.1.in ：命令行实时采集、表达式过滤、-w 保存、-r 离线读取及协议内容描述。权限与接口依平台，不表示能采集任意网络；无内置 GUI。
- https://github.com/the-tcpdump-group/tcpdump/blob/master/LICENSE 是三条件 BSD 许可，免费开源不免除依赖的独立许可。

只读核实官方当前文档和源码，不安装、不抓真实流量、不改设备网络配置。未固定最新版本号，版本、星标、维护时间保持 null，避免从 master 冒充已发行版本。免费指本体许可费，不保证第三方驱动、支持或硬件免费。

## 国际化与封面
新增 14 条专属翻译；对基线核对旧词条零变更/零删除，不涉及 #406/#334。
封面登记 #E3F1ED，白色数据包与放大镜，沿用 480×260、22px 点阵、白色光斑和轻阴影。运行组合提示词脚本；与原始 code-editors、screen-recorders 并排检查，不含品牌、文字或外链。

## 验证
新增分类、许可、字段覆盖、安全边界和完整翻译单测；中英、1280/390 宽分类页与两产品页回归。完整单测、covers、build；本地浏览器若因 Wrangler 环境无法启动明确披露，最终 push/PR 双 CI 通过后才交付合并。未访问生产。
