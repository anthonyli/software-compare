# BaaS 封面评审

480×260独立SVG，无文字/品牌/外部资源。薄荷点阵底、白色圆角后台面板，认证/文件/函数节点和小数据库圆柱。

已实际查看 backend-as-a-service-covers-desktop.png 与 backend-as-a-service-covers-mobile.png：与原始 cleaners、code-editors 并排比较，低饱和度、点阵、白色主体、软阴影和黑色细节协调，手机仍可辨认，无裁切。提示词见 backend-as-a-service-prompt.txt。

仅静态SVG并排预览已验收；真实Worker网页截图须另经CI测试与验收，不以静态预览代替。

本地验证：全量单测 211/211，封面 2/2，构建 554 页成功（禁用可选 Astro telemetry，以免写入只读 home）。真实 Worker E2E 已尝试，启动失败：`uv_interface_addresses returned Unknown system error 1`，同时 Wrangler 日志目录 EROFS；未得到网页截图，不能视为 E2E 通过。需要发布分支后 CI 与截图验收。

PR #361 的真实英文详情截图发现：商用与绑卡两条说明经 cleanPublicText 去掉采集用语后，完整原文翻译键不匹配而回退中文。已增加两条规范化短文本英文键，保留完整键且不修改全局渲染逻辑；新增单测执行现有规范化函数检查全部六条说明译文，详情 E2E 检查六条实际可见英文无汉字并包含对应英文关键内容。该修复仍须新 CI 与实际截图验收。
