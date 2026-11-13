# Compare

[简体中文](README.md) | **English**

[Live site](https://compare.pageon.cc)

Compare desktop software on price, free-tier limits, and features.

## What this is

Compare (软件对比) is a static site for comparing desktop software on price, free-tier limits, platforms, and features. It covers productivity, media, file, system, security, and developer tools. The brand mark is a letter-C monogram with the Compare wordmark; the Chinese product name is 软件对比.

The site is generated at build time with Astro. Anonymous likes and community ranking use Cloudflare Pages Functions and D1. GitHub Actions refreshes GitHub metadata daily; official-site facts are not automatically updated. Source code and data are available in the [GitHub repository](https://github.com/anthonyli/software-compare).

## Running locally

Requires Node.js 22 and npm.

```bash
cd site
npm ci
npm run dev
```

The complete local site runs at `http://localhost:8787`, including the local votes database and API. Use `npm run build` to write `site/dist/`; `npm run preview` serves static files only. See [deployment instructions (Chinese)](site/README.md) for configuration and tests.

Site name, category groups, and UI copy live in `site/src/config.ts` and `site/src/i18n/`. Update raw data in the corresponding files at the repository root or in `categories/`.

## Data sources

The original pricing, feature, platform, and license information was collected from official product sites and upstream repositories on 2026-11-12 (Asia/Shanghai, UTC+8). GitHub stars, latest stable releases, archive status, and latest push times are refreshed daily, with separate sync timestamps shown on the site. Prices, plans, and features can change by region, promotion, and version — official sites are authoritative. Fields that could not be confirmed are left blank or marked unknown. **Do not invent or rewrite product facts.**

The build reads:

- `data.json` (screen recorders, cleaners, and similar)
- `categories/*.json` (the remaining categories)
- `github-data.json` (automatically refreshed GitHub metadata with separate timestamps)

`cleaners.csv` and `screen-recorders.csv` are optional tabular copies of those two categories. The build does not read them. Rebuild after data updates.

## License and contributions

This project is licensed under the [Apache License 2.0](LICENSE). Contributions are welcome: display fixes, translations, accessibility, and design improvements are all appreciated. When adding or changing product data, include a verifiable source and do not add unconfirmed prices or features.
