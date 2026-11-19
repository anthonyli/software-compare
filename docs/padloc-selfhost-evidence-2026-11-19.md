# Padloc self-hosting verification

Verified 2026-11-19. Issue #549.

Official sources:
- https://docs.padloc.app/guides/self-host/
- https://github.com/padloc/padloc/blob/main/docs/examples/hosting/docker/basic/README.md

The official guide explicitly describes self-hosting the server and apps and links Docker examples. The basic example runs both the server component and web app with Docker Compose. This establishes a supported self-hosting path, not merely availability of client source.

Change only Padloc self_host from unknown to yes and append sources. This is not a claim that the hosted subscription is free, that deployment has no infrastructure cost, or that every distributed native client connects without configuration. Operators must configure, secure and maintain their own deployment; the localhost example alone is not a production-hardening guide. No software was installed or deployed to verify this documentation fact.

Other unknowns, hosted TOTP entitlement, prices and licenses stay unchanged. No shared translation dictionary, #406, production configuration or UI changes. Unit test locks the supported flag and official sources; desktop/mobile English/Chinese regression checks the existing localized status. Actual validation results are in the PR.
