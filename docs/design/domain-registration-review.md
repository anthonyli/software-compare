# 域名注册分类封面验收（2026-11-16）

- 关联 Issue #334；SVG 为仓库原生插画，不使用主封面提示词或外部图片。
- 按 `category-cover-workflow.md` 登记粉彩 #DDEFEA，组合提示词存于 `domain-registration-prompt.txt`。
- 复用原 `code-editors.svg` 的 480×260 容器、22px 点阵、白色椭圆与轻阴影；新主体为白色地址窗口、地球与小盾牌，无文字或品牌。
- 与原始 `cleaners.svg`、`code-editors.svg` 并排栅格渲染，在 300px 卡片及 390px 画布内的 350px 图宽目视检查：比例、留白、点阵、粉彩与白主体一致；地球和盾牌可辨，没有裁切、外链或破图。
- 预览：`previews/domain-covers-desktop.png`（左清理、中域名、右编辑器）；`previews/domain-covers-mobile.png`（同顺序）。这是 Sharp SVG 栅格验收，不冒充实际网页浏览器验收。
- 本地 Chromium 启动遇 `socket() failed: Operation not permitted`；Playwright 测试服务器遇 `uv_interface_addresses returned Unknown system error 1`。实际网页桌面/390px与最终 E2E 应由具备权限的环境及最终提交 CI 补充验证。

补验：正常申请 require_escalated 后测试仍在 Wrangler 启动阶段出现同一 `uv_interface_addresses` 错误；并非审核拒绝，实际页面验收仍待可用环境完成。新增 `site/tests/browser/domain-registration.spec.ts` 覆盖桌面/390px 双语和截图。

最终本地补验：基于 main `594ad9a` 重新构建，通过独立 Python 静态服务器提供原样生成的页面；正常申请执行权限后，Chromium 仍在启动时 `process_singleton_posix.cc:297 socket() failed: Operation not permitted`，未访问页面、没有生成实际页面截图。静态方案并未修改站点或替代 Worker E2E。故实际网页桌面/390px视觉检查仍待可用环境，现有 PNG 仅为清楚标注的插画栅格对照。

## 实际页面补验完成

- GitHub CI [43843524114](https://github.com/anthonyli/software-compare/actions/runs/43843524114)，提交 `0ed82a7020152f02f3a910094607c80b4f10cd5f`：188 项单测、构建及 145 项真实 Worker 浏览器测试全部通过。
- 已下载 `domain-registration-visual-previews` artifact（ID `14214846020`）的四张实际页面截图：`domain-page-home-1280.png`、`domain-page-home-390.png`、`domain-page-comparison-1280.png`、`domain-page-comparison-390.png`，完成目视检查。首页封面比例、粉彩、主体和留白与相邻原系列一致；桌面表格和 390px 卡片正常，无破图、重叠或页面横向溢出；中英文标题与分类可读。移动端功能长标签按原组件省略，不扩展卡片宽度。
- 视觉用例以独立 TEST-NET-1 客户端 IP 调用真实 API，避免消耗其他用例共享的身份限流额度；未 mock API、降低生产限流或删减旧断言。首页顺序测试仅补入新增云服务组，媒体仍优先。
- CI 上传截图保留七天，后续 PR CI 可重新生成。上述本地 Chromium/服务器限制仍属实，但已由真实 CI 浏览器和下载截图补齐验收，不再作为本项的未完成条件。合并仍以最终提交 CI 成功为准。

独立截图复核补充：上述布局通过，但 EN 页阿里云/腾讯云的产品名仍为中文，虽然映射存在；须补齐名称呈现及实际英文名称断言、再次完成 CI 与截图核验后方可合并，不将此前视觉检查视为完整双语验收。

英文名称问题已修复并实证关闭：[CI 43844642402](https://github.com/anthonyli/software-compare/actions/runs/43844642402)，提交 `50b2f83113157c0f74b3bfc5c27c3a0790ed7bf7` 全部通过。已下载 artifact `14213829967` 重新目视桌面/390px比较页，阿里云、腾讯云显示为 `Alibaba Cloud Wanwang Domains` / `Tencent Cloud Domains`，无溢出或重叠。新增断言同时核实可见英文、隐藏中文、hover title，以及详情 H1 / document.title；复用既有翻译机制，不改排序/筛选/链接。此次复核补齐此前记录的双语缺口。
