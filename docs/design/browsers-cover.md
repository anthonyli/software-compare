# 浏览器分类封面

Issue #394。使用 category-cover-spec.json 的通用提示词、#E8EFF5 配色和 browsers 场景，运行 `node scripts/category-cover-prompt.mjs browsers` 生成组合提示词。

原创 SVG：错叠浏览器窗口、地址栏、地球经纬线和对话气泡，代表常规浏览与 AI 上下文，不暗示所有产品都能自动执行网页操作。480×260、22px 点阵、白色椭圆光斑、白色主体、#111111 细节与轻投影；无品牌标志、文字和外部图像。对照 cleaners、code-editors、screen-recorders 系列进行本地视觉验收。

资料按 2026-11-17 官方页面核对；这不是安装或效果排名。浏览器平台与 AI 平台分开；未知能力不推断为不支持；Chromium/WebKit 开源不等于完整浏览器开源。Dia 免费档无 AI、14 天试用及可选充值分别呈现；Atlas 退休，不进入现役首批。

验收记录：使用本地 SVG 栅格化接触表并排检查 cleaners、code-editors、screen-recorders、browsers，色块、22px 点阵、白色主体和阴影保持同系列。新增 1280px/390px 分类导航、英文切换、对比行与详情往返 E2E 用例；本地 E2E 启动被运行环境 `uv_interface_addresses` 错误阻止，不能视作已通过，等待最终 CI 执行。
