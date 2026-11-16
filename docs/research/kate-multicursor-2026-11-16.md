# Kate 多光标资料核实

核实日期：2026-11-16。仅核实官方文档，未安装或运行 Kate。

- 当前官网 https://kate-editor.org/ 的 Multi-cursor editing 段明确支持多光标与多选区。
- 稳定版手册 https://docs.kde.org/stable_kf6/en/kate/katepart/kate-part-multiple-cursors.html 说明鼠标/键盘创建光标、选区各行末尾创建光标，以及匹配下一处/全部出现位置；可同时输入及转换大小写。
- 手册的 5.93 是 KatePart 引入支持的版本，不是本次核实的 Kate 应用发布号。默认快捷键可配置，不承诺每个平台/桌面环境都相同。
- 据此将代码编辑器比较中的 multi_cursor 从 unknown 改为 yes；这不是所有编辑命令均支持多光标的保证。其它未知能力不随之推断。
- 不修改原采集基线日期，不表示价格、许可证、全部字段在本日重验；没有应用实测、性能测试或自定义域名上线验收。
