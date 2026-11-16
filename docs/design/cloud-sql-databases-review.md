# 云 SQL 数据库分类封面验收（2026-11-16）

- 关联 Issue #355；分类 `cloud-sql-databases`；背景 #E3F0EB。仅本地设计准备，基线 main `346603e`，未提交或发布。
- 已阅读 CONTRIBUTING 与分类封面工作流。沿用原始 `code-editors.svg` 容器：480×260、22px 稀疏点阵、白色角落光斑及轻阴影；新主体为白色数据库圆柱、云朵及浅青绿表格卡片，以少量黑色弧线和连接线表现关系数据存储。未复用 web-hosting 文件或主封面提示词。
- 配色及独立场景登记于 `category-cover-spec.json`；执行 `node scripts/category-cover-prompt.mjs cloud-sql-databases`，结果保存为 `cloud-sql-databases-prompt.txt`。
- Sharp 生成并实际打开两张 PNG 进行目视检查，参考均为原始插画：
  - `previews/cloud-sql-covers-desktop.png`：各图宽 300px，左 cleaners、中本分类、右 code-editors。
  - `previews/cloud-sql-covers-mobile.png`：390px 画布内各图宽 350px，上 cleaners、中本分类、下 code-editors。
- 目视结果：底色、点阵、白色实体、黑色细节及阴影属于同一系列；数据库、云与表格在两种尺寸可辨，主体留白充分，无裁切、破图、文字、logo 或水印。SVG 无外链图片、字体或脚本。
- 本次检查是插画栅格对照，不是真实网页桌面或手机验收。实际页面检查、完整测试及最终 CI 待整批实现后进行，没有把未执行的验证记为完成。
