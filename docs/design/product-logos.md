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

### 摄影、户外和开发工具批次

- [ansel](https://github.com/aurelienpierreeng/ansel/blob/06e94d5a53d30a8f07cb42ae0702faa709bc68b2/data/pixmaps/scalable/ansel.svg)（GPL-3.0）：项目 CMake 安装的专用 Ansel 图标，不用兼容目录中的 darktable 老图。https://ansel.photos/en/
- [art](https://github.com/artpixls/ART/blob/62b37f16a819e0c6a0c0331152f968b3a611e1d9/data/images/ART-logo.svg)（GPL-3.0-or-later）：ART 上游图形；原 SVG 内置的 PNG 已单独校验，不加载外部资源。
- [darktable](https://github.com/darktable-org/darktable/blob/c247126f9a7a2c3cdfc0f675a7698c24710438ca/data/pixmaps/scalable/darktable.svg)（GPL-3.0-or-later）：上游应用安装图标；非网站文章素材。https://www.darktable.org/about/
- [digikam](https://github.com/KDE/digikam/blob/33d0457e20adda97c003f3dee652a1749406ff9f/core/data/icons/apps/256-apps-digikam.png)（GPL-2.0-or-later）：digiKam 上游应用图标，不是 KDE 标记或 Showfoto 图标。https://metadata.neon.kde.org/appstream/stable_noble/html/noble/main/metainfo/digikam.html
- [rawtherapee](https://github.com/RawTherapee/RawTherapee/blob/3458b9a1813f26b99c8dcf22aad7cc24deffdbae/rtdata/icons/hicolor/scalable/apps/rawtherapee.svg)（GPL-3.0）：取应用安装所用的植物图形，不用站点字标。https://www.rawtherapee.com/
- [comaps](https://github.com/comaps/comaps/blob/019e445829e959dd3d5a2e6fd1b3166c100025a0/android/app/src/fdroid/play/listings/en-US/graphics/icon/logo.png)（Apache-2.0）：正式应用商店图标；附上游 NOTICE，作者及发布说明见 https://www.comaps.app/news/2025-09-06/how-i-designed-the-logo-for-comaps-and-lessons-it-taught-me/
- [qmapshack](https://github.com/Maproom/qmapshack/blob/8cf370f03cf866ccd2eb87e1af8162f89d064a86/src/icons/qmapshack/hicolor/192x192/apps/QMapShack.png)（GPL-3.0）：上游桌面安装的 192px 图标，在静态说明中附上项目可编辑 SVG 的固定版本链接及校验值。
- [opensnitch](https://github.com/evilsocket/opensnitch/blob/a1353848ba1b660320e90cefea782c3fba272c00/ui/opensnitch/res/icon.png)（GPL-3.0）：取 Linux 应用的原始 UI 资源；不是任意警告符号或通用安全图标。
- [aider](https://github.com/Aider-AI/aider/blob/5dc9490bb35f9729ef2c95d00a19ccd30c26339c/aider/website/assets/icons/android-chrome-384x384.png)（Apache-2.0）：维护者针对演讲中的第三方介绍明确指向这一高分辨率品牌图；https://github.com/Aider-AI/aider/issues/1100
- [cline](https://github.com/cline/cline/blob/cbc7d1419a74464c622117a740fdfe87a5e0a7b2/apps/cline-hub/src/webview/public/cline-logo-filled.svg)（Apache-2.0）：官方应用内图标；品牌页提供供应用目录使用的图标及独立机器人图案。https://cline.bot/brand
- [immich](https://github.com/immich-app/immich/blob/a51a43856df89b83266fc312b822cadd7afb6fcf/design/immich-logo.svg)（AGPL-3.0）：上游设计库的 Immich 图案，仅在第三方资料中标识软件，不作为转售或集成。https://docs.immich.app/FAQ/#commercial-guidelines
- [opencode](https://github.com/anomalyco/opencode/blob/b64f928fd005c8d1ba24800f5364882bf492da79/packages/desktop/icons/prod/128x128.png)（MIT / editorial brand reference）：仅用上游生产版桌面应用图标，保留官方完整图案及内边距。媒体介绍用途见 https://opencode.ai/press 及 https://opencode.ai/brand

保持原图比例、颜色和现有界面。上游声明与转换说明随静态资源分发，原稿随站或可从固定版本来源取得。

### 录屏、文档和备份工具批次

- [sharex](https://github.com/ShareX/sharex.github.io/blob/e5aa9231533a08fd760ce8f31ec49cac2c3752cf/img/ShareX_Icon.ico)（GPL-3.0 / official brand asset）：官方品牌资料所列默认应用图标，非 favicon 或独立 Logo 版本。256px 内嵌 PNG 的 SHA-256 为 c51799a5af8b5ef7722dd301a74125616f8941243c434b9d2445712ce776dd6f；https://getsharex.com/brand-assets
- [vokoscreenng](https://github.com/vkohaupt/vokoscreenNG/blob/28ad1035459a6163063eead4874158ab28a2f6a5/src/pictures/logo/logo.png)（Public Domain）：上游为原始标志单独发布 Public Domain 声明。使用对应目录原图，不套用其它资源的许可。
- [ardour](https://github.com/Ardour/ardour/blob/eb8afaddfae2eedb6a8c34b546b1f0b310f09343/gtk2_ardour/icons/ardour-app-icon_osx.png)（GPL-2.0 / project artwork reuse）：上游 macOS 应用图标。项目维护者确认可用于与 Ardour 相关的展示，保留标识用途和开发者署名。https://discourse.ardour.org/t/permissions-for-using-image/84415
- [quickrecorder](https://github.com/lihaoyun6/QuickRecorder/blob/e82051787f013ec2e811fcceab2d7de80e9d4dbe/QuickRecorder/Assets.xcassets/AppIcon.appiconset/icon_128x128.png)（AGPL-3.0）：macOS 项目安装时使用的正式 AppIcon，非站点图标。
- [captura](https://github.com/MathewSachin/Captura/blob/3fdf41529bf4d50cd7a85aedd856f30e34279a47/src/Captura/Images/Captura.ico)（MIT）：Captura 上游发布的 Windows 应用标志，不使用暂停或录制按钮图标。
- [openshot](https://github.com/OpenShot/openshot-qt/blob/c43a9f9171342beead5b83c5b64cf942c80ac182/xdg/icon/256/openshot-qt.png)（GPL-3.0-or-later）：上游 Linux 桌面包的 256px 应用图标，保留原比例与颜色。
- [7zip](https://github.com/ip7z/7zip/blob/d3296e39e1f1f92c7b41c0c3848e65640428d42d/CPP/7zip/UI/FileManager/7zipLogo.ico)（LGPL-2.1-or-later / project artwork）：7-Zip 项目文件管理器自带的正式黑白标志。权利人曾在第三方软件选介请求中指向官方标志；此处只作原产品识别，不称合作或背书。https://sourceforge.net/p/sevenzip/discussion/45797/thread/320fac95/
- [sumatra-pdf](https://github.com/sumatrapdfreader/sumatrapdf/blob/e278d6194298553b44f564c4c2073de48f74076e/src/ng/linux/icons/sumatrapdf-256.png)（GPL-3.0）：原项目打包的 256px 应用图标，黄色 PDF 标志而不是通用文件图标。图标作者详见 https://github.com/sumatrapdfreader/sumatrapdf/blob/master/AUTHORS
- [borgbackup](https://github.com/borgbackup/borg/blob/6ff424880c7931eb2306626b26a73b02fedb1959/docs/_static/logo.png)（BSD-3-Clause）：项目文档中的官方短字标，不是 BorgBase 标志。字标使用的 Black Ops One 字体另见 docs/_static/logo_font.txt。
- [picocli](https://github.com/remkop/picocli/blob/10509c0af89aa3254ca14ba90d9b3b7168e57994/docs/images/logo/icon-square-160x160.png)（Apache-2.0）：项目自身发布的方形图标，避免用横版文字宣传图。
- [opentracks](https://commons.wikimedia.org/wiki/File:OpenTracks_logo.svg)（CC BY-SA 4.0）：项目作者亲自发布及许可的 OpenTracks 标志；显示原色原比例，WebP 同许可证，包含 XMP 署名及静态法律文本。
- [esearch](https://github.com/xushengfeng/eSearch/blob/1d3490cd288d583fd397f174d026a072ceda8d95/assets/icon.svg)（GPL-3.0）：上游安装资源内专用图标，非网站标题图或相似产品图案。

保持原图比例、颜色和现有界面。上游声明与转换说明随静态资源分发，原稿随站或可从固定版本来源取得。

### 启动器、分析及远程工具批次

- [raycast](https://www.raycast.com/press)（Official editorial brand reference）：品牌资料提供的桌面 App 图标用于指称原应用；没有改色，不使用手机端图标或其他 Raycast 产品的商标。
- [turso](https://turso.tech/brand)（Official brand reference）：官方品牌页公开供介绍 Turso 时使用的深色独立标志，不是数据库应用类别的通用图。
- [2fas-auth](https://github.com/twofas/2fas-android/blob/4ad83b2b94967993db55dd36dcb2e258646eb7b6/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png)（GPL-3.0 / official media reporting）：Android 主应用的正式 2FAS Auth 图标，区别 2FAS Pass 和内部测试版本；官方媒体资料 https://2fas.com/press-kit/
- [umami](https://github.com/umami-software/umami/blob/dbb8d606fbd4e99220fb83bcb4abad3e0f97f42a/src/assets/logo.svg)（MIT）：上游分析应用自己的 SVG 图形，区别同名非相关网站。
- [spectre-console-cli](https://github.com/spectreconsole/spectre.console/blob/04b5dac6398dce0838c48cc3a3b6d1cc8a7f1747/resources/nuget/logo.png)（MIT）：NuGet 构建在 src/Directory.Build.props 中指定的官方包图标，适用于 Spectre.Console.Cli 包，不采用其他软件的终端图形。
- [fittrackee](https://github.com/SamR1/FitTrackee/blob/2129e443363a231c936fc339a44cd533acc7e4cb/fittrackee_client/src/assets/logo.png)（AGPL-3.0-only）：官方项目镜像内网页应用实际用图，而非托管平台头像。
- [vlc](https://github.com/videolan/vlc/blob/f7235210e5d55e165dcfef616cd19e940603473d/share/icons/256x256/vlc.png)（VideoLAN product-logo reference grant）：发行项目内的 VLC 橙色圆锥应用图标；VideoLAN 官方允许标志用于识别该项目或其产品，不代表背书。
- [transmission](https://github.com/transmission/transmission/blob/f6d6c7f80bba2a4bee391a6fc62d2bcaf0c37d92/macosx/Images/Images.xcassets/AppIcon.appiconset/icon_256x256.png)（GPL-2.0 / GPL-3.0）：现行应用源码的 macOS AppIcon 资源，不使用相似的下载文件类型图标。
- [rustdesk](https://github.com/rustdesk/rustdesk/blob/45e34a69239c2c2467fd02af8ee97263ff26ef23/flutter/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-1024x1024%401x.png)（AGPL-3.0）：官方客户端的完整 app 标志，仅标识原应用，不作为定制客户端或转售品牌使用。
- [sunshine](https://github.com/LizardByte/Sunshine/blob/b12662e562b319f942f459404fe766a79748bb6a/sunshine.svg)（GPL-3.0）：官方根目录的应用商标，打包也使用同一 SUNSHINE 应用图，不使用 Steam 或 Moonlight 图标。
- [iterm2](https://commons.wikimedia.org/wiki/File:ITerm2_v3.4_icon.png)（CC BY-SA 4.0）：iTerm2 正式版本的原始配色与终端图案，采用许可定版，不误用仅仅外框细节略有差异的新预览图或 Beta 标志。WebP 与原稿同为 CC BY-SA 4.0，文件内含署名及许可。
- [amnezia](https://github.com/amnezia-vpn/amnezia-client/blob/4f0fa34449439428619aeb89d6d8622671dffbbb/client/images/app.ico)（GPL-3.0）：开源 Windows 客户端编译时使用的产品原图，区别于付费套餐品牌和状态图标。

保持原图比例、颜色和现有界面。上游声明与转换说明随静态资源分发，原稿随站或可从固定版本来源取得。

### 桌面应用、录屏与隐私工具批次

- [t3-code](https://github.com/pingdotgg/t3code/blob/88107272fffccc561599b4498b73fa0ec25a9ac4/apps/marketing/src/assets/icon.webp)（MIT）：上游站点直接展示的正式 T3 Code 应用图标，不用 nightly 版或集成图标。
- [orca](https://github.com/stablyai/orca/blob/d8f451ae0c861fe7098accb646c6e130cb0b1312/resources/build/icon.png)（MIT）：Orca 编辑器官方安装包图案，项目对应 https://orca.dev/ ，不同于同名屏幕阅读器或 3D 打印切片软件。
- [standard-notes](https://github.com/standardnotes/app/blob/e147ae79f6459464a936687b967a8d8e1170a84c/packages/desktop/app/icon/Icon-256x256.png)（AGPL-3.0）：Standard Notes 正式桌面图标，非其开发构建或 Proton 其它产品标志。
- [http-toolkit](https://github.com/httptoolkit/httptoolkit-desktop/blob/4494a2cf1b30c9490a955b48aa69b86a38b46339/src/icons/icon.icns)（AGPL-3.0）：官方桌面发行项目图标，仅在对比页面用于识别此产品。
- [portmaster](https://github.com/safing/portmaster/blob/f6d4471bbb13d886e4dcdcd01e38e94f25b4518f/assets/data/icons/pm_dark_256.png)（GPL-3.0）：适合现有浅背景的 Portmaster 安装资源，未使用通知与状态衍生图。
- [scribus](https://commons.wikimedia.org/wiki/File:Scribus_logo.svg)（CC BY-SA 3.0）：采用作者明确许可的 Scribus 官方笔尖标志，图案和配色未改变，WebP 沿用同一许可并带署名。
- [gnumeric](https://github.com/GNOME/gnumeric/blob/0fa001fce6b533914174cca5716df31cbf3d9ddb/icons/256x256/apps/org.gnumeric.gnumeric.png)（GPL-2.0-or-later）：桌面入口 org.gnumeric.gnumeric 引用的 256px 官方图，非 GNOME 基金会图标或通用表格标志。
- [staxrip](https://github.com/staxrip/staxrip/blob/2283bfd0a892542feecdbb813b1fcda144f7d610/Source/Black.ico)（MIT）：StaxRip.vbproj 中指定的 Windows 应用图案，未用主题可选图。
- [simplescreenrecorder](https://github.com/MaartenBaert/ssr/blob/e73e07664121ac30836872bca76194c6570e04c8/data/icons/256/simplescreenrecorder.png)（GPL-3.0）：官方桌面启动条目对应的图标，区别等待和正在录制等状态图案。
- [cap](https://github.com/CapSoftware/Cap/blob/2bffa46a4de88647354bc162e730e2bce0a12792/apps/desktop-gpui/icons/macos/icon.icns)（AGPL-3.0）：Cap 桌面打包图标，来源许可证覆盖未明文排除的内容，仅用于编辑性比较，不用于我们的品牌。
- [proton-pass](https://proton.me/media/kit)（Proton media kit reference grant）：采用 Proton Pass 产品图，非 Proton 通用标志；产品详情保留官网链接 https://proton.me/pass 。
- [proton-drive](https://proton.me/media/kit)（Proton media kit reference grant）：采用 Proton Drive 产品图，非 Proton 通用标志；产品详情保留官网链接 https://proton.me/drive 。

保持原图比例、颜色和现有界面。上游声明与转换说明随静态资源分发，原稿随站或可从固定版本来源取得。

### 演示、桌面工具与健身应用批次

- [friction](https://github.com/friction2d/friction-icon-theme/blob/b9a08f67f1eda58014fe465e0887ee92c3e0de90/friction-icon.svg)（CC BY-SA 4.0）：上游图标主题明确注明 Friction 标志作者 Nic Kraneis 与 CC BY-SA 4.0 授权。
- [marp-cli](https://github.com/marp-team/marp-cli/blob/ffc4128626cbc64965fe1cc805717c6d4438c384/src/assets/win-icon.ico)（MIT）：Marp CLI 自己仓库内的 Windows 应用原图，不使用 Marp for VS Code 的图案。
- [freerdp](https://github.com/FreeRDP/FreeRDP/blob/5993fc75de802cd12186db9bf3e04934c9fb1dfe/resources/FreeRDP_Icon.svg)（Apache-2.0）：FreeRDP 官方项目的独立兔子图案，仅用作识别原项目。
- [liftlog](https://github.com/LiamMorrow/LiftLog/blob/1b950c9020eeddba8c94ee7faeec9849316585ec/app/assets/icon.png)（AGPL-3.0）：上游移动应用正式图标，不使用商店徽章或健身动作插画。
- [shutter-encoder](https://github.com/paulpacifico/shutter-encoder/blob/33d48a96a65b59dfc1ba1da2f9f2f0dfb0f92f86/src/resources/icon.png)（GPL-3.0）：官方 Shutter Encoder 应用内产品图案，不使用 FFmpeg 或可选插件标志。
- [ivpn](https://github.com/ivpn/desktop-app/blob/8e8bee5287a7b1c113e58b550c35b8d7b520c627/ui/buildResources/appicons/icons/256x256.png)（GPL-3.0）：官方开源桌面客户端打包资源，只用于标识目录对应工具。
- [omi](https://github.com/BasedHardware/omi/blob/55e6012e1e21cdccb9efa9266fab759ade2b17d6/app/ios/Runner/Assets.xcassets/prodAppIcon.appiconset/OmiAppIcon-60%403x.png)（MIT）：iOS 正式版本的对应 Omi 应用图标，与开发版、手表和设备实物区别。
- [affine](https://github.com/toeverything/AFFiNE/blob/5444d929c22b6114fbb1519ccb3ea180c2cd84d4/packages/frontend/apps/electron/resources/icons/icon.png)（MIT）：官方客户端打包资源。根 LICENSE 明确这一路径不在非 MIT 后端例外目录内。
- [jan](https://github.com/janhq/jan/blob/49a84bdeaebdfc0f36c00f252eb638f516a48432/src-tauri/icons-macos/icon.png)（Apache-2.0）：正式 macOS 应用图标，区别于单独维护的 beta 或 nightly 图案。
- [lockime](https://github.com/oomol-lab/LockIME/blob/456500e819f10db18709369904826e56370682f8/Sources/LockIME/Assets.xcassets/AppIcon.appiconset/icon_256.png)（GPL-3.0）：正式 macOS 应用图标，不使用菜单栏模板或解锁状态图。
- [input-source-pro](https://github.com/runjuu/InputSourcePro/blob/b9cd70febe07316c21ff64e958ec6fbab9ce5838/Input%20Source%20Pro/Resources/Assets.xcassets/AppIcon.appiconset/256.png)（GPL-3.0）：正式 macOS 应用图标，不使用第三方输入法或应用小图。
- [ultravnc](https://github.com/ultravnc/UltraVNC/blob/3842e3438d00e884639b3e20b489c8b326154526/vncviewer/res/vncviewer.ico)（GPL-3.0）：官方 UltraVNC Viewer Windows 应用 ICO 的 256px 图层，区别于服务端及系统托盘图标。

保持原图比例、颜色和现有界面。上游声明与转换说明随静态资源分发，原稿随站或可从固定版本来源取得。

### 录屏、清理与专业工具批次

- [ente-auth](https://github.com/ente-io/ente/blob/2e2b3716476a158be01561edc1aa2b47a4fe2831/mobile/apps/auth/android/app/src/main/res/mipmap-xxxhdpi/launcher_icon.png)（AGPL-3.0）：Ente Auth 正式 Android 应用入口图标，不使用开发版或 Ente Photos 图标。
- [pearcleaner](https://github.com/alienator88/Pearcleaner/blob/7724df7111bff82ae243301cf701992ef05ecf19/Pear%20Resources/Icons/icon_256x256.png)（Apache-2.0 with Commons Clause）：官方桌面客户端项目内原始产品图标，仅用于对应工具的识别，不销售素材，不做衍生客户端。
- [letos](https://github.com/pawelsalawa/letos/blob/bb2bcaa9cfea1277a6a9bfcba16542b3e9fe9581/Letos/gui/img/letos.svg)（GPL-3.0-or-later）：Letos 官方图形客户端资源清单使用的图案，不使用同仓库旧 SQLiteStudio 文档图。
- [okular](https://github.com/KDE/okular/blob/04d2a9b72d9ab89afefe6dd6ba775f54a85b456e/icons/128-apps-okular.png)（GPL-2.0-or-later）：Okular 桌面包构建安装的应用图标，区别于 KDE 组织标志和 PDF 注释工具图。
- [obs-studio](https://github.com/obsproject/obs-studio/blob/60a50017d70136375c78da5e15433597c9f3af7c/frontend/cmake/linux/icons/obs-logo-256.png)（GPL-2.0-or-later）：OBS Studio 正式 Linux 发行项目应用原图，仅标识目录中的 OBS Studio，不作为本站、插件、推广或合作标志；同一图标也覆盖录音分类。
- [qcad-ce](https://github.com/qcad/qcad/blob/556998d77501cf2c74949588645110528a037944/src/run/qcad.ico)（GPL-3.0 with QCAD exceptions）：社区版开源代码中的 QCAD Windows 应用程序图标，非文档文件、Pro 试用或站点品牌横幅。
- [invokeai](https://github.com/invoke-ai/InvokeAI/blob/ecae7e7b6f7b521bd75c9539b4840f645be91a0b/invokeai/frontend/webv2/public/invoke-icon.svg)（Apache-2.0）：Invoke 官方项目新 Web 客户端内置独立图标，区别于模型、扩展和商业横幅。
- [dupeguru](https://github.com/arsenetar/dupeguru/blob/7466154c23b823e51cd678eae2f94cf87356dc26/images/dgse_logo_128.png)（GPL-3.0）：官方标准版应用图标，区别于 Music 和 Picture 版以及工具栏图标。
- [lulu](https://github.com/objective-see/LuLu/blob/88479660fe27086ff6572f859376c852d283dd25/LuLu/App/Assets.xcassets/AppIcon.appiconset/icon_256x256.png)（GPL-3.0）：LuLu 原生桌面客户端正式应用图标，区别于菜单栏状态图。
- [peek](https://github.com/phw/peek/blob/dab07c27d7e3cc5959a61685b3aaff8956333239/data/icons/com.uploadedlobster.peek.svg)（CC BY-SA 4.0）：官方桌面包装清单中的 Peek 彩色图标，保留原稿内 CC 标记和 GNOME Design Team 署名，不用桌面主题替代或单色状态变体。
- [cobra](https://github.com/spf13/cobra/blob/adbc8813901bba65827259daa8e22ff94ec1f30e/assets/CobraMain.png)（Apache-2.0）：Cobra CLI 框架仓库 README 的官方图案，仅用于同名条目，不使用站点公司标识。
- [imagemagick](https://imagemagick.org/license/)（ImageMagick License）：官方 README 以 ImageMagick logo 标示的官方巫师图案；上游维护者说明图案在文章中按 ImageMagick 许可使用。

保持原图比例、颜色和现有界面。上游声明与转换说明随静态资源分发，原稿随站或可从固定版本来源取得。

### 云服务、浏览器工具与桌面应用批次

- [texturecraft](https://github.com/storytold/texturecraft/blob/429d705884d81048c35cc9a4528bd78607f0dd7d/assets/app-icon/hicolor/256x256/apps/ai.storyteller.texturecraft.png)（MIT）：上游明确授权的 TextureCraft 正式斑马应用原图，不使用 ArtCraft 品牌、临时占位或 nightly 变体。
- [stagehand](https://github.com/browserbase/stagehand/blob/97ff3e1189d3205bee10127fdde992f3313ef228/packages/docs/favicon.svg)（MIT）：官方文档的独立绿色 S 产品符号，与官方 Stagehand 完整 Logo 中的字形一致，不是通用网页 favicon。
- [seafile](https://github.com/haiwen/seafile-client/blob/7b5a95acfbd1f7f1a9519341ba1b095fd974682e/seafile.ico)（Apache-2.0）：官方 Seafile 桌面项目打包使用的独立应用图标，不使用 SeaDrive 或其他分支图案。
- [yt-dlp](https://github.com/yt-dlp/yt-dlp/blob/da452a569fb3d04091468d920f9b9e68512e0373/devscripts/logo.ico)（Unlicense）：官方 Windows 打包资源使用的 yt-dlp 产品 ICO。选用 256px 图层，不使用 YouTube 或原版 youtube-dl 标志。
- [insomnia](https://github.com/Kong/insomnia/blob/adc07b84dcbf1282e324fcee15c3e423a800defd/packages/insomnia/src/icons/icon.ico)（Apache-2.0）：Insomnia 桌面发行包正式应用图标，区别于 Kong 公司品牌和 Inso CLI。
- [clamav](https://github.com/Cisco-Talos/clamav/blob/cad7b18a3e6505195fe08db1412449a18fc9f012/logo.png)（GPL-2.0）：官方项目 README 使用的 ClamAV 标识图 Maeve，只用作目录产品识别，不暗示 Cisco 背书。
- [vercel](https://vercel.com/geist/brands)（Vercel brand reference guidelines）：官方品牌指南针对空间有限的列表允许单独展示 Vercel 三角符号，保持官方原色、形状和官方原稿。
- [neon-cloud](https://neon.com/brand)（Neon brand reference guidelines）：官方品牌指南针对空间有限的列表使用浅底全色 Neon 独立标记，不替换为 Databricks 公司标志。
- [render](https://render.com/newsroom)（Render newsroom brand kit）：官方品牌素材包的浅底黑色独立标志，在现有留白位置用来识别 Render，不使用员工照片和品牌横幅。
- [capacitor](https://github.com/ionic-team/capacitor-site/blob/fa69bbd1872fc82526c79dbb0ce6031b66457e4d/src/assets/img/favicon.png)（MIT）：官方项目站的 Capacitor 蓝底电容符号，核对与官方字标的电容符号一致，不使用 Ionic 公司图标或通用 favicon。
- [gpu-screen-recorder](https://github.com/flathub/com.dec05eba.gpu_screen_recorder/blob/abad74035a4f006670fd720d69c3cb3a673a9573/com.dec05eba.gpu_screen_recorder.yml)（GPL-3.0-only）：从 Flathub 发布清单锁定且 SHA-512 一致的上游归档中取 128px 产品应用图标，非托盘录制状态图。

保持原图比例、颜色和现有界面。上游声明与转换说明随静态资源分发，原稿随站或可从固定版本来源取得。

### 设计、录制与实用工具批次

- [armorpaint](https://github.com/armory3d/armorpaint/blob/deac70436ea784308180071e576d1f8e66c57b74/paint/icon.png)（Zlib）：官方 ArmorPaint 桌面产品图标，与官方手册的独立红底 P 标识一致，不使用 Armory 引擎图标。
- [maestro-cli](https://github.com/mobile-dev-inc/maestro/blob/81492bbb1f57d4aa4745d4b985a422f2c738e211/.idea/icon.svg)（Apache-2.0）：Maestro CLI 开源项目的方形产品图案，与官方仓库展示的 Maestro 标识一致，不使用测试 App 或云套餐图标。
- [mitmproxy](https://github.com/mitmproxy/mitmproxy/blob/046618526875cad96d23043bef78b3ffd422b033/release/windows-installer/Assets/logo.150x150.png)（MIT）：mitmproxy 正式 Windows 安装资源中的产品图标，不使用第三方主题或工具图。
- [reelbird](https://github.com/btahir/reelbird/blob/c50ca417ad0593e882f63cf6b33c0523b6641a0e/brand/icon.svg)（MIT）：项目自带应用图标原稿，不是插画、录制状态或演示截图。
- [wireshark](https://github.com/wireshark/wireshark/blob/c8417a804b4ecbfcc1a51ca3e77af9663714140d/resources/icons/wsicon256.png)（GPL-2.0-or-later）：Wireshark 官方开发者指南指向发行资源中的应用图标；只标识 Wireshark，不使用 Stratoshark、捕捉状态或文件图标。
- [screenpal](https://screenpal.com/media-assets)（ScreenPal media assets guidelines）：官方媒体素材的彩色独立图案，保留注册标记、比例和原色，在原有纯白图标区展示。
- [screen-studio](https://screen.studio/brand-materials)（Screen Studio published brand materials）：官网品牌材料的单独 Screen Studio 标志，保持原有比例与颜色，不使用带字横幅。
- [sketch](https://www.sketch.com/about-us/#press-information)（Sketch media kit guidelines）：官方媒体套件专用浅色应用图标，内置留白且不改其中的钻石标记，不用企业横排字标。
- [arq-7](https://www.arqbackup.com/press/)（Arq published press artwork）：Arq Backup 官方媒体页的 512px Arq App Logo，专用于介绍现有 Arq 7 产品。
- [audio-hijack](https://www.rogueamoeba.com/company/presskit/#audiohijack)（Rogue Amoeba published press artwork）：Rogue Amoeba 专供报道的 Audio Hijack 独立应用图标，不使用公司品牌或旧 Audio Hijack Pro 图案。
- [piezo](https://www.rogueamoeba.com/company/presskit/#piezo)（Rogue Amoeba published press artwork）：Rogue Amoeba 专供报道的 Piezo 独立应用图标，不使用 Audio Hijack 或公司标志。

保持原图比例、颜色和现有界面。上游声明与转换说明随静态资源分发，原稿随站或可从固定版本来源取得。

### 开发、归档与远程桌面补图

- [nanazip](https://raw.githubusercontent.com/M2Team/NanaZip/93e5e4f76e988210f763e1b84cb0f6bb910741b5/Assets/NanaZip.png)：CC BY-ND 4.0; Shomnipotence and M2-Team. Exact dimensions and decoded RGBA pixels preserved; lossless encoding only.
- [remmina](https://raw.githubusercontent.com/FreeRDP/Remmina/bb33690d870e9121379ad86e8dec019e06695c96/data/desktop/256x256/apps/org.remmina.Remmina.png)：CC BY-SA 4.0; Suru Icons (Sam Hewitt); Yaru contributors madsrh and ubuntujaggers. Upstream installed PNG is byte-identical to the accepted Yaru design (ubuntu/yaru#1291). Proportionate downscale and lossless WebP; same license.
- [tauri](https://v2.tauri.app/assets/logopack.zip)：Official standalone color glyph from TAURI LOGOPACK/TAURI Colors/TAURI_Glyph_Color.svg. Lossless WebP rasterized and proportionately scaled with unpainted fixed clear space per https://tauri.app/assets/brand_guidelines.pdf. Glyph colors and shapes unchanged.
- [screenpipe](https://github.com/screenpipe/screenpipe/blob/845e3609895f53a37c24b8c94c24fbee8833bdeb/apps/screenpipe-app-tauri/src-tauri/icons/128x128@2x.png)（[官方媒体包](https://screenpipe.com/press)）：Official monochrome desktop icon, listed in upstream production packaging. The publisher’s Press Kit supplies this app icon for directory and editorial use. Proportionate downscale and lossless WebP; no crop, rotation, effects or recolor.

### 官方媒体与应用图标

- [handbrake](https://raw.githubusercontent.com/HandBrake/HandBrake/a1047ae557f58fdb43f5836f29deb6219b3c861c/graphics/Logo/HandBrake-v2-1658%C3%971721.png)（[品牌/授权](https://github.com/HandBrake/HandBrake/blob/a1047ae557f58fdb43f5836f29deb6219b3c861c/graphics/LICENSE)）：Exact original v2 pineapple-and-drink app artwork, verified as Git blob fab6fce4bdcd8abbff9dc97505899fe0e349beba; the same blob supplies the production macOS icon layer. CC BY-SA 4.0, licensed under the same terms after proportional downscaling. Author credited in https://github.com/HandBrake/HandBrake/blob/master/THANKS.markdown.
- [lm-studio](https://lmstudio.ai/assets/marketing/brand/download/logos/lm-studio-icon-color.svg)（[品牌/授权](https://lmstudio.ai/brand)）：Official standalone color app icon from the publisher brand kit. Product references eligible under its brand guidelines; no lockup extraction, recolor, crop or third-party endorsement.
- [mailersend](https://storage.googleapis.com/mailersend-website-bucket/downloads/brand/mailersend-symbol.zip)（[品牌/授权](https://www.mailersend.com/brand-assets)）：Official color symbol for a light background, extracted from MailerSend - Symbol/mailersend-symbol-color-light-background.svg in publisher asset pack. Unaltered aspect ratio and original brush colors; whitespace preserved.
- [proxyman](https://proxyman.com/assets/images/proxyman_icon.webp)（[品牌/授权](https://proxyman.com/company)）：Exact product icon named on publisher Press and Partnerships page; Proxyman (not the publisher company mark, TCP Viewer, Device MCP or TinyShield). Used editorially; no endorsement, crop or recolor.
- [trainingpeaks](https://wpassets.trainingpeaks.com/wp-content/uploads/2025/08/01161228/TrainingPeaks-Logos-2025.zip)（[品牌/授权](https://www.trainingpeaks.com/media/)）：Exact standalone app icon, not the separate TrainingPeaks Virtual mark. Official 2025 media pack member TrainingPeaks - Logos - 2025/3 - TrainingPeaks_Icon/TrainingPeaks_App_Icon.svg. Kept original solid tile and colors. Signature spacing is specified separately in the same kit.
- [cursor](https://ptht05hbb1ssoooe.public.blob.vercel-storage.com/assets/brand/cursor-brand-assets.zip)（[品牌素材](https://cursor.com/brand)）：The publisher’s default 2.5D light app icon. Artwork kept as supplied except proportionate display-size reduction and lossless format encoding. This is the app icon from the brand kit, not a substitute generic cube or website favicon.
- [hevy](https://www.hevyapp.com/wp-content/uploads/2026-Hevy-brand-assets-1.zip)（[品牌素材](https://www.hevyapp.com/press/)）：Exact Hevy_appicon.png supplied in the publisher’s kit for press use. No wordmark or geometry changes, cropping, effects, recolor, or endorsement.

### 官方开源项目图标

- [openscad](https://upload.wikimedia.org/wikipedia/commons/9/97/OpenSCAD-logo.png)（[来源与授权](https://commons.wikimedia.org/w/index.php?title=File:OpenSCAD-logo.png&oldid=1290782597)）：The author-uploaded original; matches the graphic in the official product icon. Same artwork, original colors and transparent background; the app packaging adds its own tile separately. No tile recreated.
- [pake-cli](https://raw.githubusercontent.com/tw93/Pake/fbba237182edf496576370e13c46d4b050ad9a57/assets/logo.png)（[仓库许可证](https://github.com/tw93/Pake/blob/fbba237182edf496576370e13c46d4b050ad9a57/LICENSE) · [商标政策](https://github.com/tw93/Pake/blob/fbba237182edf496576370e13c46d4b050ad9a57/TRADEMARK.md)）：Official Pake CLI README icon kept as a neutral product identifier, not the mark of the separately distributed desktop app or packaged website wrappers. The repository code license does not grant trademark rights.
- [ente-photos](https://raw.githubusercontent.com/ente-io/ente/b0c3262457d2f6d5cabc140826e87d8d794142c2/mobile/apps/photos/android/app/src/main/res/mipmap-xxxhdpi/icon_green.png)（[来源与授权](https://github.com/ente-io/ente/blob/b0c3262457d2f6d5cabc140826e87d8d794142c2/LICENSE)）：Exact default Photos app icon (icon_green) selected by the production Android manifest. Not Ente Auth, Locker, Ensū, a dev icon or a selectable alternate. The supplied asset was preserved and downscaled proportionately without changing the artwork.
- [synfig](https://raw.githubusercontent.com/synfig/synfig/188480999d4cebca61649eb9aefc84c4ef04c306/synfig-studio/images/org.synfig.SynfigStudio.svg)（[来源与授权](https://github.com/synfig/synfig/blob/188480999d4cebca61649eb9aefc84c4ef04c306/synfig-studio/LICENSE)）：Official app-installed org.synfig.SynfigStudio SVG named by the desktop file. The exact SVG contains GPL and Daniel Hornung metadata. Original Synfig project drawing at https://github.com/synfig/synfig/blob/188480999d4cebca61649eb9aefc84c4ef04c306/synfig-studio/images/logo.sif; the unchanged SVG preferred source is also supplied.
- [feeel](https://gitlab.com/enjoyingfoss/feeel/-/raw/1b939a57f6e1dc05b0f8e38f166e18107ada4b16/flatpak/icons/256x256/com.enjoyingfoss.feeel.png)（[来源与授权](https://gitlab.com/enjoyingfoss/feeel/-/blob/1b939a57f6e1dc05b0f8e38f166e18107ada4b16/LICENSE)）：Exact Feeel 256 px Flatpak app icon from official manufacturer source. AGPL-3.0-or-later matches the published AppStream project license; it is an application launcher asset, not an exercise photo or third-party stock asset. Original palette and shape retained.
- [penpot](https://nextcloud.kaleidos.net/index.php/s/f9p5tHrpWNFX8En)（[来源与授权](https://penpot.app/media-kit)）：Official light-surface standalone dark logomark, logo _ isotipo dark.svg in the public Penpot Logos pack. Brandbook scale graphic indicates a minimum 24 px icon height; the smallest 32 px bordered tile leaves a 24.6 px image height. Dark #151035 artwork remains unchanged. Not an extracted part of a lockup. Only editorial identification; for the exact original refer to the archive and checksum.
- [ghostty](https://raw.githubusercontent.com/ghostty-org/ghostty/19da8d4c75b0f37d3cf53c3718d4538049c3f214/images/icons/icon_128.png)（[来源与授权](https://github.com/ghostty-org/ghostty/blob/19da8d4c75b0f37d3cf53c3718d4538049c3f214/LICENSE)）：The official default application icon from the MIT-licensed Ghostty application source. Not a night build, community recreation, or custom macOS variant; use is identification of the original product only.
- [keepass](https://sourceforge.net/projects/keepass/files/KeePass%202.x/2.62/KeePass-2.62-Source.zip/download)（[来源与授权](https://keepass.info/help/v2/license.html)）：Exact 256px frame of KeePass/KeePass.ico in the official KeePass 2.62 source archive, declared as the application icon in KeePass.csproj. Archive SHA-256: 9c07b0539a013ee5e22b26fd806e472c1858bc2f3f7b3b4406f4404774263ac0. Not KeePassXC or independent ports. Artist acknowledged at https://keepass.info/help/base/credits.html.
- [wick-editor](https://raw.githubusercontent.com/Wicklets/wick-editor/f34f0d9512d7165e74c1910ea1aba9173ab8dec2/public/icon.png)（[来源与授权](https://github.com/Wicklets/wick-editor/blob/f34f0d9512d7165e74c1910ea1aba9173ab8dec2/LICENSE.md)）：The application’s source PNG under the GPL-licensed Wick Editor repository. Cross-checked against the icon in the desktop entry configuration, not a website graphic or a mark used to identify this catalog.
- [greenshot](https://raw.githubusercontent.com/greenshot/greenshot/2c1d38a3258ca71b063024ab2e6f5f4cbd43fa18/src/Greenshot.Base/Resources/GreenshotResources/Greenshot.Icon.ico)（[来源与授权](https://getgreenshot.org/faq/may-i-use-greenshot-trademark-or-logo/)）：Original 256px image from the official Windows executable icon. Its ICO is byte-identical to the portable package application icon. The project’s FAQ permits fair editorial reviews; this is not a promotional asset or a logo for another product.
- [continue](https://raw.githubusercontent.com/continuedev/continue/5522c6f44ca0ac3528b37244818fbfa39b5af470/extensions/vscode/media/icon.png)（[来源与授权](https://github.com/continuedev/continue/blob/5522c6f44ca0ac3528b37244818fbfa39b5af470/LICENSE)）：Official product PNG used by the Continue VS Code extension manifest in the same Apache-2.0 source tree. Not a provider logo or the mark of another project. Used only to identify the original Continue tool.
- [ollama](https://raw.githubusercontent.com/ollama/ollama/8ae8acb81afba9c3c67adf08190964eb7d1207ef/app/darwin/Ollama.app/Contents/Resources/icon.icns)（[来源与授权](https://github.com/ollama/ollama/blob/8ae8acb81afba9c3c67adf08190964eb7d1207ef/LICENSE)）：The official macOS application icon packaged by Ollama in the MIT-licensed app source, rendered from its largest provided frame. Not a generic favicon, third-party model mark, or mark of a different llama project.

### 品牌方要求保留的原始 PNG

这些 PNG 原样存放，服务端不改色、重采样或编码。文件哈希随配置校验，浏览器仍使用相同尺寸的图标槽；不扩大原有 WebP 预算。

- [netlify](https://www.netlify.com/assets/logos/netlify-logo-monogram.zip)（[品牌规范](https://www.netlify.com/about/#brand-assets)）：The light-surface monogram from logo-netlify-monogram-lightmode.png in the official media archive. The compact badge next to Netlify’s written product name uses the supplied monogram, without changing the file.
- [open-webui](https://docs.openwebui.com/assets/files/open-webui-icon-115aa34b938cd4b21063a0a1da4c06e0.png)（[品牌规范](https://docs.openwebui.com/brand/)）：Official primary Open WebUI PNG for compact placements with the product name nearby. Independent comparison only, not an Open WebUI distribution, integration logo, or co-branding.
- [supabase-cloud](https://supabase.com/brand-assets/supabase-icon-green-transparent.png)（[品牌规范](https://supabase.com/brand)）：Official compact green mark for Supabase, used only for the hosted Supabase product. The downloaded PNG is unaltered and appears adjacent to the product name.
- [dodo-payments](https://dodopayments.com/brand-assets.zip)（[品牌规范](https://dodopayments.com/brand)）：Standalone Brandmark.png from the official Dodo Payments media kit, which is supplied for publications and media coverage. Unmodified bytes/native palette; no wordmark recreation, co-branding, or implied endorsement.

### 中文输入法引擎

- [rime](https://raw.githubusercontent.com/rime/librime/d5fb48f3fad1b50399b0eb728bf84bdcbd6d501c/doc/rime-icon.png)（[BSD 3-Clause](https://github.com/rime/librime/blob/d5fb48f3fad1b50399b0eb728bf84bdcbd6d501c/LICENSE)）：The official librime documentation project icon, not Squirrel or Weasel; byte-identical decoded RGBA after lossless WebP encoding.

### 官方应用包图标

- [utm](https://raw.githubusercontent.com/utmapp/UTM/3d4b8d8cb1ce93a8b1a9610695c12487685f0c15/Platform/Assets.xcassets/AppIcon.appiconset/icon_128pt.png)（[Apache-2.0](https://github.com/utmapp/UTM/blob/3d4b8d8cb1ce93a8b1a9610695c12487685f0c15/LICENSE)）：Default UTM icon from the 128pt macOS slot of AppIcon.appiconset, independently checked against its Contents.json. This is the bundled UTM asset, not the companion UTM Remote or a community redesign.
- [comfyui](https://raw.githubusercontent.com/Comfy-Org/desktop/e2d964b7456cea8423c7b9d3371c612313c06baa/assets/UI/Comfy_Logo_x128.png)（[GPL-3.0-only](https://github.com/Comfy-Org/desktop/blob/e2d964b7456cea8423c7b9d3371c612313c06baa/LICENSE)）：Official standalone ComfyUI icon from its GPL-licensed Desktop distribution. This identifies ComfyUI itself, not a custom node, third-party image model or provider.
- [organic-maps](https://raw.githubusercontent.com/organicmaps/organicmaps.github.io/03a7e35175938d9b8b6988d1ca2ab8c7ea052563/static/logos/green-on-transparent.svg)（[官网资源许可](https://github.com/organicmaps/organicmaps.github.io/blob/03a7e35175938d9b8b6988d1ca2ab8c7ea052563/LICENSE)）：Official green standalone logo from the website’s project assets, not from the application UI or map datasets.

### 运动应用媒体包图标

- [jefit](https://www.jefit.com/press-media/jefit-media-kit-2026-09.zip)（[媒体素材](https://www.jefit.com/press-media)）：Official blue 1024px Jefit app icon from jefit-media-kit-2026-09/app-icon/jefit-app-icon-blue-1024.png. Provided by Jefit for coverage of the official application.
- [fitbod](https://fitbod.pressdeck.io/storage/images/fitbod-uaw-N.png)（[媒体素材](https://fitbod.pressdeck.io/media/logos)）：Original square press-kit icon supplied by Fitbod; design and palette cross-checked against the 512px app artwork distributed for Fitbod Inc. App Store ID 1041517543.
- [trainerroad](https://www.dropbox.com/sh/7oz6tjqobdqk5hs/AACKcU-PUvZmB7CTrkVPI5Uxa?dl=1)（[媒体包和品牌规范](https://www.trainerroad.com/press)）：Official red TrainerRoad logo badge (Branding/Logos/Web/TrainerRoad-Logo-Primary.png). Original bytes; product name is nearby. Keep the square red badge intact with the ¼-inch minimum display height and one third of the badge height clear from the product name, per the supplied guide.

### 品牌媒体包与官方标志补充

- [appwrite-cloud](https://appwrite.io/assets/logomark/logo.svg)（[品牌资料](https://appwrite.io/assets)）：Official compact pink logomark published for use in limited space on a neutral background. The SVG matches the Appwrite repository’s brand asset at 48187a59af1a1f5151282577aa4b64a92c0b33c0, byte for byte. Used here only for the Appwrite-hosted service, not a third-party integration or partner badge.
- [moho](https://drive.google.com/file/d/1fM7Be_PBlZzSyc-nxa6T5XkI-tSnafBb/view)（[品牌资料](https://drive.google.com/drive/folders/1LAJ_MYDeLJmKVaUHzxBF_BQxjug4SR4-?usp=sharing)）：Official Moho Pro 14 app icon (logo/pro/moho-pro-14-icon_RGB.png), supplied alongside the Lost Marble 14.5 SHOWTIME media materials. The Moho catalog entry discusses Pro; no reuse as the Debut version, a publisher mark, or a decorated SHOWTIME wordmark.
- [rclone](https://raw.githubusercontent.com/rclone/rclone/65fa9e66768a2f0f0cd2bdcf78bba2e4e68e6371/graphics/logo/logo_symbol/logo_symbol_color_256px.png)（[品牌资料](https://github.com/rclone/rclone/blob/65fa9e66768a2f0f0cd2bdcf78bba2e4e68e6371/graphics/logo/README.md)）：The official standalone color three-ring symbol from the upstream logo pack, not the wordmark, generic favicon, or a third-party GUI mark. The project maintainer points readers to this pack for use in rclone-related software at https://forum.rclone.org/t/a-new-logo-for-rclone/7019/39. Compare only identifies Rclone itself. See the repository notice below.
- [ilovepdf](https://www.ilovepdf.com/mediapress/iLovePDF_logos.zip)（[品牌资料](https://www.ilovepdf.com/press)）：The publisher offers a logo archive for press coverage. This is the supplied standalone iLovePDF_heart_icon.svg, not the parent company wordmark, an unrelated iLoveIMG mark, a favicon or a crop from a mockup. Used only to identify the iLovePDF PDF toolkit.
- [freefilesync](https://sources.debian.org/data/main/f/freefilesync/13.7-4/FreeFileSync/Build/Resources/Icons.zip)（[品牌资料](https://sources.debian.org/data/main/f/freefilesync/13.7-4/debian/copyright)）：The supplied 128px FreeFileSync.png launcher, from the GPL-licensed Debian source package, matches the FreeFileSync desktop entry. Not the separate RealTimeSync.png launcher, a generic icon, or an extraction from the current differently licensed installer. Debian’s file-wide copyright entry places this asset under GPL-3.0-or-later; see the copied license.
- [cadcraft](https://raw.githubusercontent.com/storytold/cadcraft/19810671877a39abee9bd0866bad579626feda21/assets/app-icon/hicolor/128x128/apps/ai.storyteller.cadcraft.png)（[品牌资料](https://github.com/storytold/cadcraft/blob/19810671877a39abee9bd0866bad579626feda21/ATTRIBUTION.md)）：The stable CADCraft hicolor 128px application icon shipped to Linux docks and menus, explicitly dual-licensed in upstream asset attribution. This is not the nightly alternate icon or the separately protected ArtCraft wordmark. The complete MIT text is included.
- [deckcraft](https://raw.githubusercontent.com/storytold/deckcraft/62b8306b698c32e449de443e35c8223c6b579365/assets/app-icon/hicolor/128x128/apps/ai.storyteller.deckcraft.png)（[品牌资料](https://github.com/storytold/deckcraft/blob/62b8306b698c32e449de443e35c8223c6b579365/ATTRIBUTION.md)）：A custom slide-on-a-stand illustration now shipped by the upstream stable packaging; the project calls it interim artwork while a mascot is pending. Not the separate ArtCraft team trademark or the darker nightly artwork. Upstream explicitly dual-licenses the app artwork; the full MIT notice is copied below.
- [gridcraft](https://raw.githubusercontent.com/storytold/gridcraft/3bed16aea84fccaad30bad94ef465521e9650aeb/assets/app-icon/hicolor/128x128/apps/ai.storyteller.gridcraft.png)（[品牌资料](https://github.com/storytold/gridcraft/blob/3bed16aea84fccaad30bad94ef465521e9650aeb/assets/app-icon/LICENSE.txt)）：The current upstream stable app icon is hand-drawn spreadsheet geometry, not any vendor mark. Upstream labels it temporary pending a mascot. Upstream explicitly dual-licenses the app artwork; the full MIT notice is copied below.
- [wordcraft](https://raw.githubusercontent.com/storytold/wordcraft/72ca96a27c795d6289775f6c12954c2cdbd62908/assets/app-icon/hicolor/128x128/apps/ai.storyteller.wordcraft.png)（[品牌资料](https://github.com/storytold/wordcraft/blob/72ca96a27c795d6289775f6c12954c2cdbd62908/ATTRIBUTION.md)）：The stable WordCraft page-and-pen application artwork from upstream, marked interim until its mascot is drawn. Not the ArtCraft header mark or nightly alternate. Upstream explicitly dual-licenses the app artwork; the full MIT notice is copied below.
- [soundcraft](https://raw.githubusercontent.com/storytold/soundcraft/8f20500c9d11c6b2dfc73f64dab8b903847030d2/assets/app-icon/hicolor/128x128/apps/ai.storyteller.soundcraft.png)（[品牌资料](https://github.com/storytold/soundcraft/blob/8f20500c9d11c6b2dfc73f64dab8b903847030d2/ATTRIBUTION.md)）：The teal engraved nightingale shipped in upstream stable packages. Upstream calls the current drawing interim artwork; it is distinct from both the nightly artwork and parent ArtCraft mark. Upstream explicitly dual-licenses the app artwork; the full MIT notice is copied below.
- [outline](https://raw.githubusercontent.com/OutlineFoundation/outline-apps/2bba18270659ab75b469c5a79a1b955c43d58899/docs/resources/logo_client.png)（[品牌资料](https://github.com/OutlineFoundation/outline-brand/blob/d8ddfd4891fe5def3e74f559dae970c9e026bfde/outline_brand_user_guide.pdf)）：Exact Outline Client graphical mark that upstream specifically displays beside the Client entry in its repository README. The current official guide distinguishes this same green-black square from Outline Manager, the umbrella brand and the Powered by Outline partner mark, and permits third-party reference use. Compare uses it only to identify the client in its VPN client category; the product detail links to getoutline.org.

### 官方应用图标与标志补充

- [launchbar](https://obdev.at/downloads/press/LaunchBar6-PressKit.zip)（[品牌资料](https://obdev.at/en/press/index.html)）：Exact LaunchBar 6 high-resolution App Icon.png under Product Icon in the publisher’s public press kit. No use of the separate Extensions Icon or the corporate wordmark. Use as a third-party reference on the LaunchBar catalog entry.
- [tidal](https://assets.tidal.com/press/TIDAL-Logo%26Fonts-2021Q4.zip)（[品牌资料](https://developer.tidal.com/documentation/guidelines-design-guidelines-2_0)）：The exact standalone black RGB TIDAL Diamond from Logo/TIDAL Icon/RGB/PNG/icon-black-rgb.png in the manufacturer’s public press pack (https://tidal.com/press). The brand guidance permits the diamond in compact placements with the supporting uppercase TIDAL name; used against the existing white chip. Not the wordmark lockup, partner logo or album art.
- [fl-studio](https://drive.google.com/file/d/1DbgiewJc6hDsHUFGztyHdimAF_KKs-Gg/view)（[品牌资料](https://www.image-line.com/press)）：Exact standalone FL Studio desktop fruit from the Image-Line public press kit, Logos / FL Studio / FL Studio Fruit128w.png. Not the FL Cloud logo, Mobile logo, full lockup, or installer icon. The kit guidance at https://docs.google.com/document/d/1vLNmkYf_z51RTgzJTkBFLasDlhT39uUZU-nBsIVbhRo/view explicitly covers reviews and news, prohibits alteration and implied endorsement. The 129 × 202 publisher PNG is hosted byte-identically; no text or copyright notice is embedded in this PNG.
- [conductor](https://www.conductor.build/brandkit/conductor-letter-dark.png)（[品牌资料](https://www.conductor.build/brandkit)）：Conductor’s own Mac app brand kit labels this the standalone dark letter mark for use on light backgrounds. The official file is 677 × 1024 with alpha, distinct from their full wordmark and the parent company identity. Used only as a neutral identifier of the named product. The kit does not state a separate license or minimum size.
- [figma-design](https://www.figma.com/design/)（[品牌资料](https://www.figma.com/using-the-figma-brand/)）：Exact 24-by-24 light-blue pen-nib Figma Design product badge from the official Figma Design page heading. The identical SVG geometry, palette and rounded tile appear beside Figma Design in the publisher navigation, and the design team describes this distinct product icon system at https://www.figma.com/blog/the-making-of-a-product-icon/. Not the Figma corporate five-part mark, suite desktop tile, or Apple/Windows download illustration. Used only to identify Figma Design under the informational reference guidance.
- [cinema-4d](https://mxwebnuxtprod01.blob.core.windows.net/media/images/Branding/Cinema_4D_202512.zip)（[品牌资料](https://www.maxon.net/en/about-maxon/branding)）：Exact primary badge from Maxon’s product-specific official media kit (Cinema 4D/Mark/Primary/Maxon_Cinema_4D_Mark_Primary.png). The blue-purple icon with its original full hexagonal container is the Cinema 4D mark from the unified 2025 product logo system; not Maxon One, Cineware, Redshift, a wordmark crop, or the old silver sphere. Publisher provides this kit for third-party reviews, articles and news; the asset identifies only Cinema 4D in this editorial comparison.
- [alfred](https://www.alfredapp.com/media/logo4.png)（[品牌资料](https://www.alfredapp.com/terms/)）：The publisher’s current Alfred product landing page labels this image both Alfred Logo in the header and Alfred Hat beside the Alfred app’s feature list. The unaltered black hat, purple band, and magnifying glass together identify the macOS launcher, not a workflow, a version badge, or another Alfred product. Source is published product artwork, not an extraction from the app bundle. Alfred is a registered trademark of Running with Crayons Ltd.
- [betterzip](https://macitbetter.com/img/betterzip-6-icon-256.png)（[品牌资料](https://macitbetter.com/library/betterzip/articles/whats-new-in-betterzip-6/)）：Exact transparent 256px variant of the current BetterZip 6 kokedama app icon in the publisher’s product materials. MacItBetter identifies the moss ball in the upgrade announcement and independently in its BetterZip 6 launch article at https://macitbetter.com/blog/BetterZip-6.0/. Not the previous version’s icon, its Finder extension, or any archive-format badge.
- [bandizip](https://www.bandisoft.com/img.front/bandizip_logo.svg)（[品牌资料](https://www.bandisoft.com/about/)）：The publisher’s public product directory labels this specific blue lightning-in-circle composition Bandizip Logo and links it on the Bandizip product card, separately from Bandisoft’s corporate identity, BandiView and Honeycam. Original public web artwork, not a copied program resource, optional file association skin, or macOS-only store artwork. For identification of the cross-platform product family.
- [ocenaudio](https://www.ocenaudio.com/imgs/logo.png)（[品牌资料](https://www.ocenaudio.com/en/)）：The publisher’s homepage explicitly separates the standalone orange headphones character marked as its logo from the neighboring waveform and ocenaudio word art. This is the named cross-platform desktop audio editor, not a waveform sample or an OS download badge. The same web artwork also identifies the editor in the audio recorder category.
- [keka](https://www.keka.io/img/Keka-Square-512x512.png)（[品牌资料](https://terms.keka.io/)）：The publisher uses this full 512px glossy zippered pack in the Keka desktop page’s product hero, rather than only as browser metadata, and repeats the design in the app and dock illustrations. Not the older mascot, Keka for iOS QR code, a file type badge, or a different developer’s artwork.
- [fitnotes](https://www.fitnotesapp.com/images/FitNotes_Logo.png)（[品牌资料](https://www.fitnotesapp.com/)）：The exact standalone calendar-and-dumbbell icon published by the Android app’s developer. The same image geometry and colors appear in the linked Google Play listing for com.github.jamesgay.fitnotes, ruling out similarly named iOS products. Source is the developer’s own app artwork, not Google Play UI or a store badge.

### 官方应用图标与标志补充

- [quarkxpress](https://www.quark.com/assets/icon_qxp.webp)（[品牌资料](https://www.quark.com/quark-brand-guidelines)）：Exact approved standalone icon from Quark’s Product Logos > QuarkXPress > Icon subsection, not the corporate Quark eyeball or the CopyDesk derivative. Preserves the trademark symbol in the upper-right from the official artwork, as required in that subsection. No layout or product copy change.
- [snipaste](https://www.snipaste.com/img/logo.svg)（[品牌资料](https://www.snipaste.com/eula.html)）：The standalone angular four-color logo is presented beside the product name on the official public homepage and alongside Snipaste downloads. Not extracted from the application or installer, an OS identifier, a vendor mark, or a homemade reconstruction. The publisher’s EULA governs the software itself; this is an editorial reference with separately published web artwork.
- [cloudconvert](https://static.cloudconvert.com/build/assets/logo_without_border-BolpxNjG.svg)（[品牌资料](https://cloudconvert.com/terms)）：The official conversion service homepage labels this standalone cloud with red circular arrows as CloudConvert Logo, distinct from Lunaweb corporate artwork. The publisher file and its exact hash are retained as source text, not served as executable SVG. Rendering uses only the local shapes and gradient definitions and preserves the original geometry and color.
- [macwhisper](https://impresskit.net/file-download/090c23b4-3b32-4644-b13d-b2d3dc8cf485)（[品牌资料](https://impresskit.net/7b2dbf2b-8e97-48d9-afd6-c6c4b3ce28c2/files)）：The developer’s MacWhisper press kit, linked to the verified MacWhisper product and developer profiles, provides the exact App Icon 1024 original. Bold blue tile and silver microphone, not OpenAI’s Whisper mark, a store badge, or UI screenshot. The developer independently distinguishes the direct macOS app from the App Store name in https://docs.macwhisper.com/article/40-macwhisper-whisper-transcription-difference. Used only for editorial identification of the desktop product.
- [permute](https://software.charliemonroe.net/assets/img/permute/v4/icon.webp)（[品牌资料](https://software.charliemonroe.net/permute/)）：Exact 1024px Permute 4 media converter robot head as published in its own product hero, with silver body, colored lens eyes and pixel bars. Not the company's spider mark, Downie, or prior version artwork. The China sales authorization concerns selling/redistributing the software, not this unrelated editorial product reference.
- [needle-engine](https://brand.needle.tools/logos/logo_no_padding.png)（[品牌资料](https://brand.needle.tools/#identity)）：Official exact compact color-only symbol, same three green-yellow columns used by the publisher in the Needle Engine product context. The official identity guide expressly calls for the color symbol in small placements with the name nearby; the existing label reads Needle Engine. No replacement wordmark, background change, or app toolbar icon substitution.
- [just-press-record](https://www.openplanetsoftware.com/images/p/jpr-84.png)（[品牌资料](https://www.openplanetsoftware.com/just-press-record/)）：Exact public 2x product icon accompanying the Just Press Record name in the publisher’s product header. Only the original 84px PNG is served, not the Watch banner, waveform screenshot, a different publisher product, or an app package resource.
- [wise-disk-cleaner](https://www.wisecleaner.com/static/img/product/wise-disk-cleaner/wisefolderhider_icon.png)（[品牌资料](https://www.wisecleaner.com/wise-disk-cleaner.html)）：Exact independent desktop product art: disk with a small green cleaning bottle. Despite the generic reused basename, the publisher places the 504px image in the Wise Disk Cleaner product-specific directory and explicitly labels the image wise disk cleaner logo on that product's hero. The separate Wise Folder Hider and WiseCleaner corporate marks are not used.
- [picpick](https://picpick.app/static/logo-74929f92cead79160a18846cfc0e703b.png)（[品牌资料](https://picpick.app/en/)）：Exact current four-stripe PicPick web/app product mark, used beside PicPick on the developer's official desktop tool homepage and explicitly named PicPick logo on its official pricing page. This is the current product identity, not the former palette artwork, NGWIN corporate name, feature illustration or software resource.
- [onyx](https://www.titanium-software.fr/images/icons/onyx27.png)（[品牌资料](https://www.titanium-software.fr/en/onyx.html)）：The publisher's current OnyX product page shows the violet, silver X square beside the current stable release. It is public product-page artwork, not the older blue or OS-specific alternate, a generic macOS mark, or the publisher's Maintenance utility. The publisher's license at https://www.titanium-software.fr/en/license.html covers the software; no software or installer resource is distributed.
- [pake-app](https://pake.run/img/mark.png?v=1e72546fa6ae)（[品牌资料](https://pake.run/terms)）：Exact separate 96px web mark shown beside Pake on the official desktop product landing page, not merely a browser tab image. The desktop release notes explicitly identify the parent and baby motif (https://pake.run/releases). The CLI icon of the family is tracked separately with its own upstream asset; this version comes from the desktop product site and does not borrow its CLI license. No changes to the mark bytes, and no bundling of the desktop app.
- [photopea](https://www.photopea.com/promo/icon512.png)（[品牌资料](https://www.photopea.com/privacy.html)）：The publisher explicitly labels this 512px teal-and-white spiral square Photopea logo beside the name Photopea on the product homepage, not just in browser metadata. The icon is a publisher promotional file, distinct from media edited with the product, an operating-system image, or a generic editor symbol. Used in the comparison only to identify the listed product.

### 官方应用图标与标志补充

- [bandicam](https://static.bandicam.com/company/bandicam-official-logo-icon.png)（[品牌资料](https://www.bandicam.com/company/logo/)）：Bandicam Company’s public branding page labels this the official Bandicam screen recorder icon, separately from the Bandicut product and corporate artwork. The publisher requires its supplied format without changes to color, proportions or effects; this is the original transparent 512×512 PNG, unaltered.
- [reveal-js](https://revealjs.com/images/logo/reveal-symbol.svg)（[品牌资料](https://revealjs.com/)）：Exact colored standalone reveal.js framework symbol shown in the official site’s narrow layout with the alt text reveal.js logo. It is the separate symbol published directly by the project, not the Slides service logo, an application screenshot, or a symbol cut out of the wider wordmark. Used only as an editorial reference to the named framework.
- [intervals-icu](https://www.intervals.icu/_astro/intervals-logo-round.B4Qne2Qz.svg)（[品牌资料](https://www.intervals.icu/)）：Current standalone circular mark in the official header and footer, both labeled Intervals.icu. The existing card refers to the training platform itself, not an API integration or an endorsed partner. The publisher’s founder has also identified the matching pulse motif in its earlier square variant; the current circular asset is used here.
- [porkbun](https://porkbun.com/images/porkbun-logo-1200x1200.png)（[品牌资料](https://porkbun.com/about)）：Publisher-supplied square social logo for the domain registrar, corroborated by the registrar’s official description of its pig logo. The original pink-and-white registrar mark is distinct from the black decorative pig and the registrar’s other service providers. No marketing partnership or endorsement is implied.
- [unite-pro](https://static.wixstatic.com/media/598d4a_31e72493e095442eadfee5814ac0575e~mv2.png)（[品牌资料](https://www.bzgapps.com/unite)）：The official product page identifies this publisher-hosted artwork as Unite Pro-macOS-Default-256x256_2x.png in multiple visible placements. This is the standalone purple Unite Pro macOS application icon, not the other BZG products or a browser tab icon. The image comes from the public product page, not the program bundle; used as a reference to the named product.
- [creem](https://www.creem.io/new-branding/Logo/SVG/creem%20logo%20icon_black.svg)（[品牌资料](https://www.creem.io/)）：Creem’s public commercial product homepage references this standalone solid graphite symbol under its current new-branding Logo assets, separately from the horizontal lockup and customer store logos. Used solely in editorial identification of Creem’s own merchant-of-record service, not to indicate any merchant relationship or payment integration.
- [advanced-systemcare](https://download.iobit.com/mediaresource/icon/asc_icon.png)（[品牌资料](https://www.iobit.com/de/pressroom.php)）：IObit’s public press room separately publishes a Product Icon (RGB PNG) for Advanced SystemCare. The blue C-in-circle identity is corroborated by the current Advanced SystemCare product page and distinguished there from Advanced SystemCare Ultimate. This catalog uses the publisher’s exact supplied PNG bytes, for editorial identification only.
- [pia](https://media.githubusercontent.com/media/pia-foss/desktop/13fc29e12f0374b61f18e396e7e44a39948aa27c/brands/pia/icons/app-linux.png)（[品牌资料](https://github.com/pia-foss/desktop/blob/13fc29e12f0374b61f18e396e7e44a39948aa27c/LICENSE.txt)）：Canonical green-lock icon from the exact Private Internet Access Desktop Client brand assets. This publisher-supplied full-color Linux variant preserves the same lock and face as the macOS icon without the macOS tile background. The original PNG matches the pinned upstream Git LFS SHA-256 and is served unchanged. The upstream copyright license covers original content unless separately noted; the mark is used only to identify the unmodified VPN product.
- [zettlr](https://raw.githubusercontent.com/Zettlr/Zettlr/2f7ef93ec961c9b21710bb672b8b3bfa22e4fec3/resources/icons/png/256x256.png)（[品牌资料](https://www.zettlr.com/press)）：The publisher’s press terms explicitly allow use when directly comparing Zettlr with other software. The green square and white Z match the press logo. This 256×256 PNG is a separately published official app-resource variant at a pinned upstream commit; it is shipped byte-for-byte at its original dimensions rather than modifying the 512×512 press download. The mark is only used for product identification, not as Compare branding.
- [top-calendar](https://topcalendar.guojiubo.work/assets/AppIcon-64.png)（[品牌资料](https://topcalendar.guojiubo.work/)）：Exact 128×128 PNG published as the standalone app icon on the developer’s current public product site. The same blue and cyan calendar design appears on Apple’s listing for the matching Mac bundle com.guojiubo.app.easycalendar. The web-published PNG is served unchanged; no icon is extracted from the installed app.
- [mapy-com](https://o-seznam.cz/wp-content/uploads/2025/10/mapy-com-logo-1.zip)（[品牌资料](https://o-seznam.cz/ke-stazeni/loga/mapy-com/)）：Exact square application symbol (mapy-com-symbol-aplikace-ctverec/mapy-com-symbol-aplikace-rgb-2.svg) from the publisher’s public Mapy.com logo download. The stand-alone green gradient and white M identify the navigation app, not the API, Premium plan, or an older Mapy.cz brand. The press kit’s full lockup is not cropped or reused. Original proportions and supplied color are preserved.
