# whisper.cpp transcript output verification

Issue #443, checked 2026-11-18. Official stable v1.9.5 resolves to d1be6fde11ac6e0407606b4e42fe72d34add8037.

https://github.com/ggml-org/whisper.cpp/blob/d1be6fde11ac6e0407606b4e42fe72d34add8037/examples/cli/cli.cpp

The CLI parses --output-txt, --output-vtt, --output-srt, --output-csv and --output-json, advertises the file formats in usage, and calls the corresponding output functions after inference. This verifies text/subtitle export, not automatic availability in every third-party GUI. Existing model/build/input conversion, live-microphone and GUI caveats remain unchanged. No audio was transcribed, no performance/accuracy claim is made.

Only the transcript_export cell and official source link change; all shared translations and other product fields are unchanged.
