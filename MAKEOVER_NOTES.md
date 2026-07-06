# New Era — Makeover Notes

## What changed

- Repositioned the experience away from a generic centred template into an editorial, premium spatial interface.
- Added a fixed brand/navigation chrome with scroll-depth feedback and chapter states.
- Added an orbital live-system dossier on desktop to make the hero feel designed rather than templated.
- Added a capability ribbon during the wave section to connect the 3D particles with clear business outcomes.
- Rewrote the homepage copy into a sharper immersive web-studio narrative.
- Refined the colour system from stock orange/blue into a deeper cosmic palette: deep navy, ion cyan, soft violet and antique gold.
- Tuned the Three.js particle system: denser sphere geometry, slower premium motion, softened bloom, richer galaxy colouring and a more distinctive wave drift.
- Updated global typography, spacing and glass surfaces for a more premium, client-presentable finish.

## Files changed / added

- `src/data/mocks/home.ts`
- `src/app/globals.css`
- `src/views/home/index.tsx`
- `src/views/home/hero-section.tsx`
- `src/views/home/wave-section.tsx`
- `src/views/home/galaxy-section.tsx`
- `src/views/home/particle-canvas.tsx`
- `src/views/home/shaders/background.ts`
- `src/views/home/shaders/particles.ts`
- `src/views/home/site-chrome.tsx`
- `src/views/home/orbital-dossier.tsx`
- `src/views/home/capability-ribbon.tsx`

## Notes before presenting

Run locally with:

```bash
yarn install
yarn dev
```

or:

```bash
npm install
npm run dev
```

Then review on desktop and mobile. The project package dependencies were not installed inside this handoff environment, so final visual QA should be done locally.
