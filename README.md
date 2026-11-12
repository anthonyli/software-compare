# Compare / 软件对比

对照价格、免费限制与功能，选出适合你的桌面工具。

Compare desktop software on price, free-tier limits, and features.

## 这是什么

Compare（软件对比）是一个静态对照站，用来比较常用电脑软件的价格、免费档限制、平台和功能差异，覆盖办公、影音、文件、系统、安全和开发工具。站点品牌标志是字母 C 的组合标志与 Compare 字标，中文产品名为「软件对比」。

本仓库用 Astro 在构建时读取数据，生成纯静态页面，不需要服务器或数据库。源代码与数据发布在 https://github.com/anthonyli/software-compare 。

## 本地运行

```bash
cd site
npm install
npm run dev
```

其他命令：`npm run build` 输出到 `site/dist/`，`npm run preview` 预览构建结果。

站点名称、分组和展示用文案在 `site/src/config.ts` 与 `site/src/i18n/`。不要在 `site/` 里改原始数据文件。

## 数据说明

数据来自各软件官网与 GitHub 等开源仓库，采集于 2026-11-12（Asia/Shanghai，UTC+8）。价格、套餐和功能可能随地区、促销和版本变化，请以官网为准。未在可靠来源中确认的字段会留空或标为未知，**请不要编造或改写产品事实**。

构建时会读取：

- `data.json`（录屏、清理等品类）
- `categories/*.json`（其余品类）

`cleaners.csv` 与 `screen-recorders.csv` 是这两类的可选表格副本，构建时不会读取。数据更新后重新构建即可。

## 许可与贡献

本项目采用 [Apache License 2.0](LICENSE)。欢迎贡献：修正展示问题、补充翻译、改进无障碍和样式都可以。新增或修改产品数据时，请附上可核验的来源，并避免写入未证实的价格或功能。

---

## What this is

Compare (软件对比) is a static site for comparing desktop software on price, free-tier limits, platforms, and features. It covers productivity, media, file, system, security, and developer tools. The brand mark is a letter-C monogram with the Compare wordmark; the Chinese product name is 软件对比.

The site is generated at build time with Astro from the data files in this repository. No server or database is required. Source and data are published at https://github.com/anthonyli/software-compare.

## Running locally

```bash
cd site
npm install
npm run dev
```

Use `npm run build` to write `site/dist/`, and `npm run preview` to preview the build.

Site name, category groups, and UI copy live in `site/src/config.ts` and `site/src/i18n/`. Do not edit the raw data files from inside `site/`.

## Data sources

Facts are taken from official product sites and GitHub (and other upstream source hosts), collected on 2026-11-12 (Asia/Shanghai, UTC+8). Prices, plans, and features can change by region, promotion, and version — official sites are authoritative. Fields that could not be confirmed are left blank or marked unknown. **Do not invent or rewrite product facts.**

The build reads:

- `data.json` (screen recorders, cleaners, and similar)
- `categories/*.json` (the remaining categories)

`cleaners.csv` and `screen-recorders.csv` are optional tabular copies of those two categories. The build does not read them. Rebuild after data updates.

## License and contributions

This project is licensed under the [Apache License 2.0](LICENSE). Contributions are welcome: display fixes, translations, accessibility, and design improvements are all appreciated. When adding or changing product data, include a verifiable source and do not add unconfirmed prices or features.
