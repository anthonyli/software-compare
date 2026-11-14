# 源码演示工具 · 2026-11-14
main fa7f5e1，开始无在途 Issue/PR；演示文稿 4→6。保留旧日期，不改变界面/部署。
## reveal.js
https://github.com/hakimel/reveal.js MIT、HTML框架，Markdown/Auto-Animate/插件；Slides.com为另一托管产品。
https://revealjs.com/installation/ 基本静态文件可在浏览器打开；完整开发环境当前Node20.19+，不是播放演示的必要条件。
https://revealjs.com/pdf-export/ Chrome/Chromium专用打印；静态PDF不保留交互。
https://revealjs.com/auto-animate/ 元素动画。
核心官方未核实PPTX交换，标unknown不编造“必不支持”。
## Marp CLI
https://github.com/marp-team/marp-cli README 和 LICENSE：MIT。Markdown转HTML/PDF/PPTX，默认PPTX预渲染背景图片，不是原生可编辑文字。
实验 --pptx-editable 需兼容浏览器+LibreOffice Impress，复杂样式可能报错/失真，演讲备注不支持。无PPTX导入证据，不承诺往返。
当前Node方式v18+；独立Win/Linux/macOS AppleSilicon包包含Node。PDF/PPTX仍需Chrome/Edge/Firefox之一。HTML bespoke切换依赖View Transition API，不扩大到PDF/PPTX。
https://marp.app/ Markdown生态定位。
本地执行不必上传稿件，但远程图片、字体、脚本及托管发布会产生网络访问。不要对不可信Markdown开启allow-local-files；该选项README标注不安全。
## 验证与限制
官方资料核实，无软件安装、导出实测或M4 16GB性能保证；未制作、渲染视频。测试仅验证本站数据、英文、桌面手机展示与详情文案。产品许可不替代素材授权。
