# 新增分类时的封面制作与验收

分类封面不是主封面。以已有的 `cleaners.svg`、`screen-recorders.svg`、`code-editors.svg` 为视觉基准；不得将 `cover-prompts.md` 的米色网格、C 标志、Compare 字标套进分类卡片。

## 1. 先登记独立设计说明

在 `category-cover-spec.json` 的 `categories` 增加与分类数据相同的 slug：

```json
"your-category": {
  "background": "#E8F1FF",
  "scene": "具体主体、构图、白色实体、黑色细节及浅色层次。不含标题文字和品牌标志。"
}
```

- `commonPrefix` 是共用视觉约束，不在单个分类中复制改写。
- `background` 只记录背景色；`scene` 只记录该类别场景。避免把主封面的提示词混入。
- 原 17 类完整用户原文见 [category-cover-prompts.md](category-cover-prompts.md)，不得以整理后的配置覆盖原文。
- 同步 `site/src/config.ts` 中的 `categoryTints`，保证加载前的背景一致。

## 2. 生成完整提示词，再制作图片

在仓库根目录执行：

```bash
node scripts/category-cover-prompt.mjs your-category
```

输出会组合共用前缀、类别配色、场景与 `strictly no typography`。只生成提示词，不调用模型、不产生费用、不修改素材。未知 slug 会报错。

现有插画为 SVG，优先沿用原有 SVG 容器（480×260、浅色底、22px 稀疏点阵、边角白色椭圆、自然轻阴影），只替换具体类别图形。所有分类保持横构图 480×260；不要改成 16:9 主封面。

将最终资源保存为 `site/public/categories/your-category.svg`。白色实体、少量浅色层次、黑色 #111111 细节；不采用所有形状全包围粗黑描边。不加文字、品牌 logo、水印、霓虹、写实照片或 3D 写实。禁止外链图片、字体和脚本。

## 3. 必须做视觉验收

- 将新图与至少两张原始参考插画并排看，而不只和上一批新增图比较。
- 检查底色、点阵密度、椭圆光斑、白色主体、黑色细节、投影、比例、主体大小与留白是否属于同一系列。
- 按实际分类卡片大小检查图案能否辨认、有无裁切或破图；在桌面与 390px 手机宽度检查。
- 检查没有多余文字、品牌标志、水印。自动测试只能检查标签与资源，不能替代人眼检查图案。
- 记录预览与参考图、检查结果；不把未执行的浏览器验证写成已通过。

## 4. 执行检查并走 Issue → PR

```bash
cd site
npm run check:covers
npm test
npm run build
npm run test:e2e
```

`check:covers` 验证所有分类与设计说明、SVG 一一对应、480×260 尺寸、底色匹配、无文字/外链图像/脚本标签，并验证提示词组合命令。`npm test` 默认包含相同检查，现有 GitHub CI 会执行；不允许只加分类数据而漏掉封面或设计说明。

在 PR 中写明相关 Issue、分类 slug、提示词/素材路径、新旧对照预览及测试结果。合并前等待最终提交 CI 通过。CI 通过不等于视觉风格正确，必须同时完成上面的并排视觉验收。原有素材无确切要求时不整体重设计。
