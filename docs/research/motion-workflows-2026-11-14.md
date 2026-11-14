# 2D 动画流程 · 2026-11-14
main 48e8cbd，开始无open Issue/PR。2D动画5→7。Krita在图像编辑已有，此处按动画特定功能交叉分类，不重写原图像条目。enve候选未采用。
## Krita
https://docs.krita.org/en/user_manual/animation.html 逐帧位图动画、洋葱皮/时间轴/分镜、内存负载；不等同完整视频后期软件。
https://krita.org/en/about/license/ GPL v3，商业创作可用，作品不自动GPL。可选商店版本收费，不把免费误写付费。
https://krita.org/en/download/ 三桌面平台，最低4GB/推荐16GB但动画实际内存依场景，未实测M4。桌面范围不扩大成iPad支持。
骨骼/剪纸列partial仅指变换蒙版补间；节点图未知不写no，也不由绘图能力推断矢量动画。
## Friction
https://github.com/friction2d/friction 官方仓库。
https://friction.graphics/documentation/faq.html GPL-3.0-only，商业可用，Win/Linux x86_64，macOS x86_64/ARM64；矢量和位图动效；原生SVG/SMIL而非Lottie。Apple Silicon统一内存不能拿进程RAM直接比较Intel。
https://friction.graphics/documentation/usage.html 建议外部绘制资产再导入；有关键帧、效果/shader，Parent Effect和表达式支持父子关联，骨骼/剪纸列partial不等同高级骨骼；未推断节点图。
## 验证
官方资料核实，无安装、动画渲染或视频制作；M4性能未验证。新增本站中英、单元与响应式浏览器回归，保留旧产品日期，不改部署配置。
