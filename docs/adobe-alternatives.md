# Adobe 工作流与开源替代索引

核实：2026-11-14（UTC+8）。这是按任务选择的索引，不是“一款软件完全平替 Adobe 全家桶”。各项官方来源、平台、许可和限制见对应产品比较表。本轮只核查资料，未安装这些产品，也未实测格式往返。

| Adobe 工作流 | 站内分类 | 已收录的开源选项 | 选择与迁移边界 |
|---|---|---|---|
| Photoshop：修图、图层合成、绘画 | [图像编辑](https://compare.pageon.cc/c/image-editors/) | GIMP、Krita、Pinta、PhotoDemon、Pixelitor | GIMP 偏综合图像编辑，Krita 偏绘画，Pinta 偏轻量操作，PhotoDemon 偏 Windows 便携批处理，Pixelitor 偏 Java 图层/滤镜。PSD 导入不代表智能对象、效果、字体及插件无损。 |
| Illustrator：矢量插画 | [矢量设计](https://compare.pageon.cc/c/vector-graphics/) | Inkscape；Penpot 仅适合界面设计/原型场景 | SVG 工作流与原生 AI 印刷工作流不同；应以真实样稿核对字体、渐变、裁切和色彩。 |
| Lightroom Classic：RAW 显影和照片管理 | [摄影处理](https://compare.pageon.cc/c/photo-management/) | darktable、RawTherapee、digiKam、ART | 显影与图库管理分开比较；元数据可以交换不等于 Adobe 调整参数、预设、目录或云同步可迁移。 |
| Premiere：时间轴剪辑 | [视频剪辑](https://compare.pageon.cc/c/video-editors/) | Kdenlive、Shotcut、OpenShot、Olive、Flowblade、Pitivi、LosslessCut | LosslessCut 偏无损裁切，不等价完整 NLE。PRPROJ、效果、字幕和代理素材需另验。DaVinci Resolve 虽有免费版，但不是开源。 |
| After Effects：动效/合成 | [合成](https://compare.pageon.cc/c/compositing/)、[二维动画](https://compare.pageon.cc/c/animation-2d/)、[三维制作](https://compare.pageon.cc/c/animation-3d/) | Natron、Synfig Studio、OpenToonz、Blender | Natron 偏节点合成；其余按动画任务选用。不能据此承诺 AEP、表达式、模板及插件直接互通。 |
| InDesign：书刊/印前排版 | [桌面排版](https://compare.pageon.cc/c/desktop-publishing/) | Scribus | 排版能力不等于 INDD 编辑；IDML 交换仍需逐页检查字体、溢文、链接资源及印刷输出。 |
| Acrobat：PDF 阅读、整理、OCR、标注 | [PDF 工具](https://compare.pageon.cc/c/pdf-tools/) | Stirling PDF、PDFsam、PDF Arranger、Okular、Xournal++、NAPS2、LibreOffice、Sumatra PDF | 阅读器、扫描/OCR、页面整理和全文编辑不能混为一谈；签名图像也不等于证书签名。 |
| Audition：录音、剪辑、多轨混音 | [音频编辑](https://compare.pageon.cc/c/audio-editors/) | Audacity、Ardour、Tenacity、Qtractor、LMMS、Zrythm、Hydrogen | 波形编辑、DAW、MIDI 与鼓机不是同一任务；插件格式、工程迁移、声卡及平台需检查。REAPER 是商业软件，不是开源。 |

## 本轮新增资料核验

- [Pinta 官方仓库](https://github.com/PintaProject/Pinta)：MIT；.NET/GTK 技术栈，Windows/macOS/Linux。其他图标、依赖各有许可。
- [PhotoDemon](https://photodemon.org/) / [许可](https://photodemon.org/license/)：BSD-2-Clause 主项目，第三方库分别授权；原生 Windows，宏/批处理和 PSD 支持不构成完整 Photoshop 兼容保证。
- [Pixelitor 官方仓库](https://github.com/lbalazscs/Pixelitor)：GPL-3.0，Java；主分支构建依赖不等于每个发行包的运行依赖。
- [ART](https://artraweditor.github.io/) / [下载](https://artraweditor.github.io/Downloads.html)：GPL-3.0；RAW、局部蒙版和 .arp 处理配置；macOS 发行包由第三方提供，不是统一平台官方安装包保证。
- Adobe 官方产品页：[Photoshop](https://www.adobe.com/products/photoshop.html)、[Illustrator](https://www.adobe.com/products/illustrator.html)、[Lightroom Classic](https://www.adobe.com/products/photoshop-lightroom-classic.html)、[InDesign](https://www.adobe.com/products/indesign.html)、[After Effects](https://www.adobe.com/products/aftereffects.html)。商业对照项不填未经核实的统一价格，不把桌面、移动和 Web 功能混合为同一个版本。

开源许可允许商用不代表素材、字体、专利编解码器或第三方插件自动获授权；再分发和修改须遵守对应许可。M4 16GB 未进行运行验证，不承诺复杂工程性能。

## 后续扩展原则

新增产品必须带来不同的任务覆盖，而非仅增加数量。Bridge/素材管理、Animate、Media Encoder、Substance 等可继续逐一核实；不要因为上述八组已覆盖，就标称“完整 Adobe 全家桶”。比较表中的 unknown 应保留为待核实，不当成不支持。
