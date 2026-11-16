# 国外支付平台分类封面验收（2026-11-16）

- 关联 Issue #345，分类 `international-payments`；背景 #F4E6EF，采用仓库原生 SVG，不使用主封面提示词。
- 已阅读 `category-cover-workflow.md`；保留原 `code-editors.svg` 的 480×260 容器、22px 稀疏点阵、角落白色椭圆与轻阴影。白色商户结算卡片配小地球、浅粉圆形确认对勾，少量黑色细节，无品牌、金额、文字、外链资源或脚本。
- 登记类别场景后使用 `node scripts/category-cover-prompt.mjs international-payments` 生成 `international-payments-prompt.txt`。
- 使用 Sharp 将新图与原始 `cleaners.svg`、`code-editors.svg` 并排栅格渲染，并实际打开两张 PNG 目视检查：
  - `previews/payment-covers-desktop.png`：每图宽 300px，左清理、中支付、右编辑器。
  - `previews/payment-covers-mobile.png`：390px 画布，每图宽 350px，上清理、中支付、下编辑器。
- 目视结果：底色、点阵、白色主体、投影及留白延续原系列；商户卡片、地球和对勾在两种尺寸清楚可辨，未见主体裁切、破图、文字或品牌标志。
- 这些 PNG 是 SVG 栅格对照，不是实际网页截图。本次没有完成实际网页桌面/390px 验收；完整测试、最终 CI 与网页检查由整批实现后补充，不以插画预览替代。

## 真实网页验收完成

CI [43849173000](https://github.com/anthonyli/software-compare/actions/runs/43849173000)，head `eefb158a0d4aef45c9e669d2209af11b65fb55de` 全绿；已下载 artifact `14216852813` 的7张实际截图（1280/390首页、中英比较页及详情）。目视封面同系列、无破图或页面横向溢出；桌面宽表在自身容器横向滚动并有提示，不是页面溢出。移动卡片展示网站、KYC与大陆主体条件，不只显示能力图标；英文无中文字段泄漏，交易价格为 `4% + USD 0.40/successful transaction` 等，不误显示美元百分比或月费。详情与列表一致。原两张栅格预览仅用于插画对照，实际网页截图来自真实 Worker E2E，未模拟支付接口或创建外部商户账户。上传保留7天，可由后续CI重生；最终合并仍要求最终提交CI成功。

独立目视复核同样通过。截图未展开折叠详情，不把折叠的完整费用附注计作已逐项目视；该部分由源码/官方证据与回归测试核查。
