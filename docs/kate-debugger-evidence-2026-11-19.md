# Kate debugger support

Checked 2026-11-19 for #607. The existing debugger cell was unknown.

Official stable KF6 manual: https://docs.kde.org/stable_kf6/en/kate/kate/kate-application-plugin-debugger.html

The Kate Debugger plugin is a frontend for Debug Adapter Protocol servers, with GDB as an example. The manual describes breakpoints, stepping, locals and call stacks. Users must enable the plugin, install a compatible server and configure a debugger profile and executable/attach target. Therefore the cell is **partial**, not unknown and not universally available out of the box. Backend language/platform support and packaging can vary; no assertion covers every historical release or all desktop bundles.

Only Kate's debugger cell and this source link change. Other capabilities, license, price, collection metadata and shared translations are intentionally untouched. This source-level check does not claim that an actual debugger was installed or executed. No production access or configuration changes.

Regression: assert the scoped cell/source and retain neighboring unknown remote-development status; browser regression checks bilingual partial labels on product and category pages at desktop/mobile widths. Full unit, cover and build checks plus final push/PR CI are required.
