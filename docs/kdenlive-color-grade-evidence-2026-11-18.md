# Kdenlive 调色核实（2026-11-18）

Issue #460。官方 26.08 手册：
https://docs.kdenlive.org/en/effects_and_filters/video_effects/color_image_correction.html

该章节明确其效果和滤镜用于调色、色彩校正及图像校正，包含曲线、LUT、Lift/Gamma/Gain 等。因此仅将 `color_grade` 从 unknown 改为 yes，删除“首页未展开”的过期说明并补充来源。

这只是官方文档确认的功能存在性，不声称实际执行调色、性能、GPU 加速、HDR 工作流或与其他专业软件等价。4K 导出和 GPU 加速保持 unknown，平台、许可、价格和其他能力不变；不改词典、布局或部署配置。

单测正面覆盖该能力，原标题/色键测试只移除已过期的 color_grade unknown 断言；新增浏览器回归覆盖桌面/手机、中英文与溢出。以最终 CI 实际结果为准，未访问生产站。
