# 国外支付平台分类封面验收（2026-11-16）

- 关联 Issue #345，分类 `international-payments`；背景 #F4E6EF，采用仓库原生 SVG，不使用主封面提示词。
- 已阅读 `category-cover-workflow.md`；保留原 `code-editors.svg` 的 480×260 容器、22px 稀疏点阵、角落白色椭圆与轻阴影。白色商户结算卡片配小地球、浅粉圆形确认对勾，少量黑色细节，无品牌、金额、文字、外链资源或脚本。
- 登记类别场景后使用 `node scripts/category-cover-prompt.mjs international-payments` 生成 `international-payments-prompt.txt`。
- 使用 Sharp 将新图与原始 `cleaners.svg`、`code-editors.svg` 并排栅格渲染，并实际打开两张 PNG 目视检查：
  - `previews/payment-covers-desktop.png`：每图宽 300px，左清理、中支付、右编辑器。
  - `previews/payment-covers-mobile.png`：390px 画布，每图宽 350px，上清理、中支付、下编辑器。
- 目视结果：底色、点阵、白色主体、投影及留白延续原系列；商户卡片、地球和对勾在两种尺寸清楚可辨，未见主体裁切、破图、文字或品牌标志。
- 这些 PNG 是 SVG 栅格对照，不是实际网页截图。本次没有完成实际网页桌面/390px 验收；完整测试、最终 CI 与网页检查由整批实现后补充，不以插画预览替代。
