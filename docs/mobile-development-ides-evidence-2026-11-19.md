# Mobile development IDEs: evidence and scope

Checked 2026-11-19; implements #603. This is the native IDE batch, not frameworks or HTTP debugging. No tools installed, account agreements accepted, apps uploaded or production pages visited.

## Android Studio

- https://developer.android.com/studio/intro identifies the official Android IDE, Gradle builds, emulator, Live Edit and testing. These are Android targets, not host platforms or an iOS toolchain.
- https://developer.android.com/studio/install lists Windows, macOS, Linux and ChromeOS. ChromeOS requires its Linux environment and explicitly limits deployment to connected hardware. The simulation cell is **partial**, not universal yes. Hardware and emulator requirements differ; do not infer all host architectures supported.
- https://developer.android.com/studio/profile documents app profiling. Debugging, UI preview and integrated tests are local capabilities, not an inference from Gemini.
- https://android.googlesource.com/platform/tools/base/+/refs/heads/mirror-goog-studio-main/source.md explicitly identifies Android Studio as open source and free of charge; the repository provides public Android Studio/build/SDK component sources. The license label deliberately says open-source components / Android SDK terms, not a single blanket Apache license. The install page contains the SDK agreement; source rights do not waive SDK, Google API, AI or service terms.
- https://developer.android.com/studio/gemini/feature-comparison lists free, API-key and subscription tiers. Local IDE access is separate from these services and Play publication. No claim of unlimited free AI or inferred checkout totals.

## Xcode

- https://developer.apple.com/xcode/ and https://developer.apple.com/xcode/resources/ describe previews, simulators, profiling, debugging and tests for Apple platform apps. The host is Mac/macOS, not iOS or Windows.
- https://developer.apple.com/documentation/safari-developer-tools/installing-xcode-and-simulators (accessible Markdown: append `.md`) identifies Xcode as free in the Mac App Store; simulator support includes hardware requirements.
- https://developer.apple.com/help/account/basics/about-your-developer-account distinguishes free registration and device testing from program membership/distribution and cloud access. Free-account signing and capability limits remain; no claim all commercial distribution routes are identical.
- https://developer.apple.com/support/terms/ links https://www.apple.com/legal/sla/docs/xcode.pdf. That agreement restricts execution to Apple-branded hardware running macOS. Xcode is proprietary, unlike selected open-source language/components; this is a comparison, not acceptance of the agreement.
- AI providers and Xcode Cloud can have separate eligibility, quotas or costs; free IDE is not unlimited cloud entitlement. No dynamic membership or token prices are invented.

## Verification

No speculative latest release/date/stars/maintenance values. Existing dictionary entries must remain identical; only this category's new strings are added. New cover follows the existing 480x260 pastel/card series and is compared against original code-editor and screen-recorder covers. Unit assertions and bilingual 1280/390 browser cases cover identity, host/target distinctions, simulation restrictions and overflow. Local Playwright server could not start due to Wrangler `uv_interface_addresses`; browser execution is deferred to both exact-head CI runs, not counted as a local pass.
