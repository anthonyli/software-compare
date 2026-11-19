# Filmora 桌面 4K 导出核实
核实日期：2026-11-19。对应 #597。

## 结论
把 `filmora.features.export_4k` 从 unknown 改为 paid（付费档提供），不是无条件免费支持。现有商用产品价格、试用警告、平台和版本元数据不改；GPU 仍未知。

## 官方依据
- https://filmora.wondershare.com/shop/buy/buy-video-editor.html
- https://filmora.wondershare.com/shop/buy/buy-mac-video-editor.html

两端商店当前 Basic、Advanced 和 Perpetual 功能清单均列出 4K HD Export 和无水印导出。此处仅记录付费档的已证实能力，不锁定促销金额、税费、币种或授权跨平台范围。订阅自动续费与一次性许可不能混同；另售 Creative Assets 试用及续费不是软件许可。

- https://support.wondershare.com/how-tos/filmora/i-clearly-changed-the-resolution-to-4k-on-the-right-side-of-the-export-panel-why-is-the-exported-video-still-in-1080p.html

官方 V16 支持文档解释：右侧显示的预设参数不等于真正输出，导出使用左侧已勾选预设；应勾选设为 4K 的目标预设并检查输出文件属性。

## 边界
- paid 表示付费档确有该能力，不宣称所有版本的免费试用都禁止 4K，也不将限时或新账号奖励推广成永久免费权限。
- 记录的是当前桌面软件，不推广到移动端、每个历史版本、所有格式、设备预设、帧率或硬件。
- 不等同导入 4K、AI 超分、提高低清素材原生细节、无水印免费导出、GPU 加速或流畅度保证。
- 本轮不改共享英文词典，使用已有 paid 双语标签。
- 未下载、安装软件或实际渲染视频，结论来自官方文档，不冒充实测。

## 验证
新增付费边界与来源单测，以及中英文、1280/390 宽产品页 4K 行及横向溢出回归。既有代理/关键帧/绿幕单测更新为保留已证实 paid 边界，不改变其功能断言。执行全量单测、封面检查、构建与浏览器回归；本地 Wrangler 启动限制如有发生须在 PR 披露，最终双 CI 通过后才交付合并。
