# Flameshot 延时截图核实

核实日期：2026-11-16（UTC+8）。Issue #303。只核实延时能力，不刷新整行价格/平台/版本日期。

官方来源：https://github.com/flameshot-org/flameshot#usage ，当前 master README Usage 给出 GUI 延时 2 秒与全屏延时 5 秒示例，参数分别为 `gui -d 2000` 与 `full ... -d 5000`。足以将 delay_timer 从 unknown 改 yes；移除“本次未在官网首页确认”旧说明。

这是单次触发的捕获延迟，不是周期任务调度，也不承诺定时精度、所有桌面环境兼容或绕过系统截屏权限。README 提醒 Windows 控制台输出与 Linux Wayland/最小 X11 环境存在各自要求，不能因 CLI 入口就宣称无桌面/无权限可用。本批未安装运行、截取或上传任何屏幕，也未修改配置。

此前官网 CLI 页面通过浏览工具不可访问；未绕过，使用可读取的官方仓库 README。README 当前分支不是所有历史二进制的兼容保证。其他字段（含云分享、贴图、OCR）未在本批确认，不随带修改。使用已有双语 yes 状态，不新增未翻译文本或触碰共享英文文件。
