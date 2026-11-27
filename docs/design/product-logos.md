# 产品 Logo

产品 Logo 显示在桌面分类对比表、移动端分类卡片和产品详情。站点品牌与分类封面独立。未找到可信的图标时只展示产品名的首字，不计为已收录 Logo。

- 用 catalog 产品 ID 作为主键，同一产品跨分类沿用同一图标。
- 优先使用官方应用图标、项目资产或官方品牌资源。多个产品共用网站时，不把网站 favicon 当成独立产品图标。官方项目页面明确引用的专用 favicon 可用；存在版权或品牌限制时按来源规则处理，不推断项目开源许可涵盖商标。
- 把经核对的 HTTPS 来源写入 `site/src/lib/product-logo-sources.json`。对应资源放在 `site/public/product-logos/<id>.webp`，透明背景优先，长边不超过 96 像素，单个文件不超过 24 KiB。展示时仅请求同站文件，不热链厂商网站或另接图标服务。
- 核对 24px 附近是否仍可识别，不拉伸源图。占位不冒充官方图标；可跟踪未核实的项，分批补齐。
- 分类和详情已有可读的产品名称，图标对辅助技术标记为装饰，不重复朗读。首屏详情图使用显式尺寸，列表资源延迟加载。

首批收录 8 个 RSS 阅读器。入口和素材校验见 `site/tests/product-logos.test.mjs` 和 `site/tests/browser/product-logos.spec.ts`。

第二批：Brave、Dia、ego lite、Helium，从各自官网的品牌页、专用产品站或产品应用图标获取。先有产品条目、后补 Logo 是正常流程；回归测试验证已发布的批次和资源完整性，不要求新条目已有官方图标。

图标可使用经官方产品标识复核的公开目录素材。下载地址留在素材表供维护核对；列表和产品页只显示图标，不额外挂来源标签。需要页面署名的素材先跳过或找符合展示要求的版本。

Kaku 与 Itsycal 使用上游仓库的应用图标。乔木目录中的同名图标已比对，最终使用上游原图而非目录副本，仅转换为小体积 WebP。上游许可随静态资产保存在 `site/public/licenses/product-logos/`，不在列表或详情另加提示。

Zed 采用[官方品牌页](https://zed.dev/brand)提供的稳定版应用图标，保持颜色和比例，用于标识该产品，不暗示官方合作或背书。

WezTerm 使用作者维护的[上游应用图标](https://github.com/wezterm/wezterm/blob/b1bc74d31ffb9f3869923e10029a5cf986d28982/assets/icon/terminal.png)，也是[项目打包所用图标](https://github.com/wezterm/wezterm/discussions/2396)。仅等比例转为 WebP，用于软件名称旁的识别图标，不暗示背书。上游 MIT 版权许可随对应静态资产分发。

ksnip 使用 v1.9.2 [Snap 打包清单](https://github.com/ksnip/ksnip/blob/c7ca5ad91253c948e2df67b0c7b2f7e2cc577de0/snap/snapcraft.yaml) 指定的应用图标（非工具栏单色图标）。仅转成 96 px WebP；同站的 `/licenses/product-logos/` 保留上游 SVG、许可原文、版权与转换说明。该版本的打包版权文件注明 GPL-2.0-or-later。

NormCap 使用[上游 Flatpak 打包应用图标](https://github.com/dynobo/normcap/blob/acaccb7604d548a56d80a91209647026ec1a9165/bundle/flatpak/com.github.dynobo.normcap.svg)，与该版本官方文档图标一致。仅等比例转成 96 px WebP；上游 SVG、版权和 GPL-3.0-or-later 许可说明随静态资产分发。

截图工具：CleanShot X 使用 [官方媒体包](https://cleanshot.com/contact)内的 `CleanShot Press Kit/logo/logo.svg`（SHA-256 `05d6fca46a34dd94fe59399a46ba19c4cd8075488a181c13a22c28ec45a9e169`），只等比例转换，用于指认产品，不暗示合作或背书。Satty 使用 [MPL-2.0 项目的打包图标](https://github.com/Satty-org/Satty/blob/395395dca481465c7a467aacccc87d8a1209225b/assets/satty.svg)；Snow Shot 使用 [GPL-3.0-or-later 子项目的应用图标](https://github.com/mg-chao/snow-apps/blob/ea4f48680b6613b40ef8ec7dff22313f326b8159/snow_shot/resources/app-icon.svg)，与同一提交的 Windows 安装图标核对一致。两款均只等比例转换；原始 SVG、许可与转换说明随静态资产分发。

启动器：Tinycast 使用 [官方 README 所示的应用 PNG](https://github.com/abue-ammar/tinycast/blob/c2690533874e22df6bef89e8288b2e4e246bc258/docs/images/icon.png)，保留原图及 AGPL 通知；Ueli 使用 [Electron 打包图标](https://github.com/oliverschwendener/ueli/blob/5ccca7addbd9bc3ee6e6bc5c738a0ba6989f554f/build/icons/512x512.png)，保留 MIT 版权与许可。两款均只等比例转换。

笔记批次：妙言与 MarkText 使用各自官方开源项目 README 显示的标识，不使用商店版素材或软件目录转存。妙言采用 [Mac 开源项目标识](https://github.com/tw93/MiaoYan/blob/123df4e3842138c9d469a3aa2507eb08b2e5ad42/Resources/app.icon/Assets/43.png)，不是系统合成的完整 macOS App 图标。MarkText 使用 [项目标识](https://github.com/marktext/marktext/blob/95a14e5c9b3049c465eeb8b01ac94bb7678cc845/docs/assets/logo-small.png)。二者仅等比例转为 WebP，上游 MIT 版权与许可随静态资产分发。

启动器批次：Flow Launcher 使用 v2.1.4 的官方 [PNG](https://github.com/Flow-Launcher/Flow.Launcher/blob/9fe822b398ad9541a1a35fb1c688a006a27f2f9d/Artworks/Logo/logo512.png)，保留 MIT 许可与 Flow-Launcher、Wox 的版权通知。Ulauncher 使用 5.16.1 [打包应用图标](https://github.com/Ulauncher/Ulauncher/blob/d05fbe3b58e7ef7b8c2268231cff749f64523bb8/data/media/icons/hicolor/ulauncher.svg)，转换不加载外部 DTD，静态分发保留原始 SVG、转换说明、版权及 GPL 许可。

笔记与启动器第三批：[QOwnNotes](https://github.com/pbek/QOwnNotes/blob/361ca4d95d4036615dff56e416d27860991f85c9/icons/icon.svg)：应用图标 SVG 的元数据独立声明 GPL-3.0 并署名 Alessandro Longo，不能套用仓库的 GPL-2.0 许可。；[CherryTree](https://github.com/giuspen/cherrytree/blob/c739e7f0b9913f84219527709de98ed6183a161d/icons/cherrytree.svg)：采用上游 CMake 安装的应用图标，保留上游 GPL-3.0-or-later 声明。；[Rofi](https://github.com/davatorium/rofi/blob/171c7d79c461756f4c8abce0b4755baafab49c64/data/rofi.svg)：采用上游桌面程序图标，随图保留项目 MIT/X11 版权通知。 原始 SVG 与许可随同站资产分发，只等比例转为 96 px WebP。

截图工具与笔记：Flameshot 使用[官方项目 SVG](https://github.com/flameshot-org/flameshot/blob/dcc3bd3175495e04832c4aac0868f1dd15aba2ca/data/img/app/flameshot.svg)，原作者 lupoDharkael 见 [Debian 版权记录](https://sources.debian.org/src/flameshot/12.1.0%2Bds-2/debian/copyright/#L24)，将作者、原稿及 Free Art License 1.3 写入素材元数据和独立许可文件。Zim 使用 [0.77.2 打包应用图标](https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/51937eb4afce1047e445b605289810cc39fd176c/icons/zim48.svg)；Trilium Notes 使用 [v0.107.0 客户端图标](https://github.com/TriliumNext/Trilium/blob/d83d7151f1c6d4292be88d8d34008f409b252f7f/apps/client/src/assets/icon.svg)，与该版本的桌面包标识一致，保留设计者 Sarah Hussein 的署名和 AGPL 许可。原始 SVG 及许可随静态素材分发。

设计与剪辑：GIMP 采用[官方引用页](https://www.gimp.org/about/linking.html#wilber-the-gimp-mascot)所指向的 Wilber（Aryeom Han，CC BY-SA 4.0，原稿 SHA-256 `f16e91ac7ad855e30e5bf7b14eb734ece683ea65c743fb5ccdb7514aa2f549c6`），保留原稿、独立许可和图内归属元数据；Kdenlive 采用 [上游应用 SVG](https://github.com/KDE/kdenlive/blob/a5eba1730ac524c83b64715d1da10b158d7dbef7/data/icons/sc-apps-kdenlive.svg)，按该版本 [REUSE 声明](https://github.com/KDE/kdenlive/blob/a5eba1730ac524c83b64715d1da10b158d7dbef7/REUSE.toml)保留版权与 LGPL 通知；Krita 采用[官方媒体包](https://krita.org/en/about/press/)内 `press/1024-apps-krita.png`（SHA-256 `ed460a515eada0e991f223c7b72c984fb7faa912250a224ba08a27bec8416ddd`），按[名称与标识使用规则](https://krita.org/en/posts/2013/krita-trademark-policy/)仅指认原版软件；Shotcut 采用[官方媒体包](https://shotcut.org/media/)的 512px 无字应用图标（SHA-256 `47f5cc105a14c7c793c2502080640370646215f84278e3b1d01c7d97780178d4`）。图标保持原色和比例，不暗示合作或背书。

### 开发工具批次（数据库、API、编辑器）

- DBX：[Apache-2.0 来源素材](https://github.com/t8y2/dbx/blob/b2fae8d501ceed1579cb048981b3a87f6211c572/src-tauri/icons/128x128.png)。
- Antares SQL：[MIT 来源素材](https://github.com/antares-sql/antares/blob/1a9ccc7ba957cc435ad4beb86b56c1f19c2c830e/assets/linux/128x128.png)。
- Sequel Ace：[MIT 来源素材](https://github.com/Sequel-Ace/Sequel-Ace/blob/412173edf913e4cbf3b144a3987ae71992fd1a2d/Resources/Images.xcassets/AppIcon.appiconset/icon_128x128.png)。
- Bruno：[CC BY-SA 4.0 来源素材](https://github.com/usebruno/bruno/blob/14d5a00db60758bc931fc9271a993d46b6de4ad6/packages/bruno-electron/resources/icons/png/128x128.png)。
- Hoppscotch：[MIT 来源素材](https://github.com/hoppscotch/hoppscotch/blob/6177eae1875ea4cc8fc46604d65bf85478912d85/packages/hoppscotch-desktop/src-tauri/icons/icon.png)。
- Hurl：[Apache-2.0 来源素材](https://github.com/Orange-OpenSource/hurl/blob/08733868e9225cb2fc59b88ddeb107cf715d0ff1/bin/windows/logo.png)。
- VSCodium：[MIT 来源素材](https://github.com/VSCodium/vscodium/blob/ca7f7b44b5e5c3faa663f6cdc043998f71936653/icons/stable/codium_cnl.svg)。
- Helix：[MPL-2.0 来源素材](https://github.com/helix-editor/helix/blob/1a3fdfda6dfdda4567af6093a6249bb2bb422fc6/logo.svg)。
- Lapce：[Apache-2.0 来源素材](https://github.com/lapce/lapce/blob/9e8317c84e9540ac0b09689dd9f9d4fafe44ac00/extra/images/logo.svg)。
- micro：[MIT 来源素材](https://github.com/micro-editor/micro/blob/0e01c1a432ef3d0851b430cbdfdd75da452e99c1/assets/micro-logo-mark.svg)。
- Geany：[GPL 来源素材](https://github.com/geany/geany/blob/0e02cc52a7634d1fed8511bd44730ea0ab791d9f/icons/scalable/geany.svg)。
- Lite XL：[MIT 来源素材](https://github.com/lite-xl/lite-xl/blob/27093a73dcc9382c866a6b1b1ead77fb20ff980a/resources/icons/lite-xl.svg)。

仅使用同站图标；每项上游来源、转换说明与适用许可见素材清单和随附通知。Bruno 的 WebP 保留 OpenMoji / Bruno 来源、转换说明和 CC BY-SA 4.0 元数据。

### 下载、压缩、剪贴板和编辑工具批次

- [motrix](https://github.com/agalwood/Motrix/blob/d488364d26adbfaad60f1545b0db23dc7100ceae/public/app-icon.png)（MIT）：上游 README 使用的产品应用标识。
- [gopeed](https://github.com/GopeedLab/gopeed/blob/82ca3ea0147978aa3b06762efb763d9974c97992/ui/flutter/assets/icon/icon_512.png)（GPL-3.0）：采用 Flutter 产品自身的彩色应用图标，不使用独立的 agent 图标。
- [ab-download-manager](https://github.com/amir1376/ab-download-manager/blob/f15b691c8606774653a49ee65562146e4102320d/desktop/app/icons/icon.png)（Apache-2.0）：采用桌面安装包配置中的应用图标，用于识别原产品，不表示背书。
- [persepolis](https://github.com/persepolisdm/persepolis/blob/109e95261fa2827bf7bf1b24173328d90235a53e/resources/com.github.persepolisdm.persepolis.svg)（GPL-3.0）：使用项目安装的 reverse-DNS 桌面应用 SVG，不使用系统托盘图标。
- [peazip](https://github.com/peazip/PeaZip/blob/ded9d2d94100969a48c8ccfe934c4b6e358b697f/peazip-sources/dev/peazip.ico)（LGPL-3.0）：采用项目开发资源中的 PeaZip 程序 ICO，不使用档案格式关联图标。
- [ark](https://github.com/KDE/ark/blob/1e4ce458a1170b962f455102e11ec89578ea871b/app/icons/sc-apps-ark.svg)（LGPL-3.0-only）：上游 app/icons/ 版图，适用 REUSE.toml 明示的文件级许可。保留 Oxygen 版权通知。
- [file-roller](https://github.com/GNOME/file-roller/blob/ce1e6579b5e8885aee6f865b892eda4cfec7b2ca/data/icons/hicolor/scalable/apps/org.gnome.FileRoller.svg)（CC BY-SA 4.0）：采用正式版应用 SVG，文件内包含 GNOME Design Team 及 CC BY-SA 4.0 声明。
- [copyq](https://github.com/hluk/CopyQ/blob/1975a4d19086f3501ceeb5e531da509dc6b7ef99/src/images/icon.svg)（GPL-3.0）：采用项目应用资源中的独立彩色 SVG。
- [ditto](https://github.com/sabrogden/Ditto/blob/a80fd3536bc407cac8cce43b5682022282ace983/res/Ditto2.ico)（GPL-3.0）：CP_Main.rc 将 Ditto2.ico 注册为 IDR_MAINFRAME，非旧版 Ditto.ico 或不同状态的托盘图。
- [emacs](https://github.com/emacs-mirror/emacs/blob/636f166cfc86aa90d63f592fd99f3fdd9ef95ebd/etc/images/icons/hicolor/scalable/apps/emacs.svg)（GPL-3.0-or-later）：正式标签应用 SVG 和同目录 artwork README 都直接声明作者及许可。
- [kate](https://github.com/KDE/kate/blob/6d59387789f1a3d57cb9b93e23138606381be36e/apps/kate/icons/unix/sc-apps-kate.svg)（LGPL-3.0-or-later）：正式标签安装用 SVG 与 KDE Breeze 的 icons/apps/48/kate.svg 字节一致，适用 Breeze 文件级 artwork license。
- [neovim](https://neovim.io/logos/neovim-logos.zip)（CC BY 3.0）：官方品牌 ZIP 中的 neovim-mark.svg，全色独立标识，不使用横向文字标识。
- [pulsar](https://github.com/pulsar-edit/pulsar/blob/91b5956469f54f79429323a6b01a5d84e5e7f8ef/resources/app-icons/beta.svg)（MIT）：正式版本的 electron-builder 脚本使用资源文件 beta.svg，尽管文件名如此，它仍是正式包应用图标。

保持原图比例、颜色和现有界面。上游声明与转换说明随静态资源分发，原稿随站或可从固定版本来源取得；Neovim 和 File Roller 的转换图同时保留署名与许可元数据。
