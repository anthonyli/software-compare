# Nutstore incremental sync

Checked 2026-11-19 for #611.

Official https://help.jianguoyun.com/?p=775 describes uploading changes between versions rather than entire files. It explicitly excludes compressed files (examples include archives and compressed image/video formats), encrypted files except encrypted Office files, and mobile apps. We mark block_level **partial**, not universal yes. Do not infer every TIFF or every video encoding's internal behavior, speed guarantees, plan parity or any specific chunk algorithm.

The article is dated 2012-02-20 but remains linked as a main capability by the current official feature index https://help.jianguoyun.com/?page_id=843, directly opened on the verification date. This verifies documented scope, not a benchmark or installation test. We do not treat the article's promotional speed claims as measured performance.

Only Nutstore block_level, its formerly unverified note and official sources change. Versions remains yes with its previously documented retention; other unknowns remain unknown. One new English translation is added; existing entries remain identical. Existing versions test's obsolete block_level unknown assertion becomes partial while all other neighboring assertions remain.

No account actions, uploads, actual sync, production visits or deployment/configuration changes. Unit tests, en/zh-CN desktop/mobile regression, cover/build checks and independent review precede final exact-head CI.
