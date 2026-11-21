# 移动应用 UI 自动化测试证据（#652）

核验时间：2026-11-21（北京时间）。范围是本地的移动应用黑盒 UI 回归工具，不比较 IDE、开发框架、网页测试或云真机/服务权益。资料核验不等于设备实测；未安装 Appium、Maestro CLI，也未连接、签名或测试真机。

| 范围 | Appium | Maestro CLI |
| --- | --- | --- |
| 本地方式、许可 | WebDriver 客户端 → Appium 服务 → 平台驱动；Appium 核心与所列驱动为 Apache-2.0 | 声明式 YAML；CLI 为 Apache-2.0 |
| Android 设备 | UiAutomator2 支持模拟器、真机；实机需开发调试配置 | 模拟器、真机；真机须能连接并安装辅助驱动应用 |
| iOS 模拟器 | XCUITest 的标准本地路径需 Xcode/macOS | Xcode 模拟器与面向模拟器编译的 .app |
| iOS 真机 | XCUITest 支持；常规做法使用 Xcode 和已签名的 WebDriverAgent。Windows/Linux 路径仅支持 iOS 18 及以上的真机，需要建立 RemoteXPC 隧道、指定设备与系统版本，并使用预装或外部管理的 WDA；不能本机编译 WDA | CLI 2.12.1 的会话管理器明确拒绝物理 iOS 设备，不把模拟器的结果写成 iPhone 真机覆盖 |
| 混合应用 WebView | UiAutomator2 使用兼容的 ChromeDriver 连接 Chrome 系 WebView；XCUITest 只支持可调试 WebView。两种驱动分别核实，不能互换条件 | 依赖系统可访问性层，可能无法识别 WebView 内元素；Android 可启用 `androidWebViewHierarchy: devtools`，不推断 iOS 有同样路径 |

## 官方证据

- Appium：[驱动分工](https://appium.io/docs/en/latest/ecosystem/drivers/)；固定版本的 [Appium 核心 4.0.0](https://github.com/appium/appium/blob/appium%404.0.0/packages/appium/package.json)、[UiAutomator2 9.3.0](https://github.com/appium/appium-uiautomator2-driver/blob/v9.3.0/package.json)、[XCUITest 13.5.2](https://github.com/appium/appium-xcuitest-driver/blob/v13.5.2/package.json)。
- Android 驱动：[UiAutomator2 设备与上下文](https://appium.github.io/appium-uiautomator2-driver/latest/overview/)；[WebView、ChromeDriver 版本与切换](https://appium.github.io/appium-uiautomator2-driver/latest/guides/hybrid/)。
- iOS 驱动：[XCUITest 设备和可调试 WebView](https://appium.github.io/appium-xcuitest-driver/latest/overview/)、[系统要求](https://appium.github.io/appium-xcuitest-driver/latest/installation/requirements/)、[实机准备](https://appium.github.io/appium-xcuitest-driver/latest/preparation/real-device-config/)、[WDA 签名与配置](https://appium.github.io/appium-xcuitest-driver/latest/getting-started/provisioning-profile/)、[非 macOS 实机路径](https://appium.github.io/appium-xcuitest-driver/latest/guides/non-macos-hosts/)。
- Maestro：[本地 CLI 许可](https://github.com/mobile-dev-inc/maestro/blob/cli-2.12.1/LICENSE)、[YAML 与可访问性层](https://docs.maestro.dev/get-started/how-maestro-works)、[Android 平台](https://docs.maestro.dev/get-started/supported-platform/android)、[iOS 平台](https://docs.maestro.dev/get-started/supported-platform/ios)；[CLI 2.12.1 会话源码](https://github.com/mobile-dev-inc/maestro/blob/cli-2.12.1/maestro-cli/src/main/java/maestro/cli/session/MaestroSessionManager.kt)、[WebView 与物理 Android 局限](https://docs.maestro.dev/extra-materials/troubleshooting/known-issues)。
