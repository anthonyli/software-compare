# Flameshot：上传分享核验（#643）

标记为「部分支持」：v13.0.0 发布说明宣布编译时默认关闭 Imgur 上传，v15.0.0 的 CMake 配置仍默认将 ENABLE_IMGUR 设为 OFF，且工具工厂只在启用该选项时创建截图工具栏的上传工具。是否可用取决于安装包的编译配置，未核实不同发行版或平台的打包选项。

在包含上传工具的构建中，官方指南确认默认共享上传配额，自定义 Client ID 仅使用独立配额，上传仍匿名且不绑定用户档案。上传送往第三方，不作为私有备份。独立窗口截图仍标为未知；未安装软件或上传真实图像。

- https://github.com/flameshot-org/flameshot/releases/tag/v13.0.0
- https://github.com/flameshot-org/flameshot/blob/v15.0.0/CMakeLists.txt#L93-L97
- https://github.com/flameshot-org/flameshot/blob/v15.0.0/src/tools/toolfactory.cpp#L54-L56
- https://flameshot.org/docs/guide/imgur-help/
- https://flameshot.org/docs/advanced/protecting-your-privacy/
