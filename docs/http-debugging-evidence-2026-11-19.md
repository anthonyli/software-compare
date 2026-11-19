# HTTP(S) 抓包与调试
2026-11-19；Issue #601；基线 086478bd5f3da743fed8e993ab01c00b11720e6b。

## 分类定义
四款桌面调试代理，不与 packet analyzer、VPN、API client 混列。平台为运行桌面主程序的系统；Android/iOS 是可配置目标，不能从“可调试手机流量”推断存在独立移动客户端或许可通用。

## 官方证据与权益
- mitmproxy：https://www.mitmproxy.org/ 标明 MIT、免费、拦截编辑重放。https://docs.mitmproxy.org/stable/overview/features/ 解释客户端重放、本地响应映射；https://docs.mitmproxy.org/stable/overview/installation/ 确认三桌面系统。https://docs.mitmproxy.org/stable/concepts/certificates/ 明确目标信任 CA 条件。
- Charles：https://www.charlesproxy.com/buy/ 当前单用户 US$50、30天试用、大版本许可和升级限制，未计地区税费。https://www.charlesproxy.com/buy/eula/ 为专有许可；https://www.charlesproxy.com/overview/features/ 与 https://www.charlesproxy.com/documentation/tools/ 提供 SSL、Edit/Repeat/Map Local；https://www.charlesproxy.com/documentation/proxying/breakpoints/ 提供拦截编辑。paid 表示付费档具备能力，不否定试用期间可体验。
- Proxyman：https://proxyman.com/pricing 明列 SSL Proxying、Breakpoint、Map Local 等高级功能；个人永久许可含一年更新，团队订阅另计，不能把两者都说成订阅或终身更新。未固化动态折扣或未核实的免费域名数量。https://proxyman.com/docs/advanced-features/repeat 确认重放，标 yes 为功能存在，不保证永久免费；完整试用配额仍未核实。
- HTTP Toolkit：https://httptoolkit.com/pricing/ 免费档有检查和手动断点修改，Pro 才有自动模拟、resend、流量导入导出。动态页面未稳定给出金额，未猜测月价。https://github.com/httptoolkit/httptoolkit 说明专属组件 AGPL、通用组件 Apache/MIT；https://httptoolkit.com/terms-of-service/ 说明发行应用还可按 AGPL-3.0 或 CC BY-ND 4.0 使用，源码开源与官方 Pro 订阅权益分开。
- https://httptoolkit.com/docs/guides/android/ 说明非 root Android App 可能需 CA 信任配置，不能推广为所有 App 一键解密。https://httptoolkit.com/docs/guides/ios/ 说明手动代理及证书完全信任；不依赖实验性功能宣称全自动。https://httptoolkit.com/docs/getting-started/installing/ 确认三桌面平台。

## 安全与范围
HTTPS 证书信任不是绕过 pinning 的保证；不提供或执行修改设备信任配置/系统代理/证书固定操作。只读公开资料，不安装软件、不抓真实流量。记录捕获可能含凭据，重放可能产生服务端写入；仅自有或获授权环境使用。不将桌面和独立手机软件许可混合。版本、星标及维护时间未采集，均为 null。

## 国际化、封面与验证
仅新增21条专属翻译，旧3009条逐项校验零改删，不触#406/#334。新增分类标签、网络分组、#F7EBDD封面登记；请求/响应与中央调试开关，沿用480×260原系列点阵/光斑/轻阴影，无外链和文字。组合提示词已生成，与原始code-editors和screen-recorders并排视觉检查。
新增身份/付费/安全/翻译单测，以及中英1280/390分类与四产品回归。执行单测/covers/build，本地E2E若Wrangler启动受限则在PR披露并等待最终双CI。
