# 网站部署分类封面验收（2026-11-16）

- Issue #353；分类 `web-hosting`；淡蓝灰背景 #E5EDF4。实现侧需同步分类底色。
- 已阅读分类封面工作流，沿用原 `code-editors.svg` 的 480×260 横构图、22px 稀疏点阵、边角白色椭圆、白色主体及轻阴影；场景为浏览器页面与云朵向上箭头。未使用主封面提示词、文字、品牌或外链资源。
- 场景登记于 `category-cover-spec.json`；通过 `node scripts/category-cover-prompt.mjs web-hosting` 生成 `web-hosting-prompt.txt`。
- 使用 Sharp 生成并实际打开两张对照 PNG 目视检查，原始参考为 `cleaners.svg`、`code-editors.svg`：
  - `previews/web-hosting-covers-desktop.png`：各图 300px 宽，左清理、中网站部署、右代码编辑器。
  - `previews/web-hosting-covers-mobile.png`：390px 画布内各图 350px 宽，上清理、中网站部署、下代码编辑器。
- 目视结果：粉彩、点阵密度、白色主体、黑色细节、光斑和投影属于同一系列；页面与上传云朵在两种尺寸均可辨认，主体大小与留白接近原图，未见裁切、破图或多余文字标志。
- 以上仅为插画 SVG 栅格对照，不是真实网页截图。实际网页桌面及 390px 验收、完整站点测试与最终 CI 由整批实现后补充；本次没有把这些未执行项记为通过。
