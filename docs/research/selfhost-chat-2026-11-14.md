# 自托管聊天界面对照

2026-11-14。main14896fa，现有13款未含本轮两款；open issue/PR为空。补入AI聊天助手，不新开重复分类。

## Open WebUI
- https://github.com/open-webui/open-webui
- https://github.com/open-webui/open-webui/blob/main/LICENSE
- https://docs.openwebui.com/getting-started/quick-start/
- https://docs.openwebui.com/features/

当前自定义Open WebUI License带品牌保留条款；≤50自然人/滚动30天等例外针对改品牌，不是软件免费使用上限。源码公开不等于标准BSD/MIT开源许可，本站布尔开源徽章保守设false并在摘要/许可/限制说明源码可见。历史许可材料另按LICENSE_HISTORY，未概括为全部商业使用收费。Docker/Python可部署；本条只比较自托管Web形态，不覆盖独立desktop仓库。

## LibreChat
- https://github.com/LibreChat-AI/LibreChat （旧danny-avila地址跳转）
- https://github.com/LibreChat-AI/LibreChat/blob/main/LICENSE
- https://www.librechat.ai/docs/quick_start/local_setup
- https://www.librechat.ai/docs/features

MIT许可，可商用且保留声明。Docker Compose快速部署，仍需模型连接。支持搜索、文件问答与图像工具不等于无额外模型或服务费用。

## 比较边界
两款都是界面/编排层，不是自带无限模型额度或离线推理引擎。本地推理partial需另接服务；搜索、嵌入、云模型及图像供应商会改变数据去向。Web平台说明用户通过浏览器访问，不否认服务器可运行于桌面系统。M4 16GB没有整套性能实测，不能保证任意模型。模型下载和通用本地推理API未纳入本轮深入核实，保留unknown（不表示没有任何应用API）。

未安装、运行模型、调用付费API或上传文件。新增中英数据及响应式浏览器回归，网站测试不等于产品能力实测。
