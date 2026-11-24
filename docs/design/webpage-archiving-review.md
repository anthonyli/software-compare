# 网页离线存档分类封面

- Slug：`webpage-archiving`。首页归入「文件工具」，与 ZIP/7z 压缩工具分开。
- 设计规格：`category-cover-spec.json`；用 `node scripts/category-cover-prompt.mjs webpage-archiving` 组合提示词。
- SVG：`site/public/categories/webpage-archiving.svg`，480×260。浅绿底与稀疏点阵、对角白椭圆光斑，白色浏览器页面与独立纸张、黑色保存箭头；没有文字、外链、品牌标志或水印。
- 将新图与原始 `cleaners`、`screen-recorders` 在 250 px 与 170 px 宽度并排栅格化并目视检查。图形比例、留白与现有系列一致；缩小后仍可识别网页轮廓与保存箭头，没有裁切。实际页面响应式验收单列于测试结果，不用缩略图代替浏览器测试。
