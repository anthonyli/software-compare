# Pinta add-in capability verification

Checked 2026-11-16 Asia/Shanghai; documentation review only, not an installed-product or extension test.

## Evidence and scope

- https://github.com/PintaProject/Pinta/releases/tag/3.1 explicitly documents add-in APIs, including changes that require add-ins to be rebuilt against Pinta 3.1. This establishes extension support, not compatibility with every older extension.
- https://github.com/PintaProject/Pinta/releases lists 3.1.2 as Latest, a bug-fix release in the 3.1 line at this check. We do not overwrite automatically synchronized release metadata.
- https://github.com/PintaProject/Pinta-Community-Addins is the project's community extension catalog and links separate platform repositories. Individual extensions may have their own platform, dependency, license and network behavior; no blanket endorsement or offline/security guarantee is made.
- https://www.pinta-project.com/user-guide/ explicitly targets 1.6. Its add-in statement alone is not used as current-version evidence.

## Data decision

Change only Pinta's plugins value from unknown to yes and append the two direct official sources. The existing comparison asks whether plugins are supported, not whether every plugin works. Animation remains unknown; existing platform, MIT license, price and collection-date fields are not reverified or changed. A focused regression test protects this scope. No translation, cover or homepage change is needed for an existing boolean capability.

## Validation limitations

No software or add-ins were installed or executed. Compatibility, resource use and behavior on an M4 Mac were not tested. No production deployment was triggered manually and public-site behavior is unverified.
