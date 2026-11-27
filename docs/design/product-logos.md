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

### 远程桌面、开发框架和笔记工具批次

- [moonlight](https://github.com/moonlight-stream/moonlight-qt/blob/de2467e433821664cdd2224aad8c89a625be1ad9/app/res/moonlight.svg)（GPL-3.0）：上游 v6.2.0 的 app.pro 安装此 PC 客户端图标，不使用移动版或第三方客户端图标。
- [tigervnc](https://commons.wikimedia.org/wiki/File:TigerVNC_logo.svg)（GPL-2.0-or-later）：采用创作者直接发布的 GPL 源图，与当前官方桌面程序和官网标识逐图比对一致。
- [detox](https://github.com/wix/Detox/blob/667efcb6e7dda59b390f1707ceeb546414869a97/website/static/img/logo.png)（MIT）：官方项目主页使用的 Detox 机器人头像，不使用 Wix 公司标志或示例应用标志。
- [ratatui](https://github.com/ratatui/ratatui/blob/87417f360e497cad3fe517a6013675ca81d9c295/assets/logo-simple.svg)（MIT）：采用上游已有的小尺寸专用简版，不自行裁剪字标。
- [terminal-gui](https://github.com/tui-cs/Terminal.Gui/blob/abb61ab115ff82074a4687c6098dd1082ae17ea6/docfx/images/logo.png)（MIT）：采用官方文档的 Terminal.Gui 产品标志，而非 .NET 品牌标志。
- [spectre-console](https://github.com/spectreconsole/spectre.console/blob/04b5dac6398dce0838c48cc3a3b6d1cc8a7f1747/resources/nuget/logo.png)（MIT）：采用上游 NuGet 包的正式项目标志。
- [click](https://github.com/pallets/click/blob/08b803cf32ceb2ae6a772c62d5da42757a897d44/docs/_static/click-logo.svg)（BSD-3-Clause）：采用上游文档自有 Click 标识；生成位图时不解析外部 DTD，保留原 SVG。
- [typer](https://github.com/fastapi/typer/blob/6d6383fca42f7f451cc04c49b7bf828e18245a53/docs/img/icon-square.svg)（MIT）：采用 Typer 项目正式方形标志，非 FastAPI 或 Click 标志。
- [cyclopts](https://github.com/BrianPugh/cyclopts/blob/30ba0e6e2957c50f6cce8cbd5928f585d45c8ec1/assets/logo.png)（Apache-2.0）：采用上游项目标志本体，不使用 README 字标或通用网站图标。
- [logseq](https://github.com/logseq/logseq/blob/c09c65d0093531047a670a92917d9a5be83b609b/resources/img/logo.png)（AGPL-3.0）：采用项目自身资源中的当前 Logo，非论坛提案或第三方图标。
- [appflowy](https://github.com/AppFlowy-IO/AppFlowy/blob/8fcee27d9bd93aad4ee0191d5d8d915d6a9a4e93/frontend/appflowy_flutter/assets/images/flowy_logo.svg)（AGPL-3.0）：采用 AppFlowy 客户端的独立产品标识，不使用企业版字标。
- [siyuan](https://github.com/siyuan-note/siyuan/blob/c901a60323f3ad22867145f16ace0cface627b5a/app/appx/assets/Square150x150Logo.targetsize-150_altform-unplated.png)（AGPL-3.0）：采用思源 Windows 应用打包资源内的正式标志。
- [notesnook](https://github.com/streetwriters/notesnook/blob/18c27502454c5ea2f408098124a2e51245fac7c3/apps/desktop/assets/icons/256x256.png)（GPL-3.0）：采用官方桌面分发图标，不使用开机图或应用内服务图标。

保持原图比例、颜色和现有界面。上游声明与转换说明随静态资源分发，原稿随站或可从固定版本来源取得。

### 动画、转录、CAD 与媒体工具批次

- [anicraft](https://github.com/storytold/anicraft/blob/259566a0338706a8545b4bc19506ef49c1fbab71/assets/app-icon/hicolor/128x128/apps/ai.storyteller.anicraft.png)（MIT）：应用图标目录的单独声明许可原画及其 hicolor 衍生资源使用 MIT 或 Apache-2.0；采用发行图标。
- [effectcraft](https://github.com/storytold/effectcraft/blob/bfe6878d6535573401aebd0217221afcda85ecc6/assets/app-icon/hicolor/128x128/apps/ai.storyteller.effectcraft.png)（MIT）：应用图标目录的单独声明涵盖发行图标；不使用另有限制的 ArtCraft 品牌素材。
- [buzz](https://github.com/chidiwilliams/buzz/blob/e4f79345d9f8d6c1df1f340216e4f4679cdedbd5/buzz/assets/buzz-icon-1024.png)（MIT）：采用上游桌面应用项目自身的 Buzz 图标。
- [vibe](https://github.com/thewh1teagle/vibe/blob/8de9b2181c4c65f8c06e68732d5352c91ea27436/design/logo.svg)（MIT）：采用上游 design 中与 README 标明的 Vibe 产品标识对应的矢量原稿。
- [subtitle-edit](https://github.com/SubtitleEdit/subtitleedit/blob/83a6c339bd69395cee487675657bd6d0834dc711/installer/macBundle/SE_icon_source.svg)（MIT）：采用上游 Mac 安装包的应用矢量原稿，不使用通用字幕文件格式图标。
- [noscribe](https://github.com/kaixxx/noScribe/blob/1e146c3bd8a00218fdda3fea090a1c79a62faab3/img/noScribeLogo.png)（GPL-3.0-or-later）：使用上游 noScribeLogo；README 明示 GPL 第 3 版或以后版本。
- [opentoonz](https://github.com/opentoonz/opentoonz/blob/7ccd773ee646e99debd14917436550c5c3b94655/toonz/sources/toonz/OpenToonz.icns)（BSD-3-Clause）：采用 OpenToonz 应用打包图标；项目许可声明涵盖此打包目录。
- [pencil2d](https://github.com/pencil2d/pencil/blob/7d1f719669526b71b6b66916cb50a72fbf95a3bd/app/data/icons/icon.png)（GPL-2.0）：采用 Pencil2D 客户端中的应用图标，而不是工程文件图标或网站徽标。
- [tahoma2d](https://github.com/tahoma2d/tahoma2d/blob/0ca33cb8af95d8b1648889d336e50e23dd9cfb2b/toonz/sources/xdg-data/tahoma2d_logo_128.png)（BSD-3-Clause）：采用上游 XDG 应用标志；项目许可声明涵盖此目录。
- [glaxnimate](https://github.com/KDE/glaxnimate/blob/0b3899ad164c33b4699252ec10cc297ee552a49b/data/logo/logo.svg)（CC-BY-SA-4.0）：采用上游 Glaxnimate 图形标志；REUSE.toml 对 data 内的 SVG 明确声明 CC BY-SA 4.0。
- [librecad](https://github.com/LibreCAD/LibreCAD/blob/b91fbdcf1adeee764938a183018978416d0a8c90/desktop/media/icons/librecad_icon.svg)（CC-BY-SA-3.0）：采用上游独立应用图标，SVG RDF 元数据明确标明作者及独立 CC BY-SA 3.0 许可。
- [solvespace](https://github.com/solvespace/solvespace/blob/5553e843a9c33f79aca175f329c9c0d38d85bd11/res/freedesktop/solvespace-scalable.svg)（GPL-3.0）：采用上游 README 使用且供桌面安装的 SolveSpace 原图。
- [freac](https://github.com/enzo1982/freac/blob/529fa3a0923a063127e117633057071ae4fb3ace/icons/freac.svg)（GPL-2.0）：采用上游 fre:ac 独立产品矢量图标，不是捐助或第三方服务图标。
- [natron](https://github.com/NatronGitHub/Natron/blob/fd29d5037709c7402db80ab9354b1eb3b682fdd4/Gui/Resources/Images/natronIcon256_windows.ico)（GPL-2.0）：采用上游 Windows 正式应用图标，而非工程文件图标。
- [speech-note](https://github.com/mkiol/dsnote/blob/0f93c30f7460da9892e2802523ef4bd98537539b/desktop/icons/dsnote.svg)（MPL-2.0）：采用 Speech Note 的桌面应用矢量图标，不是托盘、模型或第三方图标。

保持原图比例、颜色和现有界面。上游声明与转换说明随静态资源分发，原稿随站或可从固定版本来源取得。

### 启动器、录屏、数据库和运动工具批次

- [materialcraft](https://github.com/storytold/materialcraft/blob/e7ec9cb6bd9789514ac5889f07f9e70df7bd35c5/assets/app-icon/hicolor/128x128/apps/ai.storyteller.materialcraft.png)（MIT）：产品图标目录明确允许此发行图标按 MIT 或 Apache-2.0 使用，不使用 ArtCraft 品牌标志。
- [gpxsee](https://github.com/tumic0/GPXSee/blob/a62907670c005e80a8b8e66c8735a748b55d85af/icons/app/hicolor/scalable/apps/gpxsee.svg)（GPL-3.0-only）：采用上游 Hicolor 应用图标，不使用项目注明独立授权的工具栏主题或文件类型图标。
- [kap](https://github.com/wulkano/Kap/blob/c42692fa63ac71ed192e01684beb78a1b864aa88/renderer/public/static/kap-icon.png)（MIT）：采用上游桌面程序资源内的 Kap 应用图标。
- [kooha](https://github.com/SeaDve/Kooha/blob/f25e284045460c8de5032a4efdbc30a66a80f651/data/icons/io.github.seadve.Kooha.svg)（GPL-3.0-or-later）：采用 README 展示的正常应用图标，不使用开发版或 symbolic 图标。
- [qtractor](https://github.com/rncbc/qtractor/blob/b548099d3412f3139cbc72c9db54887cd0132b07/src/images/qtractor.svg)（GPL-2.0-or-later）：采用上游桌面应用资源专用标志，而非轨道、插件或会话格式的图标。
- [material-maker](https://github.com/RodZill4/Material-Maker/blob/7d6daae3c74c09720afe4138ce09699ab3591ce1/icon.ico)（MIT）：项目声明未另有说明的文件采用 MIT，使用根目录应用图标。
- [wox](https://github.com/Wox-launcher/Wox/blob/69faef0fa93d361fbfc651b5ba7bd67e5e5c22b9/assets/app.ico)（GPL-3.0）：采用上游应用发行资源的正式 Wox 标志。
- [db-browser-sqlite](https://github.com/sqlitebrowser/sqlitebrowser/blob/2206215d21123c09a4a6c24d9332ce5d051379a8/images/logo.svg)（MPL-2.0）：采用上游正式应用 Logo，README 记录该图基于公共域 Tango 图标，由 John T. Haller 创作。
- [gopass](https://github.com/gopasspw/gopass/blob/a4082fade9a7d7b051b3f7a3441923c7c580f6c3/docs/logo.png)（MIT）：采用上游 docs 的项目图形标志，不用第三方同名项目或网站图标。
- [padloc](https://github.com/padloc/padloc/blob/d19096ce90c65cdc7815cbd95d98a427b9c76b6c/assets/app-icon.ico)（AGPL-3.0）：使用社区客户端应用资源，不取 enterprise 目录商用源码或第三方服务图标。
- [helio](https://github.com/helio-fm/helio-sequencer/blob/a458d9505bf4b020ded6c21407183bb2fee43fcd/Projects/iOS/Helio/Images.xcassets/AppIcon.appiconset/Icon-AppStore-1024.png)（CC-BY-4.0）：采用官方应用分发图标；README 明确作品作者及 CC BY 4.0。
- [goldencheetah](https://github.com/GoldenCheetah/GoldenCheetah/blob/4472fed4e4d99cea21a8e5fff777f252d1948caa/doc/wiki/GC_logo.png)（GPL-3.0）：采用项目 Wiki 随源码发布的 GoldenCheetah 产品图形原图。
- [liftosaur](https://github.com/astashov/liftosaur/blob/c062ede0697166f0dc91b3e9593878c188174f3e/images/logo-square.png)（AGPL-3.0）：采用上游产品自己的方形标志，非官网社交平台图标。
- [heidisql](https://github.com/HeidiSQL/HeidiSQL/blob/45a0ee7ee015ab7f579b1e22fbad8d1689625149/res/Assets/Square150x150Logo.scale-100.png)（GPL-2.0）：采用官方 Windows 打包资产中的 HeidiSQL 应用标志，非依赖组件图标。
- [quicksilver](https://github.com/Quicksilver/Quicksilver/blob/12d754357c538fd15dfa874970df99d378229f6d/Quicksilver/Resources/Images/Quicksilver.icns)（Apache-2.0）：采用主应用打包资源中的 Quicksilver 图标，不使用插件、磁盘映像或旧格式图标。
- [sonobus](https://github.com/sonosaurus/sonobus/blob/35f1062dab196b9838a4bb529c4bf6592b7f5987/images/sonobus_icon_mac_256.png)（GPL-3.0）：采用上游正式 SonoBus Mac 图标，不使用内置 JUCE 依赖或演示应用资源。
- [zrythm](https://github.com/zrythm/zrythm/blob/13b16ed351bd06dd1762252a1f0827e8cc1ff9d1/src/gui/resources/icons/zrythm-dark/scalable/apps/zrythm.svg)（LicenseRef-ZrythmLogoLicense）：上游资产专用许可引用品牌政策，明确允许仅用图形准确指代未修改的 Zrythm，不表示赞助或关联。

保持原图比例、颜色和现有界面。上游声明与转换说明随静态资源分发，原稿随站或可从固定版本来源取得。

### 绘图、数据库与通信工具批次

- [bforartists](https://github.com/Bforartists/Bforartists/blob/f48f4f8667f1f6c2115120ffdf8b6a4f6c764f42/release/freedesktop/icons/scalable/apps/bforartists.svg)（GPL-2.0-or-later）：采用上游桌面打包的 Bforartists 标志，不将分支自带的 Blender 文档标志用作产品图标。
- [blockbench](https://github.com/JannisX11/blockbench/blob/ec0b2827104d0799c153bfb5f867579c0c44652f/build/icon.icns)（GPL-3.0）：采用 Blockbench 构建内正式应用图标，非 Netlify 标记或模型文件图标。
- [wings-3d](https://github.com/dgud/wings/blob/2f6672721d83af7bc39717c86deb12a2970ade9f/macosx/wings3d.icns)（Wings 3D License）：上游许可明确通常适用于与软件相关的文件；采用 macOS 应用图标而不是关联文档图标。
- [svgedit](https://github.com/SVG-Edit/svgedit/blob/c44f061d2f9a626d2771cc931298af5a45522d87/src/editor/images/logo.svg)（MIT）：采用 SVG-Edit 自带的编辑器产品标志，不使用演示或第三方图标。
- [shutter](https://github.com/shutter-project/shutter/blob/cb78390f546e7ad93690ab64a8afb72a66e6128c/share/icons/hicolor/scalable/apps/shutter.svg)（GPL-3.0）：采用随包安装的 Hicolor 应用标志，非系统面板或高对比版本。
- [lyx](https://github.com/cburschka/lyx/blob/3a02e477a00077e5442d8e34e92690d26a7ed4ae/development/MacOSX/LyX.icns)（GPL-2.0-or-later）：采用上游 LyX Mac 打包资源中的程序图标。
- [pgadmin](https://github.com/pgadmin-org/pgadmin4/blob/3b6b9b208a16241b736866b4c7561459a2d45b49/docs/en_US/images/logo-128.png)（PostgreSQL）：采用上游官方手册的 pgAdmin 4 应用标志，不使用数据库驱动图标。
- [dbeaver-community](https://github.com/dbeaver/dbeaver/blob/47352838a29f932713a21fc73c895a417042c74f/product/community/icons/dbeaver.png)（Apache-2.0）：采用 DBeaver 社区版安装产品资源中的应用标志，不混用商业版本图标。
- [ayugram-desktop](https://github.com/AyuGram/AyuGramDesktop/blob/0f2a31bb420de98f331990432265b131b8d836b5/Telegram/Resources/art/ayu/default/app.svg)（GPL-3.0）：采用 AyuGram 自己的默认应用标志，不使用替代主题、其他客户端或 Telegram 官方标志。
- [telegram-desktop](https://telegram.org/tour/screenshots)（Telegram media-use permission）：采用 Telegram 官方媒体包中现行的 Logo.svg 来标识官方桌面客户端，不暗示本站代表 Telegram。
- [unison](https://github.com/bcpierce00/unison/blob/8772d26a2eb77cfd0cb6da81807e81f24f51044c/src/uimac/Unison.icns)（GPL-3.0）：采用上游 macOS 主应用图标，不使用创作人员旧版或菜单状态符号。
- [clash-verge-rev](https://github.com/clash-verge-rev/clash-verge-rev/blob/1daee71a9e10f2394b8a47f1e34aa3acd2dce931/src-tauri/icons/128x128.png)（GPL-3.0）：采用项目打包的正式图标，不混用旧 Clash Verge 或代理内核标志。
- [clash-party](https://github.com/mihomo-party-org/clash-party/blob/1458f9626ad4b223424260bf083435b26b435d73/build/icon.ico)（GPL-3.0）：采用上游 Windows 安装包的产品图标，非代理状态或彩色托盘替代图标。
- [v2rayn](https://github.com/2dust/v2rayN/blob/9f4fc1e67bd55f324ea83cf3b9367eda1dc1f2d3/v2rayN/v2rayN.Desktop/Assets/v2rayN.ico)（GPL-3.0）：只采用 v2rayN 桌面主应用图标，不取代理内核或状态图标。

保持原图比例、颜色和现有界面。上游声明与转换说明随静态资源分发，原稿随站或可从固定版本来源取得。

### 编辑器、维护和下载工具批次

- [bulk-crap-uninstaller](https://github.com/Klocman/Bulk-Crap-Uninstaller/blob/30da609384c98ba6e35c6530129541ea4ff3970a/source/BulkCrapUninstaller/Resources/logo.ico)（Apache-2.0）：采用正式桌面客户端资源中的 BCU 产品图标。
- [drawing](https://github.com/maoschanz/drawing/blob/dd687db64a62354a7ff8a135845733df5f0f699a/data/icons/hicolor/scalable/apps/com.github.maoschanz.drawing.svg)（GPL-3.0-or-later）：采用程序包应用 ID 对应的正式图标，不使用系统工具栏图标。
- [filmcraft](https://github.com/storytold/filmcraft/blob/7b8e522d63f2e2c1617dea4939feb48e769d6f2f/assets/app-icon/hicolor/128x128/apps/ai.storyteller.filmcraft.png)（MIT）：应用图标目录明确以 MIT 或 Apache-2.0 许可本产品图标，不取 ArtCraft 品牌素材。
- [photodemon](https://github.com/tannerhelland/PhotoDemon/blob/f46e2ad4fa2391d36e6db269639290419c18007e/Resources/Assets/pd_icons_new.ico)（BSD-2-Clause）：采用用于可执行文件的程序资源；保留原作者版权和 BSD 条款。
- [pitivi](https://github.com/pitivi/pitivi/blob/a6473c5844353eefd2495aa60584538a0b33661e/data/icons/hicolor/scalable/apps/org.pitivi.Pitivi.svg)（LGPL-2.1-or-later）：采用随上游应用分发的产品图标，非关联文档或 symbolic 图标。
- [notepad-plus-plus](https://github.com/notepad-plus-plus/notepad-plus-plus/blob/1149a23f579a5c82696c5fa458b779633e867019/PowerEditor/misc/chameleon/chameleon-pencil-200.png)（GPL-3.0）：采用上游标志目录中单独的变色龙铅笔图形，不使用插件、发行地域横幅或文字。
- [vim](https://github.com/vim/vim/blob/6c201ec5d890c649ada74bd1c1975fdf65a54d7f/runtime/vimlogo.svg)（Vim）：上游 READMEdir/README_vimlogo.txt 明确该独立 SVG 使用 Vim 许可；保留未修改的原 SVG。
- [yaak](https://github.com/mountain-loop/yaak/blob/6196bf2a21ecac4f8ba3e3c8d4a2d1e7496ab452/crates-tauri/yaak-app-client/icons/release/128x128.png)（MIT）：使用 Tauri 正式打包配置指定的 release 版 128 像素图标，不用 dev 版或代理图标。
- [meshcentral](https://github.com/Ylianst/MeshCentral/blob/bf9af130ba42dad7afb416f9f1551cef074b9e6b/public/favicon-303x303.png)（Apache-2.0）：使用上游独立 303px MeshCentral 产品品牌资源，与官方界面的标识相符，非 noVNC 或系统通用图标。
- [bleachbit](https://github.com/bleachbit/bleachbit/blob/5f7d20abb110cb88e7cf2df8df9939e0c472db73/windows/bleachbit.ico)（GPL-3.0）：使用上游 Windows 应用打包图标，不使用第三方下载站或普通回收站图标。
- [czkawka](https://github.com/qarmin/czkawka/blob/9945e3521593e5c17247062942906aa0cc04b60e/data/icons/com.github.qarmin.czkawka.svg)（CC-BY-4.0）：上游图标许可证逐项列明该正式应用 SVG 及作者；不使用它的开发版或 Krokiet 标记。
- [optimizer](https://github.com/hellzerg/optimizer/blob/475ff86ca13db27aef665eee6ac6614b4a5a6097/Optimizer/Resources/Assets/logo.png)（GPL-3.0）：采用上游桌面程序主图标，不混同其他同名程序。
- [stacer](https://github.com/oguzhaninan/Stacer/blob/a44d0565a05c996b1058f950f1d308e1964c8320/stacer/static/logo.png)（GPL-3.0）：采用上游应用资源内的 Stacer 正式产品标志。
- [windirstat](https://github.com/windirstat/windirstat/blob/832a63b514a9d8b7f4e61c48e4aff0c134ef3976/windirstat/logos/logo_256px.png)（CC-BY-3.0）：README 的授权条款明确 Logo 和衍生品使用 CC BY 3.0，不按代码的 GPL 处理图形。
- [qbittorrent](https://github.com/qbittorrent/qBittorrent/blob/e6b69eb4b532146b34177b405734d36ff7624762/dist/unix/menuicons/128x128/apps/qbittorrent.png)（GPL-2.0-or-later）：使用上游桌面应用打包标志，不使用托盘变体、文件关联或网络站点图标。
- [librechat](https://github.com/danny-avila/LibreChat/blob/4700c44eb77c142b4f9f8b87476924f22890eb39/client/public/assets/logo.svg)（MIT）：采用上游应用随站分发且主 README 展示的 LibreChat 原图。

保持原图比例、颜色和现有界面。上游声明与转换说明随静态资源分发，原稿随站或可从固定版本来源取得。
