# 网站部署：Vercel 与 Cloudflare Pages（Issue #353）

核查日期2026-11-16 UTC，只读官方来源。仅比较网站静态部署与相关函数，不把域名注册、数据库、存储或事务邮件混为一类。未注册、绑卡、部署、容量测试或访问用户云账户。所有旧分类及产品不改；英语只追加新键。

## Vercel

- https://vercel.com/docs/plans/hobby ：现行正文更新2026-11-12。按月100GB Fast Data Transfer、10GB Fast Origin Transfer、100万CDN请求；函数100万调用、4 CPU小时、360GB小时内存。每天100次部署，2 vCPU/8GB构建机。Hobby没有付费账期；多数超额功能需等30天再用，Web Analytics有7天例外，不说所有项目统一下月1日恢复。
- https://vercel.com/legal/terms 第4节：限制措辞为 personal **or** non-commercial use。保留原逻辑，不改成“个人且非商业”；不据此保证营利业务获准。现行Hobby及Fair Use页面未再显示旧搜索摘要中的AND式限制，故以现行法律正文限定。
- https://vercel.com/docs/plans/pro-plan ：USD20/月平台费含1部署席位及USD20月用量抵扣；额外部署席位USD20/月；抵扣用完转按量计费，默认提醒不是硬上限。Pro不是固定20美元无限用量。
- https://vercel.com/docs/limits/fair-use-guidelines ：适用各档合理使用约束，不能由套餐推断无条件服务。
- Hobby绑卡要求未找到现行明确保证，card_required=unknown；Hobby页面Pro升级步骤明确填写卡资料。未拿其他产品免费试用宣传代替Hobby证据。

## Cloudflare Pages

- https://developers.cloudflare.com/pages/platform/limits/ ：Free每月500构建、账号1并发、20分钟超时；20,000文件/站、25MiB/文件、100自定义域名/项目。Pro/Business构建额度与Workers付费计算不是同一套餐。月度build耗尽后的具体拒绝/恢复细节未核实，不编造。
- https://developers.cloudflare.com/pages/functions/pricing/ ：不调用Functions的静态请求免费不限；Pages Functions与Workers Free共享100,000请求/日，UTC零点重置。不能写静态无限=后端无限。
- https://developers.cloudflare.com/pages/functions/routing/ ：调用Functions的路由计额度；日额耗尽可配置fail open继续静态或fail closed返回错误，鉴权功能不应被绕过。不是自动扣费扩容。
- https://www.cloudflare.com/products/pages/ ：现行底部明确free起步无需信用卡。仅适用于免费起步，不代表付费升级免卡。营销文案“无限sites”与limits中100项目不一致，采用具体limits，不抄无限项目。
- https://www.cloudflare.com/service-specific-terms-developer-platform/ ：Developer Platform条款适用于Pages，可因负担或违规限制服务。未找到类似Hobby的个人非商用限定，但缺少足以宣称所有商业用途获许可的直接依据，commercial=unknown并明确原因。

## 字段和未知项

6特征为静态托管、构建额度、函数、免费档商用、超额、免费档需绑卡。最后字段no意为无需绑卡，明确用备注解释。Vercel commercial=partial为用途受限，非商用许可保证；Cloudflare commercial=unknown；不把unknown当不支持。仅展示核实的Hobby/Pro基础价格、Pages Free；Workers付费计算费率不是Pages构建升级价，避免混入主价格行。

## 测试与截图

新增数据双语及边界测试；真实Worker E2E用独立TEST-NET IP192.0.2.245，不mock API、不改生产限流。1280/390视口验证首页封面、分类名称及产品名称语言span真实可见性，展开限制后截图；详情检查函数日限和免卡说明。

截图命名 `payment-page-webhosting-*.png` 是复用既有CI上传glob的技术前缀，内容是网站部署，不是支付页面；未改变测试流程/上传权限。封面设计和插画预览由独立设计任务负责；截图只有CI实际生成并目视后才算网页验收。

本地 `npm test` 205项通过；`npm run check:covers` 与 `ASTRO_TELEMETRY_DISABLED=1 npm run build` 通过；`git diff --check` 通过。2670个原英文键逐项保留。单次真实Worker E2E在webServer启动阶段因 `uv_interface_addresses returned Unknown system error 1` 失败（另有默认Wrangler日志路径EROFS），未执行浏览器断言；须由CI生成截图后另验。最终head独立审查及CI全绿才可合并，不手动部署。

## 首轮CI修正

CI run 43860064288 的新web-hosting E2E在关闭展开项时失败，其余149项通过。原因是 `details[open]` 动态集合在第一次关闭后重索引，旧 `nth(1)` 定位失效；不是产品渲染失败。修复为按 vercel / cloudflare-pages 稳定产品ID各自定位并关闭details，并断言open属性移除。未加sleep、放宽timeout、mock API或删除断言；修复后的实际浏览器结果仍待最终CI。

首个修复后的CI已成功，实际内容断言通过；但英文390px全页截图因展开说明触发滚动，sticky header停留在页面内部遮挡标题。分类截图前增加scrollTo(0,0)并轮询确认scrollY=0，不使用sleep，不改变产品布局或内容。详情截图不变；最终回顶状态截图仍待新CI生成及目视验收。
