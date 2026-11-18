# REAPER 降噪与频谱编辑核实（2026-11-18）

Issue #478。仅 noise_reduce、spectral 从 unknown 改为 yes，删除过时的未核实备注。

- https://www.reaper.fm/about.php ：Included 64-bit audio plugin suite 列有 ReaFIR；Built-in signal processing 明确支持媒体条目的内置非破坏性频谱编辑。
- https://www.reaper.fm/reaplugs/ ：ReaFIR Subtract 模式可建立噪声轮廓并从信号中减去噪声。与 About 的自带插件清单交叉验证，而非把外部插件的能力直接视为宿主内置。

这是功能存在性的资料核实，不是音质实测，不承诺 AI 修复、无损降噪或任意噪声清除效果。非破坏性编辑指编辑方式，不是无损输出保证。独立 ReaPlugs 的免费分发不改变 REAPER 商业许可/60天试用。现有版本快照、价格及其他功能保持不变。未访问生产站，也未制作音视频。

添加正面单测与双语桌面/移动详情页回归；旧批量转换测试不再要求本次核实的两项保持未知。没有共享词典、布局或部署配置变更。
