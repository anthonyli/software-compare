# Audacity 降噪单元核实

2026-11-16 Asia/Shanghai，基于 main613d923。只重新核实降噪能力，不代表价格/许可/全功能同时重验。

[当前官网功能页](https://www.audacityteam.org/features/noise-reduction/)明确说明免费 Noise Reduction 在 Windows/macOS/Linux 可用。[新版手册](https://www.audacityteam.org/manual/effects/noise-removal-and-repair/noise-reduction/)（页面标2026-11-12更新）说明先选择只有噪音的片段建立 profile，再处理目标音频。适用于持续底噪，不承诺移除关门等单次声音；采样混入目标声音或参数过强可能损坏信号、产生伪影。

原单元 unknown 仅因此前首页未点名，现依据专页改 yes，删除过时注释并追加两条官方来源。此 yes 表示具备降噪能力，不是无损、全噪音类型或 AI 清理保证。

本轮也查[旧宏手册](https://manual.audacityteam.org/man/macros.html)及[新版 Tools 菜单文档](https://www.audacityteam.org/manual/menu-bar/tools/)，不同代际文档不能直接证明当前4.x所有批量行为；批量、频谱等保持 unknown，不借历史能力猜测当前实现。

未安装运行 Audacity、处理用户音频或制作配音/录屏。修改仅分类该单元/来源、研究及回归测试，不改共享翻译、首页或生产设置。需独立审查和最终 CI。
