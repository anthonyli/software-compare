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

- Full-viewport scenes under a genuinely transparent, overlaid header. Controls stay within the first viewport, including short desktop windows.
- A custom SVG liquid mask reveals each new scene from the center with an undulating edge. The previous scene remains visible outside the expanding mask. The translucent rim and first-entry reveal use the same mechanism, not a horizontal card translation.
- Six task-first entry points with original translucent interface illustrations. No Google imagery or source code is reused.
- Automatic advance every six seconds; progress dots select scenes. Clicking the active progress pauses/resumes. Arrow keys and touch swipes navigate; no separate right-side play or arrow buttons.
- Pointer hover does not pause playback. Keyboard focus, hidden tabs and offscreen state pause playback. Reduced-motion skips the reveal and disables automatic advance.
- Chinese/English, search and catalog retained. Grid remains in the light catalog area and on category/product pages, not the immersive stage.

Reference observation: directly interacted with labs.google in the cloud browser. Observed central organic mask expanding over the previous full-screen scene, rather than a card sliding sideways, and navigation over the scene itself. Short screenshot sequences cannot establish exact original timings or shader implementation; this is an original SVG reconstruction of the visible behavior.

## Checks

`npm test`, `npm run check:covers`, `npm run build`, and `npm run test:e2e`. `labs-scenarios.spec.ts` covers all scene links, controls, language switching, narrow/tablet/desktop layouts and reduced motion, and emits screenshots to the Labs visual preview CI artifact.

## Latest refinement
Restored the six original bright scene colors from commit 4acc100 (not darkened gradient approximations). Header stays transparent with dark high-contrast navigation. Six distinct organic silhouettes use different low-frequency lobes and phases. Each 1.25-second reveal reaches outward (525ms), quickly recoils (about 160ms), then visibly rotates its silhouette and expands beyond the viewport. There is no prolonged hold. Background cards move independently and slowly through perspective depth over 7.25 seconds, retaining their own tilt; they do not rush forward with the wipe. The joins use smooth zero-velocity easing. Pointer hover does not pause anything. Explicit active-progress/Space pause, keyboard-focus protection and reduced-motion remain. Fixed-clock screenshots capture the hold/recoil/release states and all six shapes; realtime autoplay is independently tested. Labs was visually inspected in multiple continuous screenshot sequences; this is an original SVG interpretation, not a claim to reproduce its underlying shader or exact timing.
