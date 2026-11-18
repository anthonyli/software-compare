# Rapid carousel selection test race (#502)

## Observed evidence

Diagnostic-only PR #504 retained the original final assertions and logged capture-phase click targets and dot bounds. No production site was visited; the workflow ran a local build on a GitHub Actions runner.

- [Trace-enabled run: 40/40 passed](https://github.com/anthonyli/software-compare/actions/runs/44368711989). All 280 clicks reached the intended dot. This did not reproduce the intermittent failure.
- [Trace-disabled run: 99/100 passed](https://github.com/anthonyli/software-compare/actions/runs/44370222507). Repeat 67 failed the original final dot-1 assertion. Its final requested dot was 1, but the captured actual click target was dot 2, at x=605, y=664. At that event, dot 1 spanned x=568.3125–590.3125 and dot 2 spanned x=595.3125–617.3125. The actual sequence was `1,4,2,5,0,3,2`; the final pressed dot was 2. Repeats 44, 50 and 97 also had an intermediate click miss all dots while still passing the final assertion.

The test used forced pointer clicks, while selected dot widths transition from 22 to 108 pixels over 350ms. The evidence demonstrates a hit-target race in the test; it does not demonstrate the carousel ignoring an event delivered to dot 1. Trace overhead changing reproduction is a possible explanation for the first run, not a proven cause.

## Narrow correction

The rapid-interruption test dispatches clicks directly to the intended controls, preserving its 80ms simulated intervals and every original final assertion. An additional assertion verifies each requested state immediately. A separate real-pointer test uses ordinary Playwright clicks with stability and hit-target checks, verifies every selected dot and checks the final scene structure. There are no fixed sleeps, added retries, skipped tests or product-code changes.

The diagnostic workflow and event instrumentation are not part of the final fix. Local browser execution was blocked by the sandbox's network-interface / Chromium socket restrictions; hosted CI supplies browser verification. Passing stress runs reduce observed test instability but do not prove absence of every possible carousel defect.
