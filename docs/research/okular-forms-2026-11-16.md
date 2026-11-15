# Okular form and annotation evidence

Checked 2026-11-16 Asia/Shanghai; official stable KF6 handbook, no app run or user document opened.

https://docs.kde.org/stable_kf6/en/okular/okular/forms.html documents enabling existing form fields through Show Forms. This establishes filling support, not form authoring, OCR, or compatibility with every PDF/XFA document.

https://docs.kde.org/stable_kf6/en/okular/okular/annotations.html documents text/graphic annotations and saving annotations into PDF. Text tools need actual text; annotation overlays are not original text/layout editing. Document permissions/DRM may limit editing. The handbook warns that experimental custom stamps may not appear in other readers; do not generalize that to every annotation. The .okular archive is distinct from an ordinary PDF.

The form_fill unknown flag becomes yes. annotate stays yes, removing its old contradictory unverified/partial note. Direct official sources appended. No pricing, license or platform changes; edit_text remains no and signing/encryption remain unknown.

Deferred signing evidence: https://docs.kde.org/stable_kf6/en/okular/okular/signatures.html describes PDF signing with a suitable PKCS certificate and Poppler 21.01+; it does not issue certificates or establish legal validity. Do not enable signing without a suitably scoped public explanation in both locales. No certificates, stores or security settings accessed.

No shared English/homepage/cover/blocked work touched. Local regression/unit and cover tests plus final CI required; no automatic-deployment or public-domain verification claimed.
