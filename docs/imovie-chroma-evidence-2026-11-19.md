# iMovie green/blue screen verification

Verified 2026-11-19. Issue #555.

Official source: https://support.apple.com/en-us/102308 (published May 27, 2026).

Apple documents adding footage recorded against green or blue behind a subject above a background clip, then applying the Green/Blue Screen effect. The article provides separate instructions for iPhone/iPad and Mac, establishing chroma-key support for the listed Apple-platform product rather than extrapolating from one platform.

Mobile controls include strength and masking. Mac controls include softness, cropping and clean-up; the chosen frame influences the removed color. This does not establish arbitrary AI background removal, tracking or professional compositing parity.

Only chroma_key changes from unknown to yes, with its source appended. Keyframes, proxy editing, 4K export and GPU acceleration remain unknown. Prices, platforms, licenses, shared translations, #406 and production settings are untouched. No video is created or rendered. Unit checks preserve the unrelated values; English/Chinese desktop/mobile browser checks verify the existing localized supported status. Actual test results are recorded in the PR.
