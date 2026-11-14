# AI memory assistants: source review (2026-11-14)

Issue: https://github.com/anthonyli/software-compare/issues/49

## Scope and primary sources
- [TaoSheng README](https://github.com/0xCoach/TaoSheng): Android 10+ arm64 voice lifelog, local SenseVoice or cloud transcription, local voiceprint separation, task extraction and cited memory retrieval. Optional screenshot OCR is transient, **not screen history**. [MIT license](https://github.com/0xCoach/TaoSheng/blob/main/LICENSE); model/native dependencies retain their own licenses. Cloud models, pushes and backups require separate data-flow review.
- [Omi README](https://github.com/BasedHardware/omi): desktop/phone/wearable memory workflow, developer API/webhooks/MCP; default desktop development connects to Omi Cloud. Local client code does not imply fully local processing. [MIT license](https://github.com/BasedHardware/omi/blob/main/LICENSE); hosted services and hardware are separate products.
- [Screenpipe README](https://github.com/screenpipe/screenpipe): local desktop screen/audio history, OCR/accessibility, REST/MCP/Pipes. [Current LICENSE.md](https://github.com/screenpipe/screenpipe/blob/main/LICENSE.md) is Screenpipe Commercial License, not an OSI open-source license. Noncommercial uses and 7-day organizational evaluation are allowed; commercial source use needs an Enterprise license. Official binaries have separate terms. Default telemetry and optional cloud features prevent an unconditional 'no data leaves device' claim.

No upstream app was installed, run, recorded with, or benchmarked. No pricing numbers or M4 performance claims were inferred. Capture of other people requires notice/consent and suitable retention controls.

## Implementation and review
Three products share six feature rows, with distinct limits rather than treating phone audio and desktop capture as interchangeable. Independent review corrected TaoSheng screen-history classification and identified an existing display sanitizer that incorrectly deleted legitimate MCP protocol descriptions. Added bilingual content and visible-note browser assertions.

Category artwork retains the existing 480×260 pastel/dot-grid/white-object style. Locally inspected a raster preview without the SVG drop-shadow filter (Inkscape did not render that filter); browser rendering is covered separately by CI/browser validation. No generated photo, logo or text used.

Local Node data tests: 33 passed. Build and Playwright checks run in PR CI; their actual result is recorded in the PR rather than asserted here in advance.
