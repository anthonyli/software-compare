# Labs-inspired discovery homepage (preview only)

Branch: `preview/labs-scenarios`. This is an exploratory direction, not a production redesign or a copy of Google's assets.

## Run locally

```sh
git fetch origin
git switch --track origin/preview/labs-scenarios
cd site
npm ci
npm run dev:ui
```

Open the local URL Astro prints (normally http://localhost:4321). `dev:ui` previews the frontend, category pages and search; live vote APIs need the existing full `npm run dev` setup.

## Included

- Immersive dark carousel with layered perspective, curved stage lines, dimensional interface illustrations, neighboring cards and eased spatial transitions.
- Six task-first entry points: hosting, screen recording, email, cloud SQL, image editing and backend services.
- Random starting scene and a surprise button, explicit previous/next and direct selection. Automatic advance every 4.5 seconds, with a pause/play control. Hover, keyboard focus, hidden tabs and offscreen state pause playback; reduced-motion disables automatic motion. Keyboard arrows, swipe, focus control and reduced-motion support.
- Chinese/English labels; responsive mobile layout; all existing catalog data, search and category grouping retained.
- Cream directory surface and restrained card hover interaction.

No external imagery, animation dependency, third-party API, data migration or production configuration changes. The illustrations are conceptual, not screenshots or product endorsements.

## Checks

`npm test`, `npm run check:covers`, `npm run build`, and `npm run test:e2e`. `labs-scenarios.spec.ts` covers all scene links, controls, language switching, narrow/tablet/desktop layouts and reduced motion, and emits screenshots to the Labs visual preview CI artifact.
