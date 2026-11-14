# Storytold 第二批分类核实（2026-11-14）

关联 Issue #40。新增文字处理、电子表格、演示文稿、二维 CAD、纹理与材质五类，共 11 项：WordCraft/Writer、GridCraft/Calc、DeckCraft/Impress、CADCraft/LibreCAD、TextureCraft/MaterialCraft/Material Maker。

## 证据与取舍

- Storytold 六款读取当前 main README，各产品 sources 列出准确地址与许可文件；仅文档核实，未安装运行。自评完成度不当作质量或成熟度实证。
- WordCraft 的图表、SmartArt、分页和原生打印仍有缺口。GridCraft 的函数清单不是全部可工作的实现。DeckCraft 的 PPTX 与复杂动画不得写成完全兼容。
- CADCraft 文档明确未建模实体保存后丢弃，醒目标明不覆盖唯一原件。LibreCAD master 为预发布，DWG 取决于 DWGSUPPORT 构建；二维分类不与完整三维实体 CAD 混用。
- TextureCraft README 同时有下载模板和首次签名发布待办，保留冲突边界，不假设正式包可用。MaterialCraft 全 SBS 库加载和参考应用渲染一致性待完成。Material Maker 三维绘制仍 experimental。
- LibreOffice 使用当前 /licenses/ 和 /download/，不沿用已跳转至首页的 discover 子页。功能证据来自 help.libreoffice.org 的 Writer/Calc/Impress 功能页及 Office 文件兼容页。许可证 MPL-2.0，第三方组件另计。
- Material Maker itch 页面支持免费或自愿付费，Steam 未核价格；与 Substance 的工程互通不作承诺。
- Craft Launcher 为套件安装更新器，暂不塞入 Alfred/Raycast 式启动器类别。本批也不新增无足够独立软件证据的框架/依赖仓库。

## 设计验收

五图沿用原 code-editors SVG 容器：480×260、22px 点阵、角落白椭圆、白色主体、黑色细节和轻投影。分别登记于 category-cover-spec.json，运行组合提示词命令。未改已有图或主封面提示词。

与原 code-editors、screen-recorders 并排检查，预览见 `docs/design/previews/storytold-batch2-desktop.png` 和 `storytold-batch2-mobile.png`。1280/390 像素宽静态联系表中主体清晰、留白和点阵一致，无裁切、品牌或图内文字。

渲染方法与局限：本机 Chromium 因 socket 权限无法启动；使用 Inkscape 渲染。其版本不支持 feDropShadow，临时预览副本将该滤镜展开为等价的 blur/offset/composite/merge，仓库 SVG 原滤镜保持不变。PNG 为静态卡片尺度对照，不是已运行网站的浏览器截图。完整网站桌面/手机浏览验证待 CI；不以静态图代替功能测试。

## 本地检查

- `npm run check:covers`：2 项通过。
- `npm test`：31 项通过。
- `npm run build`：未完成，当前工作树未安装 Astro（`astro: not found`）。
- `npm run test:e2e`：未完成，本机命令报 `unknown command 'test'`，没有把它计为通过。新增浏览器用例覆盖 5 类的 1280/390 宽度产品可见性与无横向溢出，待最终提交 CI 运行。
