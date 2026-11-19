# NetBeans integrated terminal

Verified 2026-11-19 from released tag 32. Existing integrated_terminal unknown → partial.

Sources under https://github.com/apache/netbeans/blob/32/ide/dlight.terminal/src/org/netbeans/modules/dlight/terminal/action/ :
- LocalTerminalAction.java registers the local terminal action and local execution environment.
- TerminalAction.java opens the TerminalContainerTopComponent and terminal IO provider.
- TerminalSupportImpl.java checks PtySupport.isSupportedFor; without support it returns after notifying the user, using the Windows-specific no-Cygwin message.
- Bundle.properties supplies that missing-Cygwin message.

Partial reflects native PTY/system prerequisites. Not a claim that every OS/package works without setup, that every shell/emulation feature is supported, or that remote development is verified. Other unknown fields remain unknown. No actual terminal launched, Cygwin installed or production accessed. Existing translations unchanged.
