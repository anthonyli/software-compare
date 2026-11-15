# draw.io Desktop（2026-11-15 UTC+8）
main dea785a；矢量图形/设计8→9项。open issue/PR为空且drawio检索无重复。保持既有分类封面，不创建混用主封面的新图。

https://github.com/jgraph/drawio-desktop README和dev/LICENSE：官方Electron桌面版GPL v3，可免费用于任何用途，须履行适用许可义务；不把核心编辑器或Confluence/Jira许可混作桌面许可。Windows/macOS/Linux。未核实全部安装包架构及M4性能。

README Security：官方称不发送图表内容/应用分析，但更新以及图中引用外部媒体URL会联网，可向对方暴露IP等元数据。因此不写完全离线/永不联网；这是官方声明而非流量审计。未运行或导入未知图表。

https://www.drawio.com/docs/manual/export/export-to-svg/ ：导出SVG及文字foreignObject兼容限制，不承诺各种软件无损互操作。归入现有矢量类别用于结构化图解对照，svg标partial，不视作Illustrator印前/手绘路径完整替代。交互原型、桌面协作未知；self_host为na，仅此桌面条目，不否定其它draw.io网页部署方案。

原旧链接 /doc/faq/desktop 返回404，未作为能力来源。新增双语、单元和1280/390页面回归，执行结果以CI为准。未安装、运行或制作/渲染视频。

## 导出数据范围维护（01:00 UTC）
main 0ff326e，Issue #179。原条目没有嵌入源图数据提示，关键词问题检索只命中无关SVGEdit/Sioyek；open PR/issue为空。

https://www.drawio.com/docs/manual/export/export-diagram/ 的提示称 PNG、SVG、PDF 可选择嵌入图表数据；同页简表对PDF作单向导出概括，故此次公开产品说明聚焦PNG/SVG，不泛化各产品/版本所有PDF导出行为。
https://www.drawio.com/docs/manual/export/export-to-svg/ 明确 Include a copy of my diagram 可选整个多页图或当前页；All Pages输出可能显示当前页但包含所有页。分享前检查嵌入和页范围是基于此机制的使用建议，不声称每次导出必然携带秘密、不声称漏洞、未做运行或泄露复现。

保留原外部URL/foreignObject限制及全部功能判定，不改变产品数量。增强现有单元与英文产品页断言，不弱化原测试。
