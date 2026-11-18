# NAPS2 压缩能力核实（2026-11-18）

## 官方依据

- https://www.naps2.com/doc/editing#compress ：扫描或导入后的页面可通过 Image → Compress 调整分辨率、尺寸、色深和 JPEG 质量，减小保存的 PDF/图像体积。降低 JPEG 质量会损失图像细节。
- https://www.naps2.com/doc/settings ：PDF Settings 的 Allow JBIG2 compression 对黑白页面使用无损 JBIG2；可关闭以兼容不支持 JBIG2 的软件。

## 数据边界

仅将 NAPS2 的 `compress` 从未知改为支持，并去掉过期的“首页未确认”。现有产品摘要和免费限制已明确其扫描到 PDF/图像定位、并非通用 PDF 编辑器，因此不额外添加重复提示。此次不声称任意矢量 PDF 都能无损减小、不保证压缩比，也不将页面 JPEG 有损压缩与黑白 JBIG2 无损压缩混为一谈。其他功能、许可、价格及平台不变，不新增英文词条。

单元测试锁定能力及来源，同时保留扫描范围和原文编辑限制；浏览器回归覆盖中英两种语言与桌面/手机宽度。浏览器运行结果以最终 CI 为准，不访问线上页面。
