# Language-switch readiness (#450)

Initial language buttons used to be enabled before Layout's module bound click handlers. Static content visibility is not a handler-ready signal. A logic-level experiment against the compiled module demonstrated that an early click is lost, while a later click works.

The first push CI for #447 (run 44281801991, attempt 1) failed the existing privacy-page Chinese-heading-hidden assertion and passed unchanged on rerun. The readiness gap is a plausible explanation, not proof of that run's sole root cause.

The minimal fix renders both buttons disabled and enables them only after click handlers and language attributes are initialized. There are no arbitrary delays or weakened assertions. The original policies browser test remains unchanged. A new regression delays the actual built language initialization module, checks disabled state, releases it, then checks repeated bilingual visibility and navigation to Terms on mobile and desktop. A unit test evaluates the source module's initialization order and repeated clicks.

No production page was visited. Local browser startup is restricted by the execution environment; final CI must execute the browser regressions. No translations, product data or deployment settings are changed.
