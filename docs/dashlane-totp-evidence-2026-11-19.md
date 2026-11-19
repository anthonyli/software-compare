# Dashlane stored-login TOTP evidence

Issue #539. Verified 2026-11-19 from official documentation, not an installed-app test.

https://support.dashlane.com/hc/en-us/articles/18408732026258-Turn-on-2FA-for-a-login-stored-in-Dashlane
https://support.dashlane.com/hc/en-us/articles/40043501674002-Log-in-to-an-account-stored-in-Dashlane-with-2FA-turned-on

The setup guide describes storing a provider setup key and generating six-digit tokens refreshed about every 30 seconds. It covers browser and mobile setup; the usage guide covers Web, Android, iPhone and macOS. These are external-service tokens, not MFA used to unlock Dashlane itself or the discontinued standalone authenticator app. Compatible provider setup is required; some services require their own authenticator or SMS/email. Browser setup excludes Safari, and macOS token autofill is not supported, though copying a token is documented. Mark only built-in TOTP supported; do not infer every algorithm, universal autofill or pricing changes. No secrets were entered and no authentication performed.
