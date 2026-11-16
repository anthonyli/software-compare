# fre:ac（Issue #349）

基于 main23e6a74，2026-11-16仅公开官方文档与源码研究。限定现有converters新增条目、中英及独立测试；不改布局、封面或已有产品。

官方 https://www.freac.org/；源码 https://github.com/enzo1982/freac 固定提交 `4b47105c219fbe1612c45b40deb4955428d29931`。只读克隆，无子模块安装、构建、运行或媒体访问/转换。

- COPYING为GPL第2版全文，但only/or-later不可仅凭这份通用许可判定；`src/freac.cpp`头明确版本2或任意更新版本，因此主程序标GPL-2.0-or-later。外部组件许可证不归一化成主程序许可。
- 官网明确音频格式、整音乐库批量并保留目录/文件名、CD抓轨、CPU多核及桌面平台。README确认GUI和可选CLI。无CPU线程到GPU硬件加速推断。
- `manual/en/beginner.html`展示任务列表、LAME MP3质量预设及质量与文件大小关系，所以compress/presets为partial；不宣称视频改分辨率或任意视频设备预设。
- 视频画面转换、图片/文档转换、视频提音轨、GPU均unknown。CD抓轨有直接证据，但不是本分类“提取音轨”中视频提音轨的替代证据。
- 免费音频工具，不代表托管服务；CDDB/GNUdb查询联网，不能笼统宣称全部离线。未实测平台最低版本/原生M4兼容性能，统计/最新版本/维护状态留null。

验证要求：保留原产品和全部英文旧键；单测核对许可、特征全量、CPU/GPU/CD/video边界和翻译，浏览器独立测试IP243，不改生产限流。最终CI/E2E绿后才可合并。

本地：199单测、封面检查、Astro构建通过；原12个converters产品与2644个英文原键值完整保留。一次E2E尝试在现有Wrangler服务器启动时因 `uv_interface_addresses returned Unknown system error 1` 失败，浏览器断言未执行，不作为通过；最终提交CI补验。
