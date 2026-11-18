# Flowblade 代理剪辑核实（2026-11-18）

Issue #458。官方固定版本手册：
https://github.com/jliljebl/flowblade/blob/54b68c4532e4d50e3f617a38a680315eb159f11e/flowblade-trunk/Flowblade/res/help/proxy.html

手册明确通过 Project → Proxy Manager 设置并生成代理媒体，可切换 Use Proxy Media / Use Original Media。因此仅将 `proxy` 从 unknown 改为 yes，并删除过期“未确认”提示。

代理用于降低编辑时解码和磁盘带宽需求；最终流程切回原始媒体后渲染。必须保留原始媒体，删除媒体会阻止切回；只能使用全部已有代理或全部原始媒体，不支持只使用部分已创建代理。本次没有实际生成代理、渲染视频或测量性能，也不推断 GPU 加速、4K 输出或任何其他未知能力。没有改动平台、许可、价格、词典或布局。

新增单测锁定值、来源、Linux 平台及其他未知能力；浏览器回归覆盖中英文和桌面/手机宽度，以最终 CI 实际结果为准。
