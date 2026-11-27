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

### 文件备份、同步和影音工具批次

- [deja-dup](https://gitlab.gnome.org/World/deja-dup/-/blob/dab65ba3c2887d98c11a8e6c1b0ac0a6b4629b1a/data/icons/org.gnome.DejaDup.svg)（CC BY-SA 4.0）：采用已经安装的正式 GNOME 图标，SVG 中直接声明作者及许可。
- [pika-backup](https://gitlab.gnome.org/World/pika-backup/-/blob/7f3581950eca0bd56260cdaac3d3a1fe77c3f756/data/app.svg)（CC BY-SA 4.0）：使用 Meson 安装的正式图标，不使用含辅助图形的绘制画板；上游 Source SVG 保留版权及许可元数据。
- [back-in-time](https://github.com/bit-team/backintime/blob/022ec6aec81ad3cf6dc42b7987394ae5160ac1e6/qt/icons/scalable/apps/backintime.svg)（GPL-2.0-or-later）：采用上游桌面应用 SVG，文件单独声明作者及 GPL-2.0-or-later。
- [kopia](https://github.com/kopia/kopia/blob/065be1129eceab2a8ba5ddc46eb2795ef25791db/app/public/logo512.png)（Apache-2.0）：采用 Kopia UI 应用自有标识，非通用浏览器图标。
- [duplicati](https://github.com/duplicati/duplicati/blob/0fe4eba7c017dbca80b38c1fb3c031618bad6ac8/Assets/application%20icon/application_icon.svg)（MIT）：采用普通分发目录中的主程序图标，处于 MIT 条款适用范围，非 proprietary 素材。
- [vorta](https://github.com/borgbase/vorta/blob/e91997c92ca2de88deddda9d256e9cc8cf8f2f89/package/icon.icns)（GPL-3.0）：使用上游 macOS 应用 ICNS，图案与项目 README 的应用标识一致，不使用 Fork Awesome 或 Material Design 内部控件图标。
- [syncthing](https://github.com/syncthing/syncthing/blob/1107b3cd11dbe267a8b80bbe1f89fb86a070b5c3/assets/logo-only.svg)（MPL-2.0）：Debian 构建安装此 SVG，上游维护者确认产品标志与代码同许可；仅标识原软件，不暗示官方关系。
- [flowblade](https://github.com/jliljebl/flowblade/blob/0051e2bb93a96850d7d49238f9ad06561e714960/flowblade-trunk/installdata/io.github.jliljebl.Flowblade.png)（GPL-3.0）：使用与上游桌面启动文件同名的安装图标，不使用批处理工具图标。
- [olive](https://github.com/olive-editor/olive/blob/7e0e94abf6610026aebb9ddce8564c39522fac6e/app/packaging/windows/olive.ico)（GPL-3.0）：使用 Windows 打包主图标，非安装器或 OVE 文档图标。
- [losslesscut](https://github.com/mifi/lossless-cut/blob/a30b05393768002f52a14b02fa8da374471c25a0/src/renderer/src/icon.svg)（GPL-2.0）：上游打包脚本生成 Windows/Linux 应用图标使用的原 SVG。
- [avidemux](https://github.com/mean00/avidemux2/blob/367da14a394cafd258824b2240c0600cdea39f45/avidemux/qt4/ADM_userInterfaces/ADM_gui/pics/avidemux_window_icon_linux.png)（GPL-2.0）：使用 Qt 主窗口程序图标，不使用 jobs 子程序或安装器图片。
- [lmms](https://github.com/LMMS/artwork/blob/4bdcc1421bb84964c150d519d73e1bef4cd9c820/Icon%20%26%20Mimetypes/lmms-64x64.svg)（CC0-1.0）：主项目 README 直接指向此 SVG，采用独立 Artwork 仓库的 CC0，不把程序许可当成素材许可。
- [hydrogen](https://github.com/hydrogen-music/hydrogen/blob/00509be4aae5d4ca64a95428c9f33d08210e4f96/data/img/h2-icon.ico)（GPL-2.0）：采用打包应用可辨识的 H₂ 图标，不使用设置界面内的 MIDI 图标。
- [tenacity](https://codeberg.org/tenacityteam/assets/src/commit/aa50ac96535dd7bda4600092cabf98e0243a07a7/PNG/tenacity-icon-light-256.png)（CC BY 4.0）：采用官方品牌资源仓库中色彩适合浅色背景的正式版独立标识，使用素材 CC BY 而非程序 GPL。
- [dust3d](https://github.com/huxingyi/dust3d/blob/02a0fc749453a389d12bdbce866fa19dde6e77e5/application/dust3d.icns)（MIT）：采用官方 macOS 应用包中的完整项目图标，用于识别 Dust3D。

保持原图比例、颜色和现有界面。上游声明与转换说明随静态资源分发，原稿随站或可从固定版本来源取得。CC BY 与 BY-SA 图标保留图内署名及许可元数据。

### PDF、密码管理与图片上传工具批次

- [stirling-pdf](https://github.com/Stirling-Tools/Stirling-PDF/blob/24bb50dbde0cc83e2a3d970c33f8fd15ae585fe3/frontend/src-tauri/icons/Square107x107Logo.png)（MIT）：采用桌面应用商店包图标，所在目录不在根许可列出的专有例外内。
- [pdfsam](https://github.com/torakiki/pdfsam/blob/a47cd53637eb8e7cfecd4b86a6e755b5fbad4a88/pdfsam-basic/src/msix/Assets/Square150x150Logo.png)（AGPL-3.0）：使用 PDFsam Basic 官方 MSIX 应用图标，非付费版本标识。
- [pdfarranger](https://github.com/pdfarranger/pdfarranger/blob/ee35719b6ee68537c098858e693264e803e82c87/data/icons/hicolor/scalable/apps/com.github.jeromerobert.pdfarranger.svg)（GPL-3.0）：使用桌面应用安装图标，不使用工具栏或第三方主题图标。
- [xournalpp](https://github.com/xournalpp/xournalpp/blob/c9e7786a8a63bbce3a90fad67e8dd07ec138c07d/ui/pixmaps/com.github.xournalpp.xournalpp.svg)（CC BY-SA 4.0）：官方 copyright.txt 明确列出该程序图标、作者及许可。
- [naps2](https://github.com/cyanfish/naps2/blob/f233ffb5437efae8662dd639315cfbfe391e903b/NAPS2.Lib/Icons/favicon.ico)（GPL-2.0-or-later）：虽然名为 favicon.ico，上游 WinForms 工程将该文件指定为桌面程序 ApplicationIcon。
- [pdfcraft](https://github.com/storytold/pdfcraft/blob/d492d88902e3bf723f650b8eaf93958cf8904c56/assets/app-icon/hicolor/scalable/apps/ai.storyteller.pdfcraft.svg)（MIT）：选用项目所有者为 PdfCraft 绘制并在素材级明确开放的应用图标，不使用另有商标使用限制的 ArtCraft 标识。
- [sioyek](https://github.com/ahrm/sioyek/blob/1e2f8037353724a83ccb10a697e28e295383e017/resources/sioyek-icon-linux.png)（GPL-3.0）：使用上游 Linux 应用包标识。
- [zathura](https://github.com/pwmt/zathura/blob/dd6c32f5932f645ac8c4a4563936d0aafcd366b1/data/org.pwmt.zathura.svg)（Zlib）：使用源文件含 SPDX Zlib 声明的项目桌面图标。
- [keeweb](https://github.com/keeweb/keeweb/blob/ad7891de92cf666400a6b4c859eeb731b0f68761/app/icons/android-chrome-192x192.png)（MIT）：采用 Web 应用的完整可安装图标，不使用页面通用小图标。
- [authpass](https://github.com/authpass/authpass/blob/de7422a9f0962e9f522692f0d4cbf1dda8a73f2d/_docs/authpass-logo.svg)（GPL-3.0）：采用 AuthPass 仓库项目文档中的专用作品标识。
- [keepassxc](https://github.com/keepassxreboot/keepassxc/blob/cd42236540c1cfca332c0f051d981acfdacf7b4e/share/icons/application/scalable/apps/keepassxc.svg)（LGPL-2（上游标注））：采用上游 COPYING 明确列出的应用 SVG，保留 LGPL-2 原标注和作者。
- [aegis](https://github.com/beemdevelopment/Aegis/blob/182e91f524dea300c8e7e8a5bc9e3a9f4e45721e/app/src/main/res/drawable/app_icon.png)（GPL-3.0）：只使用 Aegis 应用资源中的本体图标，不使用内置服务图标。
- [upic](https://github.com/gee1k/uPic/blob/5d6b01949823223255acbec4bde94ec53a2669ed/uPic/uPic.icon/Assets/Frame%202.png)（Apache-2.0）：采用 Xcode 配置引用的 uPic 原生图标图层，非系统合成的完整图标和第三方上传服务标识。

保持原图比例、颜色和现有界面。上游声明与转换说明随静态资源分发，原稿随站或可从固定版本来源取得。CC BY 与 BY-SA 图标保留图内署名及许可元数据。

### 网页归档、设计、写作与图像工具批次

- [monolith](https://github.com/Y2Z/monolith/blob/26de8a664452c0ec0323892ab7f3ee1a9bb31830/assets/icon/icon-128.png)（0BSD）：采用项目在资产目录提供的完整 128px Monolith 标识，不使用下载网站的通用图标。
- [singlefile](https://github.com/gildas-lormeau/SingleFile/blob/6367ef41bab2c789a696acc4774dd3ac8ce10198/src/ui/resources/icon_128.png)（AGPL-3.0-or-later）：浏览器扩展 manifest 直接指定的正式 128px 图标，不使用保存进度动画帧。
- [vectorcraft](https://github.com/storytold/vectorcraft/blob/02c80000d3cd8512d725170cc4459a53ec425df0/assets/app-icon/hicolor/128x128/apps/ai.storyteller.vectorcraft.png)（MIT）：使用素材许可明确覆盖的正式应用图标，非 ArtCraft 品牌标识。
- [figcraft](https://github.com/storytold/figcraft/blob/f6638e15bf7f5561d57f15043a25c5692dc72747/assets/app-icon/hicolor/128x128/apps/ai.storyteller.figcraft.png)（MIT）：使用素材许可明确覆盖的正式应用图标，非 Nightly 或 ArtCraft 品牌标识。
- [designcraft](https://github.com/storytold/designcraft/blob/b86e6236e46241ba0723406120dbb0e7e09dafab/assets/app-icon/hicolor/128x128/apps/ai.storyteller.designcraft.png)（MIT）：使用素材许可明确覆盖的正式应用图标，非 Nightly 或 ArtCraft 品牌标识。
- [focuswriter](https://github.com/gottcode/focuswriter/blob/f130812777fd1704020b92b02317b36ce720200c/resources/images/icons/hicolor/scalable/apps/focuswriter.svg)（GPL-3.0）：使用 SVG 元数据中明确署名 Graeme Gott 和 GPL-3.0 的桌面安装图标。
- [manuskript](https://github.com/olivierkes/manuskript/blob/83ea0707bf9fb50558062900b53dd79779aac73a/icons/Manuskript/icon-128px.png)（GPL-3.0）：采用项目独立应用图标，不使用拼写插件或横向名称图。
- [lightcraft](https://github.com/storytold/lightcraft/blob/5973d956dfbb44ed96b83e53edcc04733f3f1ceb/assets/app-icon/hicolor/128x128/apps/ai.storyteller.lightcraft.png)（MIT）：使用素材许可明确覆盖的正式应用图标，非 Nightly 或 ArtCraft 品牌标识。
- [photocraft](https://github.com/storytold/photocraft/blob/702da02787db0e1daeb4502c2cb355cd08a7bb2d/assets/app-icon/hicolor/128x128/apps/ai.storyteller.photocraft.png)（MIT）：使用素材许可明确覆盖的正式应用图标，非 Nightly 或 ArtCraft 品牌标识。
- [pinta](https://github.com/PintaProject/Pinta/blob/b7f527a3d5f716b4f81903c39d5ea02579a5bd3b/Pinta.Resources/icons/hicolor/scalable/apps/com.github.PintaProject.Pinta.svg)（CC BY-SA 2.0）：用 Pinta 正式安装的应用图标，其 SVG 元数据单独注明 Jakub Steiner 与 CC BY-SA 2.0。
- [pixelitor](https://github.com/lbalazscs/Pixelitor/blob/debde893ef3ade2ec68579d18aefd641cbb2ddd6/src/main/resources/images/pixelitor_icon256.png)（GPL-3.0）：使用应用资源中的 256px Pixelitor 图标，不使用浏览器 favicon 或节目演示 Logo。
- [lazpaint](https://github.com/bgrabitmap/lazpaint/blob/0d4498315527345ae10b8722046e5134045ac8f4/resources/icon/128x128.png)（GPL-3.0）：采用上游应用打包的 128px 图标，非工具栏图像。
- [mypaint](https://github.com/mypaint/mypaint/blob/fb6f7d6b12238d125294496b105f5f36e658bc61/desktop/icons/hicolor/scalable/apps/org.mypaint.MyPaint.svg)（Public domain）：采用桌面应用图标，Licenses.dep5 将对应目录的素材标明为版权人释放到公有领域。
- [pixelorama](https://github.com/Orama-Interactive/Pixelorama/blob/9d8823a7bb1ddaf5ea23fe0c4bc640de770cea7a/assets/graphics/icons/icon.png)（MIT）：采用 Pixelorama 项目默认应用图标，不使用 Godot 项目或样例笔刷标志。

保持原图比例、颜色和现有界面。上游声明与转换说明随静态资源分发，原稿随站或可从固定版本来源取得。CC BY 与 BY-SA 图标保留图内署名及许可元数据。
