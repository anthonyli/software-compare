# Compare / 软件对比

**简体中文** | [English](README.en.md)

[在线体验](https://compare.pageon.cc)

对照价格、免费限制与功能，选出适合你的工具。

## 这是什么

Compare（软件对比）是一个静态对照站，用来比较桌面、手机和网页工具的价格、免费档限制、平台和功能差异，覆盖办公、AI、创作、开发、运动和户外等场景。站点品牌标志是字母 C 的组合标志与 Compare 字标，中文产品名为「软件对比」。

本仓库用 Astro 在构建时读取数据，生成静态页面；匿名点赞与社区人气排名由 Cloudflare Pages Functions 和 D1 提供。GitHub 数据每日通过 GitHub Actions 更新，官网资料暂不自动更新。源代码与数据发布在 [GitHub 仓库](https://github.com/anthonyli/software-compare)。

## 本地运行

需要 Node.js 22 和 npm。

```bash
cd site
npm ci
npm run dev
```

完整本地站点运行在 `http://localhost:8787`，包含本地 D1 和点赞 API。其他命令：`npm run build` 输出到 `site/dist/`，`npm run preview` 仅预览静态构建结果。Cloudflare 配置、GitHub Actions 密钥和测试说明见 [部署指南](site/README.md)。

站点名称、分组和展示用文案在 `site/src/config.ts` 与 `site/src/i18n/`。原始数据位于仓库根目录及 `categories/`，请在对应文件中更新。

## 数据说明

价格、功能、平台与许可证等原始资料来自各软件官网与开源仓库，采集于 2026-11-12（Asia/Shanghai，UTC+8）。GitHub 星数、最新正式 Release、归档状态与最近推送时间每天自动同步，页面单独展示同步时间。价格、套餐和功能可能随地区、促销和版本变化，请以官网为准。未在可靠来源中确认的字段会留空或标为未知，**请不要编造或改写产品事实**。

构建时会读取：

- `data.json`（录屏、清理等品类）
- `categories/*.json`（其余品类）
- `github-data.json`（自动同步的 GitHub 快照，与原始资料日期分别展示）

`cleaners.csv` 与 `screen-recorders.csv` 是这两类的可选表格副本，构建时不会读取。数据更新后重新构建即可。

## 许可与贡献

本项目采用 [Apache License 2.0](LICENSE)。欢迎贡献：修正展示问题、补充翻译、改进无障碍和样式都可以。新增或修改产品数据时，请附上可核验的来源，并避免写入未证实的价格或功能。
