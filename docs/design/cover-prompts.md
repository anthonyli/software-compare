# Compare 封面提示词与分类视觉规范

## 用户提供的主封面提示词（原文）

以下两段原样保留，供后续生成 **16:9 主封面** 时使用。本次仅保存提示词并统一分类封面，没有据此生成新的主封面。

### 中文

```text
浅米色网格背景，大圆角白色卡片居中，卡片上是一个几何感很强的粗体字母 C，C 的开口里有两根高低不同的竖条，像对比柱状图。旁边是极简无衬线英文单词 Compare，下方小字「软件对比」。画面干净、大量留白、浅灰细网格、柔和自然光，没有霓虹，没有赛博朋克。高质量平面设计，16:9 封面，不要水印，不要多余文字。
```

### English

```text
Clean product-cover design, off-white subtle grid background, a large white rounded card in the center featuring a geometric bold letter C monogram with two vertical comparison bars in the opening, wordmark "Compare" beside it and small Chinese caption "软件对比" underneath. Light, airy, generous whitespace, soft natural light, editorial SaaS aesthetic, no neon, no cyberpunk, no watermark, 16:9.
```

## 分类封面统一规范

分类封面不是主封面：保留现有卡片的 `480 × 260` 比例和各类别独立图案，不加入主封面的文字锁定组合；类别名继续由页面的中英文文本显示，避免在图中重复文字。

- 浅米底 `#F5F4ED`，24 px 浅灰网格 `#DEDED7`。
- 居中白色圆角卡：`x=30, y=22, width=420, height=216, rx=28`，轻量阴影。
- 统一黑色 `#242424`、中性灰 `#C9C9C2` 与浅灰图形填色 `#F0F0EB`，不用不同批次的彩色背景、点阵或彩色描边。
- 各类别图案统一缩放和留白；右上角使用几何 C 与双对比柱作为小型品牌签名。
- 所有资源为原创、静态、可编辑 SVG；无外部字体、图片、脚本、商标素材或网络请求。
- 新增类别时必须新增同名 `site/public/categories/<slug>.svg`，沿用此规范，并通过资源完整性及桌面/手机加载测试。

主封面将来按上述原文生成时，应人工核对 `Compare` / `软件对比` 的拼写、中文字形与 C 内两根对比柱，不能用分类卡片比例替代 16:9。
