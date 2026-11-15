# 开发者工具箱：分类候选与比较规范

核实：2026-11-16 Asia/Shanghai。状态：**研究设计候选，未加入站点分类**。本文件不是产品运行测试或隐私审计。站点 main `edbb267` 中未发现 DevToys、IT-Tools；不把已有音视频“格式转换”变成开发工具杂项桶。

## 拟定分类

- slug：`developer-toolboxes`；名称：开发者工具箱 / Developer toolboxes；归属开发工具。
- 用途：格式化、编码/解码、数据结构转换、文本差异与正则等常用任务。
- 不混入代码编辑器、API 请求客户端、通用终端或密码管理器。含密码生成/JWT 工具不等于安全凭证保管或鉴权验证。
- 比较维度：JSON/XML 格式化、JSON/YAML 转换、Base64/URL 编解码、JWT 解码、文本差异、正则测试、哈希/UUID、本地离线工具、可自托管、扩展、CLI。组合字段有部分能力须标 partial，不把未知标 no。

## DevToys

来源：[官网](https://devtoys.app/)、[下载页](https://devtoys.app/download)、[发布列表](https://github.com/DevToys-app/DevToys/releases)、[Latest](https://github.com/DevToys-app/DevToys/releases/latest)、[MIT 许可](https://github.com/DevToys-app/DevToys/blob/main/LICENSE.md)。

- 官网展示 30 个默认离线工具，包括 JSON/YAML、Base64、JWT、文本比较、哈希、正则。扩展可增加工具，不能把扩展功能都算内置。
- Latest 指向 v1.0.13.0；发布列表的 v2.0.9.0 标记 Pre-release。跨平台 2.0 不应写作稳定版能力。上线条目应明示通道，不能用 1.x 版本元数据搭配未解释的 2.x 平台。
- 下载页有 Windows x64/x86/ARM64、macOS Intel/Apple Silicon、Linux x64/ARM64；未取得最低系统版本直接证据，保持未知。M4 16GB 性能和具体内存未测试。
- MIT 允许商用、修改与分发，保留版权/许可声明；依赖及第三方扩展各自条款另核。
- CLI 为独立应用，仅涵盖适合命令行的工具，不能宣称与 GUI 完全一致。

### 数据边界

[官网](https://devtoys.app/)称 Smart Detection 利用剪贴板内容选择工具，只有一个匹配时可自动粘贴，设置可调整。本次未读取剪贴板。

当前 README 引用的[隐私政策](https://github.com/DevToys-app/DevToys/blob/main/PRIVACY-POLICY.md)仍标 2021-09-23：使用/错误/性能日志本地保存，政策称不发送作者或服务提供者。这不是对新版运行的网络审计，也不应反向写成“自动上传遥测”。第三方服务另核。[扩展条款](https://github.com/DevToys-app/DevToys/blob/main/EXTENSIONS-TERM-AND-CONDITIONS.md)指出第三方扩展可操作本机并存在数据泄漏等风险。默认工具离线不等于所有扩展零联网。

## IT-Tools

来源：[官方仓库/README](https://github.com/CorentinTh/it-tools)、[LICENSE](https://github.com/CorentinTh/it-tools/blob/main/LICENSE)、[工具注册](https://github.com/CorentinTh/it-tools/blob/main/src/tools/index.ts)、[package.json](https://github.com/CorentinTh/it-tools/blob/main/package.json)。

- 浏览器开发工具集合，官方记录 Docker Hub/GHCR 自托管路径。未安装或部署；自托管需自行承担主机/运维成本。
- LICENSE 完整文件为 GPLv3，元数据写 GNU GPLv3；没有另行确认 later 授权，不擅加“或后续版本”。分发修改版与依赖义务需遵循实际许可。
- 注册表含 JSON/YAML/TOML、XML、Base64、JWT 解析、正则、文本差异、哈希等；注册不等于逐项运行通过。
- [JWT service](https://github.com/CorentinTh/it-tools/blob/main/src/tools/jwt-parser/jwt-parser.service.ts)使用 jwt-decode 解析 header/payload，不做签名验证。解码成功不证明 token 可信。
- [统计插件](https://github.com/CorentinTh/it-tools/blob/main/src/plugins/plausible.plugin.ts)及[配置](https://github.com/CorentinTh/it-tools/blob/main/src/config.ts)显示 Plausible 可配置、默认关闭；启用时自动记录 pageview。没有依据说它上传表单输入，也不能说所有部署绝不联网。托管站实际配置未经验证。
- [Vite 配置](https://github.com/CorentinTh/it-tools/blob/main/vite.config.ts)有 PWA/自动更新，不等于全部功能离线可用。
- package.json 版本字段为 `2024.10.22-7ca5933`，不能仅凭该字段推断最新发布或维护停止。Vue/TypeScript、Vitest/Playwright 脚本存在不等于 CI 已通过。

## 发布前剩余验收

1. 明确 DevToys 版本通道，并为可证实的功能逐项建 yes/partial/unknown；IT-Tools 托管与自托管分别说明。
2. 把候选封面登记到正式设计 spec、配色 config，再加入分类数据和双语文案。此批不注册、不影响首页。
3. 依据当前 main 去重，执行结构/翻译/封面与桌面、390px浏览器测试，独立审查及最终 CI 通过后才发布真正分类。
4. 不要求用户提供敏感 token 来验证工具，不上传真实资料；没有安装运行、启用扩展、读取剪贴板、制作录屏或修改生产配置。
