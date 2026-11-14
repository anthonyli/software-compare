# 数据库客户端补充 · 2026-11-14
基于 main cde7e68；开始时无 open issues/PR。数据库分类 5→7，新增 TablePlus 和 DataGrip，不改其他分类及界面。
仅官方文档核实；未安装、连接数据库或验证真实导入导出/性能。

## TablePlus
- https://tableplus.com/ 支持三桌面平台、Apple Silicon；iOS 另版不纳入本行。
- https://tableplus.com/pricing 买断含一年更新，可继续已有版本；免费同时限制两个标签/窗口/高级筛选，免费 Windows 不含筛选。未硬编码可能变动的金额。
- https://tableplus.com/docs/getting-started SQL 和数据编辑。
- https://tableplus.com/docs/gui-tools/import-and-export CSV/JSON/SQL 等；current page 导出仅当前页。
- https://tableplus.com/privacy 官方声明不传数据库内容到其服务器，但有许可设备哈希和可关闭崩溃报告；不能推断完全无遥测。第三方插件行为另核。
GitHub issue tracker 不等于客户端开源；数据库引擎及平台能力并非完全一致。

## DataGrip
- https://www.jetbrains.com/datagrip/ SQL、多引擎、编辑与导入导出。
- https://www.jetbrains.com/help/datagrip/register.html 非商用需账号联网激活、2025.2.4 起；有商业收益预期应商业许可。
- https://sales.jetbrains.com/hc/en-gb/articles/18950890312210-The-free-non-commercial-licensing-FAQ 个人非商业免费不扩大到组织。
- https://www.jetbrains.com/help/datagrip/installation-guide.html 三桌面平台及独立 Apple Silicon 安装包；当前帮助版本要求 8GB 总内存、IDE 可用 3GB。M4 16GB 是否流畅未实测，系统版本按实际安装版本核对。
非商业协议允许匿名 IDE 使用统计。AI 或外部 Agent 的模型费用及数据路径需单独审查，不能因本地 IDE 就承诺数据不外发。本行不评 AI 功能。

## 验证
新增中英文映射、许可边界单元测试、桌面/手机及英文详情浏览器回归；保留旧产品核实日期。浏览器测试使用独立 TEST-NET 测试请求头，避免干扰现有会话限额测试。
