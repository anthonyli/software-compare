# 贡献流程

先查看现有 Issue / PR 避免重复。新增或修改产品资料必须有可核验的官方来源，不能编造价格、许可、平台或功能；AI 分类原则见 [AI 对比方法](docs/ai-comparison-method.md)。

## 新增分类

同时更新分类数据、分组与中英文文案。**封面与设计说明也是必需交付物**：按照 [分类封面工作流](docs/design/category-cover-workflow.md) 登记配色和场景、生成组合提示词、完成新旧并排视觉验收，并添加同名 SVG。不要使用主封面提示词制作分类图。

## 提交前

在 `site/` 执行 `npm run check:covers`、`npm test`、`npm run build`、`npm run test:e2e`。浏览器测试环境受限时如实记录，并等待 GitHub CI 的最终提交检查通过。PR 引用 Issue，附变更范围、来源、预览和实际测试结果；不把未做的验证当作完成。遵守仓库维护者的合并流程。
