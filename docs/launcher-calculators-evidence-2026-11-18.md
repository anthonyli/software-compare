# Launcher calculator verification

Issue #408. Checked 2026-11-18 against official sources, without executing either launcher.

- Flow Launcher v2.1.4 README documents its Calculator feature and copying arithmetic results. https://github.com/Flow-Launcher/Flow.Launcher/blob/9fe822b398ad9541a1a35fb1c688a006a27f2f9d/README.md#calculator . Current official feature listing agrees: https://www.flowlauncher.com/ .
- Ulauncher stable 5.15.0 includes CalcMode in the application itself, evaluating arithmetic expressions with addition, subtraction, multiplication, division and powers. https://github.com/Ulauncher/Ulauncher/blob/b243dd00a97cffff803f64d127f46e9fde9b13d1/ulauncher/search/calc/CalcMode.py . The official stable documentation lists this module: https://docs.ulauncher.io/en/stable/genindex.html .

The binary calculator feature means arithmetic calculation is available, not that either product is a full symbolic algebra system. Only two existing unknown cells become yes, with evidence sources appended. No existing notes are removed; no translation keys, versions, prices, layout or other features change.
