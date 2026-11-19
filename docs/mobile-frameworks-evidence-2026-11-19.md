# Cross-platform mobile frameworks

Checked 2026-11-19 for #605. This fourth batch follows network packet analysis, HTTP debugging and native mobile IDEs. Frameworks are not IDEs, subscriptions or backend hosting.

## Flutter
- https://docs.flutter.dev/resources/faq documents Dart, its own rendering/widgets, Android/iOS/web/desktop targets, Windows/macOS/Linux/ChromeOS development hosts, BSD-3-Clause framework licensing and separate engine/dependency/package licenses. Documentation currently reflects Flutter 3.50; no latest-release metadata is inferred.
- https://docs.flutter.dev/tools/hot-reload documents development refresh and limits. Native changes require rebuilding; it is not built-in code push to released apps.
- https://docs.flutter.dev/platform-integration/platform-channels documents native code integration, not blanket availability of every third-party plugin on every target.
- https://docs.flutter.dev/platform-integration/ios/setup requires the macOS/Xcode toolchain. A host listed in the UI does not mean it can locally build every app target.

## React Native
- https://reactnative.dev/ describes Android/iOS native UI components and recommends frameworks such as Expo without requiring them. Use of JavaScript/TypeScript is separate from native rendering.
- https://reactnative.dev/docs/fast-refresh supports development feedback but not universal state preservation or app-store code delivery.
- https://reactnative.dev/docs/turbo-native-modules-introduction documents native API extensions.
- https://reactnative.dev/docs/out-of-tree-platforms identifies partner/community web and desktop ports. Both comparison cells are partial, not unsupported or equivalent to core mobile support.
- https://reactnative.dev/docs/set-up-your-environment distinguishes local Android/iOS toolchains from framework-assisted build workflows. Local iOS builds need Xcode/macOS even when cloud tooling can avoid local installation.
- https://github.com/react/react-native/blob/main/LICENSE is MIT. The former facebook/react-native URL now redirects to this official repository. Documentation viewed is the 0.88 documentation family, not a promise about all older releases.

The open-source licenses do not make optional Expo/cloud build/hosting or store enrollment free. No cloud plan price, latest version, stars or maintenance data is guessed. Sources are read-only; no SDK/framework installations, app uploads, credentials or production visits.

## QA
New-only translations preserve the 3045 base entries. New pastel cover follows the original series and is visually compared with code-editors and screen-recorders. Unit tests and en/zh-CN 1280/390 browser tests check identity, partial web support, local build constraints and overflow. Full test/build/cover checks and final exact-head push/PR CI are required before merge.
