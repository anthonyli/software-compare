# Compare 社交分享图

Issue #325，2026-11-16。

- `site/public/social/compare-preview.png`：1200×630 RGB PNG，公开静态资源，无登录或 JavaScript 渲染依赖。
- 复用 `logo.svg` 的 C 型路径及双竖条、站点灰白网格/圆角白卡、代码编辑分类的淡蓝色；右侧为抽象比较表，不代表产品测试结果。不套用主封面提示词，不修改分类系列封面。
- 不使用产品数量、Star、质量评分或无法验证的宣传数字。明确目录免费、第三方软件价格另计。
- 字体为 Noto Sans CJK，同站点 Noto Sans SC 字体系列；无第三方产品商标。
- 可选复现：已有 Pillow、fontTools 与 Noto Sans CJK 字体的维护环境运行 `python scripts/render-social-preview.py /path/to/NotoSansCJK-Regular.ttc`。不属于构建依赖，不自动安装工具。
- PNG 已人工查看：1200×630 无裁切，标题、双语说明及免费边界清晰。抓取端读到固定中英分享图，页面语言开关不承担爬虫元数据切换。
- 采用绝对图片 URL、PNG MIME、尺寸和 alt，符合 [Open Graph](https://ogp.me/) 图像元数据约定；Twitter 使用大图卡片。
- 当前代码提供公开目录、搜索与匿名点赞，无 Compare 账户登录/注册或支付接口；因此文案仅承诺“免费浏览与比较，无需注册”，不扩展成第三方软件免费、永久免费或零数据收集。
- BetterLaunch 当前评分原因、缓存和表单分类/标签未核实，不承诺这次修改提升到特定分数。
