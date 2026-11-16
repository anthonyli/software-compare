# Render 网站部署第三产品

Issue #369；2026-11-16 UTC公开官方研究。仅数据与测试，不改布局、封面、组件或配置；前两产品事实原样保留，无登录、绑卡、部署或服务实测。

## 来源与边界

- https://render.com/docs/static-sites ：静态CDN、Git部署、TLS；Hobby工作区含两个自定义域名，额外USD0.25/月。
- https://render.com/docs/build-pipeline ：Hobby每工作区每月500 Starter分钟，所有流水线任务共享；不是500次构建。构建120分钟超时，每服务一个构建，新构建取消旧构建。
- https://render.com/docs/outbound-bandwidth ：Hobby每工作区每月5GB，不沿用旧100GB。公网超额USD0.15/GB；无支付方式时停服务至下月；不结转。
- https://render.com/docs/free ：750实例小时/工作区/自然月、15分钟空闲和约1分钟唤醒只针对Free Web Services，不套静态站；本地文件变化非持久。工作区升级与服务实例升级独立。
- https://render.com/docs/faq ：没有支付方式时，带宽耗尽暂停服务；流水线耗尽只停新构建，现有部署继续。流水线预算不是全账户硬上限。
- https://render.com/changelog/updated-plans-for-render-workspaces ：2026-04-23新方案，额外Starter流水线USD5/1000分钟，带宽USD0.15/GB。
- https://render.com/articles/platforms-with-a-real-free-tier-for-developers-in-2026 ：亲读Render段明确无需信用卡；不采用文章对其他厂商的数字。
- https://render.com/terms ：2026-07-10版第4.6节允许关联卡临时授权验证，不能等同实际扣款或所有免费账户强制绑卡。

免费实例文档不建议生产，Hobby定位个人/原型，但没有据此推导静态站禁止商用；商业用途维持unknown。只描述免费静态与独立动态实例边界，不将全部Render产品称为免费。

## 回归

旧英文键保留；actual cleanPublicText实现检查Render全部公开说明的规范化后英文覆盖。真实Worker网站部署测试沿用IP245、扩为三产品桌面/手机双语比较，新增Render详情六维当前语言可见、反向隐藏、英文无汉字和关键句，并截图。最终网页验证与视觉验收须CI，本地不虚称E2E通过。
