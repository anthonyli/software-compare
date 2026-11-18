# Okular PDF signatures evidence

Issue #492. Official documentation reviewed 2026-11-19 (Asia/Shanghai); not an installed-application or certificate test.

https://docs.kde.org/stable_kf6/en/okular/okular/signatures.html

The Adding Digital Signatures section explicitly documents the Tools-menu action for signing PDFs. It requires a usable PKCS signing certificate and Poppler 21.01 or newer. Poppler uses NSS certificate storage; a custom store can be configured in the PDF backend. Okular does not issue signing certificates. This verifies the existing PDF electronic-signature capability, not legal validity, universal certificate/package support or configuration-free signing. Other formats and performance are not inferred.

Only sign changes from unknown to yes and its obsolete homepage-unconfirmed note is removed; source link, positive unit coverage and bilingual desktop/mobile rendering regression are added. All other product data and the shared dictionary remain unchanged.
