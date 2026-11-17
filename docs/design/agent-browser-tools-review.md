# Agent 浏览器操作工具封面验收

- Issue：#395；独立分类 `agent-browser-tools`，归开发工具。
- 素材：`site/public/categories/agent-browser-tools.svg`；设计说明：`category-cover-spec.json` 同名项。
- 已运行 `node scripts/category-cover-prompt.mjs agent-browser-tools`，沿用 480×260 原系列容器，独立浏览器窗口、节点线路、指针构图，无文字或品牌。
- 已查看 [三图并排预览](previews/agent-browser-tools-reference.png)：左为原始 cleaners，中为原始 code-editors，右为新封面。以 340×184 卡片大小栅格化检查，浅色底、22px 点阵、角落椭圆、白色实体、黑色细节、投影与留白符合系列，主体清晰无裁切。
- `check:covers`、248 项单测及静态构建通过；英文词典仅增量添加 40 个键，原有 2874 个键值保持不变。
- 本地浏览器未能启动：Chromium 的 socket() 被执行环境拒绝（EPERM），本地 Wrangler 测试服务器另报 uv_interface_addresses 系统错误。没有把静态栅格检查算作桌面/390px 浏览器验收；新增 E2E 已覆盖这两种尺寸、语言切换/刷新、详情安全说明与搜索跳转，须由最终 CI 及可用测试环境补验。
- 未访问生产页面，未安装或运行收录的产品，未产生模型或浏览器托管费用。

## 独立审查后补强

已修复分类表格与移动卡片隐藏说明的问题：显式启用该类 context、显示分类边界，移动端展示完整费用说明。E2E 在 1280/390px 展开限制后核验持久 profile、origin filtering 非安全边界和模型/浏览器费用分离，并检查中英文。完整单测与构建重跑通过，本地浏览器限制仍待 CI 验证。
