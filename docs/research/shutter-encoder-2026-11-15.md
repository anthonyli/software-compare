# Shutter Encoder 核实（2026-11-15 UTC+8）

基于 main 903a8d9，格式转换 11 → 12 项，Issue #169；所有 open issue/PR 为空且 Shutter 检索无重复。未更改原条目的日期或评分。

官方来源：
- https://www.shutterencoder.com/ ：免费无广告、捐赠可选，FFmpeg 图形转码、音视频图片、批量/预设、音轨提取和字幕。下载页当前列 20.5，Windows 64 位、macOS 10.14+ Intel/Apple Silicon（含 M4）、Linux .deb/AppImage。官网版本不用于猜测 GitHub release 日期。
- https://github.com/paulpacifico/shutter-encoder/blob/master/LICENSE.txt ：GPL v3，允许商业使用但分发受其义务约束，第三方组件及媒体权利另行判断，不等同付费商用认证。
- https://www.shutterencoder.com/faq/ ：无重编码剪切受 GOP 关键帧限制；GPU 不默认启用；合并源媒体参数须匹配；可能遇到未签名系统警告。本轮不复制绕过安全保护步骤。
- https://www.shutterencoder.com/documentation/ ：Rewrap 容器须支持编码；Conform 不解决 VFR，需转换；FTP 上传与 Google Translate 是可选外部服务。官网同时列邮件通知。不可据桌面应用宣称永不联网。

比较界限：文档转换标 partial，仅 PDF 图像处理线索，不称 Office 转换；硬件加速 partial，不承诺任意硬件/编码。免费和 Apple Silicon 支持为官方声明，M4 16GB、质量、速度均未实测。没有安装、转码、录像、渲染、上传文件或触发付费 API。研究面向 Media Encoder 类替代选择，不宣称完整 Adobe 工作流兼容。

验证：新增数据/双语回归与 1280/390 页面测试，实际执行状态以 PR CI 为准。
