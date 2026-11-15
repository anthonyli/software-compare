# Keka macOS archive formats

Checked 2026-11-16 Asia/Shanghai. Documentation review only; no archive operations or application installation.

## Verified capability scope

https://www.keka.io/en/ currently lists creating ZIP, 7Z, TAR, GZIP and ISO, and extracting RAR as well as those formats. It also explicitly describes splitting large archives. Therefore the existing Keka row's ZIP, RAR extraction, 7z, TAR/GZIP, ISO and split cells can be yes with stale unavailable-homepage notes removed. This is format support, not proof that every damaged, encrypted or unusual archive can be read. RAR creation, repair and browsing/preview remain unknown.

The official older compression guide https://github.com/aonez/Keka/wiki/Compressing-with-Keka points to the homepage for the updated format list and describes configurable split sizes. The current homepage is the primary format evidence, rather than assuming the older guide covers every current behavior.

## Separate follow-up, not resolved by this patch

The homepage distinguishes AES-256 for 7z from legacy Zip 2.0 encryption; do not generalize the stronger algorithm to ZIP. No encryption field is changed in this narrow patch.

The current comparison also describes Keka as open source, while https://github.com/aonez/Keka says the repository primarily hosts issues and a collaborative wiki. Public repository availability is not itself an open-source license. https://terms.keka.io/ provides disclaimers and says optional in-app tips do not unlock features, but does not establish an application-wide open-source grant. The application license and matching bilingual public descriptions need a separate review; this patch does not endorse the existing open-source statement or reverify pricing. Do not infer a blanket proprietary/open-source conclusion for separately licensed bundled components.

## Validation

Focused regression test plus existing unit/cover suite; CI build and browser tests required before merge. No product runtime, M4 performance, auto-deployment or public-site verification. No shared translation, homepage, cover or scrcpy change.
