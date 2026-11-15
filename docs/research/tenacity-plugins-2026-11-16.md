# Tenacity 插件能力核实

核实于 2026-11-16（UTC+8），Issue #301。仅核实“效果器/插件”基础能力，不把旧行其余信息视为本日重验。

- 当前官网 https://tenacityaudio.org/ 明确支持插件，因此 plugins 从 unknown 改 yes，移除“未打开文档”旧说明。官网说明 Codeberg 是上游，GitHub 为镜像；本批不更改统计关联或把镜像提交当正式发布。
- https://tenacityaudio.org/docs/index.html 的页面标题为 1.3e1，但正文明确手册覆盖 1.3.x 分支；该文档标题不是最新安装包版本证明。行内 latest_release 仍未知。
- https://tenacityaudio.org/docs/_content/Effects_Plugins_and_Modules.html 在该手册范围列 VST 2、LV2、LADSPA、Vamp、Nyquist，AU 仅 macOS；不支持 VSTi 乐器插件。https://tenacityaudio.org/docs/_content/Preferences.html 明确该文档范围不支持 VST3。不能把基础 yes 理解为全部格式、任意插件兼容或其他版本永久限制。
- https://tenacityaudio.org/docs/_content/Installing_and_Installation_Notes.html 记录该手册下官方二进制为 Windows/Linux，macOS 为源码构建路径，不代表有现成 Mac 安装包或 M4 实测。官网跨平台描述与可下载二进制要分开。
- Modules 与效果插件不同：文档将其列为实验性且接口不稳定；mod-script-pipe 的输入安全警告不应忽略。不启用模块、不下载插件，也不承诺第三方插件免费或安全。

未安装运行 Tenacity、未处理音频、未测试插件或核对当前上游发布构建。本批公共表只使用已有双语 yes 状态及来源链接；版本/格式限定在此研究记录，不新增未翻译字符串或修改共享英文文件。许可、平台、维护状态和其他功能另待专门维护，不据此泛改。
