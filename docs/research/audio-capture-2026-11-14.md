# 录音与应用音频采集扩充（2026-11-14）

Issue #69，基于 main f8cfc7b；开始时无 open PR/issue。4→6 款，增加 OBS Studio 和 QuickTime Player。复用既有封面。

- OBS 官方 macOS 文档确认 macOS 13+/OBS30+独立系统/应用音频源；Windows 文档确认 Win10 2004+/11、OBS28+逐应用捕获且部分应用不兼容。按跨平台汇总列记 partial，并列明条件，Linux逐应用未核实。麦克风及推流 yes。
- QuickTime 官方录音指南只确认麦克风和纯音频保存；app/system/broadcast保留unknown而非无证据no。只比较当前macOS版，不推荐旧Windows版。不将第三方虚拟音频输入当内置系统回录。
- Apple默认指南地址读取返回429；使用搜索可访问的Apple官方地区文档核实，未绕过限制。来源见产品sources。
- 未运行产品、录音、采集麦克风、上传文件或制作视频；未测试音质/延迟/M4性能。记录本地保存与推流/同步数据去向差异。

新增44项unit中的内容边界测试与一项浏览器桌面/移动/英译/溢出回归。修正旧audio-catalog日期断言：仅检查具名原始产品保持11-13，而非将未来所有新增产品都误断言为旧日期。不修改生产接口/限流；浏览器内容测试使用独立loopback测试身份。
