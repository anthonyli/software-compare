# 录音与转写扩充（2026-11-14，Asia/Shanghai）

本批为官方资料核实，不是录音、转写准确率、音质或 M4 性能实测。没有录制、上传或处理用户音视频，没有安装这里推荐的工具。

## 范围

沿用现有分类与插画：录音由 2 行增至 4 行，转写由 2 行增至 5 行。Audacity 已出现在音频编辑分类，本批补其采集场景的对照，不冒充全站新软件。旧条目保持 2026-11-13 核实日期。

|工具|核实来源|比较边界|
|---|---|---|
|Audacity|[官网](https://www.audacityteam.org/)、[采集指南](https://support.audacityteam.org/basics/recording-desktop-audio)、[许可](https://github.com/audacity/audacity/blob/master/LICENSE.txt)|GPLv3 主程序免费；Windows WASAPI 回环不代表全平台零配置或单应用隔离。macOS 额外路由工具、插件和云服务须另查。|
|ocenaudio|[功能](https://www.ocenaudio.com/features)、[下载](https://www.ocenaudio.com/download)、[更新日志](https://www.ocenaudio.com/changelog)|3.21.0 明确电脑播放音频采集，3.22.2 提供多平台下载；未确认单应用隔离、广播、完整授权与隐私条件，不把可下载等同开源。|
|Vibe|[README](https://github.com/thewh1teagle/vibe)、[MIT](https://github.com/thewh1teagle/vibe/blob/main/LICENSE)|本地模型可离线，但可选 Claude API 摘要和网络媒体并非离线。麦克风输入、实时预览不等于已验证的持续低延迟转写。模型许可和能力另查。|
|Subtitle Edit|[README](https://github.com/SubtitleEdit/subtitleedit)、[许可](https://github.com/SubtitleEdit/subtitleedit/blob/main/LICENSE)、[识别引擎](https://subtitleedit.github.io/subtitleedit/features/speech-to-text.html)、[文档](https://subtitleedit.github.io/subtitleedit/)|按跨平台第 5 版核实。可选本地与在线引擎，模型需下载，许可/硬件/数据传出条件不同；未确认实时麦克风。|
|MacWhisper|[官网/价格](https://www.macwhisper.com/)、[听写版本限制](https://docs.macwhisper.com/article/14-how-to-use-the-dictation-feature)|官网免费/Pro 分档，标价 €64 一次性含长期更新，未进入付款；外部 API 另计。App Store 版不含系统听写，不承诺所有功能免费或离线。|

## 模型与使用提醒

Whisper turbo 的翻译限制属于模型而不是所有封装应用；不可仅凭使用 Whisper 就判定某应用支持任意语种翻译。各产品若有独立翻译阶段也应另查。源音频仍是核对识别结果的依据。

## 验证

数据/翻译/来源完整性与保守边界由 `site/tests/audio-catalog.test.mjs` 覆盖。合并前还须检查最终提交的 CI，包括构建与浏览器 E2E；不把未执行的阶段记为通过。
