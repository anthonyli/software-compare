# Apache NetBeans multi-caret

Verified 2026-11-19 from released tag 32. Existing multi_cursor unknown → yes.

- https://github.com/apache/netbeans/blob/32/ide/editor.actions/src/org/netbeans/modules/editor/actions/AddCaretAction.java registers addCaretUp/addCaretDown in edit.multicaret, iterates existing carets and adds new positions above/below using EditorCaret.addCarets.
- https://github.com/apache/netbeans/blob/32/ide/editor.actions/src/org/netbeans/modules/editor/actions/RemoveLastCaretAction.java registers removeLastCaret in the same category.

These are built-in editor module actions, not a third-party plugin or just refactoring. No assertion about a universal keyboard shortcut, cross-file editing, arbitrary custom Swing editors or latest release metadata. LSP, integrated terminal and remote development remain unknown. No NetBeans installation or execution; prior translations unchanged.
