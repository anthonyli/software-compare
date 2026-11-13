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

## 分类封面规范（独立于主封面）

**上面的中英文提示词只用于将来的 16:9 主封面，不用于分类封面。** 分类封面以项目最早的 17 张插画（例如 cleaners、screen-recorders、code-editors）为视觉基准，不改成白卡网格或品牌海报。

- 保留 `480 × 260` 比例、原来的各类别浅彩底色和 22 px 点阵纹理。
- 主体采用白色实体几何图形、少量柔和灰色层次、黑色符号细节与自然轻阴影。
- 不使用粗黑描边包围全部白色实体，不加 C 品牌角标、居中外层白卡或新网格背景。
- 图案表达具体类别，类别名继续由页面中英文文本显示，不嵌入图片。
- 保留原始 17 张素材；新增类别沿用同一背景、点阵及柔和阴影结构。
- 所有资源为原创静态 SVG，无外部字体、图片、脚本或第三方品牌标志。
- 新增类别时补充同名 `site/public/categories/<slug>.svg`，执行资源完整性、桌面和手机加载回归。

主封面将来按原文生成时，另行核对 `Compare` / `软件对比` 的字形、C 内两根对比柱以及 16:9 比例，不要把这个设计替换到分类封面上。
