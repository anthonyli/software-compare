# 域名注册分类封面验收（2026-11-16）

- 关联 Issue #334；SVG 为仓库原生插画，不使用主封面提示词或外部图片。
- 按 `category-cover-workflow.md` 登记粉彩 #DDEFEA，组合提示词存于 `domain-registration-prompt.txt`。
- 复用原 `code-editors.svg` 的 480×260 容器、22px 点阵、白色椭圆与轻阴影；新主体为白色地址窗口、地球与小盾牌，无文字或品牌。
- 与原始 `cleaners.svg`、`code-editors.svg` 并排栅格渲染，在 300px 卡片及 390px 画布内的 350px 图宽目视检查：比例、留白、点阵、粉彩与白主体一致；地球和盾牌可辨，没有裁切、外链或破图。
- 预览：`previews/domain-covers-desktop.png`（左清理、中域名、右编辑器）；`previews/domain-covers-mobile.png`（同顺序）。这是 Sharp SVG 栅格验收，不冒充实际网页浏览器验收。
- 本地 Chromium 启动遇 `socket() failed: Operation not permitted`；Playwright 测试服务器遇 `uv_interface_addresses returned Unknown system error 1`。实际网页桌面/390px与最终 E2E 应由具备权限的环境及最终提交 CI 补充验证。

补验：正常申请 require_escalated 后测试仍在 Wrangler 启动阶段出现同一 `uv_interface_addresses` 错误；并非审核拒绝，实际页面验收仍待可用环境完成。新增 `site/tests/browser/domain-registration.spec.ts` 覆盖桌面/390px 双语和截图。

最终本地补验：基于 main `594ad9a` 重新构建，通过独立 Python 静态服务器提供原样生成的页面；正常申请执行权限后，Chromium 仍在启动时 `process_singleton_posix.cc:297 socket() failed: Operation not permitted`，未访问页面、没有生成实际页面截图。静态方案并未修改站点或替代 Worker E2E。故实际网页桌面/390px视觉检查仍待可用环境，现有 PNG 仅为清楚标注的插画栅格对照。
