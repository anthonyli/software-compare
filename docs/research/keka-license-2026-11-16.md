# Keka application license correction

Verified 2026-11-16 Asia/Shanghai through official documents; no application or archive test.

## Evidence

- https://github.com/aonez/Keka/discussions/1627 : on 2025-05-22, maintainer aonez explicitly said the source had been closed years earlier. His tentative year is not treated as an established date. This is affirmative maintainer evidence, not an inference from an absent LICENSE file.
- https://github.com/aonez/Keka : the current README describes this repository as primarily for issues and a collaborative wiki. A public issue/download repository is not the application's source-code license.
- https://www.keka.io/en/ : direct website download and paid Mac App Store distribution are distinct channels; the website says they provide the same app, with App Store updates for that distribution.
- https://terms.keka.io/ : optional in-app tips add no functionality. This is not an application-wide open-source grant or unrestricted redistribution permission.

## Correction

The Keka application row now has open_source=false and the existing translated label Proprietary software. Summary, price summary and the direct-download price note no longer assert open-source status. The simple existing bilingual labels are reused without modifying the shared translation file. Existing free direct-download and paid App Store price rows remain; the store amount is still unknown. The retained pricing-model label describes free direct access, not a claim that every distribution channel is free.

This does not relicense or classify all bundled compression components as proprietary. Their separate licenses and commercial redistribution conditions require their own review. No inferred maintenance rating, release metadata, platform or format capability is changed by this patch. The older format research's license follow-up is resolved for application open-source status by this new evidence, not by retroactively changing its historical finding.

## Checks and limits

Regression assertions cover false open_source, absence of old open-source claims from product text, retained paid-store row and existing English translations. Unit/cover tests run locally; final CI build/browser tests required before merge. No install, runtime verification, production configuration change or manual deployment. Auto-deployment and public-site state are unverified. The blocked scrcpy change is untouched.
