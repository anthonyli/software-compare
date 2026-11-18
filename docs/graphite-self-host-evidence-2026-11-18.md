# Graphite self-hosting scope — Issue #445

Checked 2026-11-18 using official source, not an installed or deployed Graphite test.

The development setup guide alone documents a localhost development server and is insufficient evidence for a production-hosting claim. This change instead uses the official release build and deployment pipeline at immutable commit c6686a65c31230e9db8d3316d5361c551b450f43:

- `.github/workflows/build.yml`: `cargo run build web` builds the web application; the pipeline deploys `frontend/dist` to Cloudflare Pages and uploads the same directory as `graphite-web-bundle`.
- `tools/cargo-run/src/main.rs`: Build + Web produces the Wasm and Vite web bundle; release is the build default.
- `frontend/vite.config.ts`: copies static assets and emits the service worker into the output; optional Wasm splitting accommodates the hosting provider's file size limit.

Together these support a limited, source-built Web bundle that can be hosted, not a one-command supported production service or collaborative server. Rust, Node.js and deployment setup are required. Provider-specific limits, required headers/assets and application behavior must be validated for the chosen host. No promise of fully offline operation, zero external requests, multi-user collaboration, SLA, or successful independent deployment is made. Existing alpha, desktop RC, roadmap and external-resource caveats are preserved.

Only Graphite's self_host feature and immutable sources change. The concise technical note is ASCII and works unchanged in both locales; the shared English dictionary and other product records are untouched. No accounts, artwork, production pages or paid services were accessed.

## Sources
- https://github.com/GraphiteEditor/Graphite/blob/c6686a65c31230e9db8d3316d5361c551b450f43/.github/workflows/build.yml
- https://github.com/GraphiteEditor/Graphite/blob/c6686a65c31230e9db8d3316d5361c551b450f43/tools/cargo-run/src/main.rs
- https://github.com/GraphiteEditor/Graphite/blob/c6686a65c31230e9db8d3316d5361c551b450f43/frontend/vite.config.ts
