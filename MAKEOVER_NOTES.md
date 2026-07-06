# AG Designs Studio Makeover Notes

## Direction
The homepage has been reframed for AG Designs Studio, a digital marketing agency. The experience now begins with a particle-based solar system, then moves into a focused planet, service constellation, campaign signal field and final marketing ecosystem.

## Key changes
- Rewrote homepage content for a digital marketing agency.
- Rebuilt the WebGL particle shader flow so it is no longer the original circle/DNA/wave/black-hole sequence.
- Updated particle colours to a refined cosmic palette: deep navy, ion cyan, violet and antique gold.
- Changed camera movement to support the new journey: solar system → planet focus → service constellation → campaign streams → galaxy.
- Added fixed AG Designs Studio navigation chrome and scroll progress indicator.
- Redesigned hero layout with an editorial left-aligned composition and a desktop Live Orbit Map panel.
- Reworked floating cards as marketing capability dossiers.
- Added placeholder routes for future website pages.

## New routes added
- `/about-us`
- `/contact-us`
- `/our-services`
- `/services/[slug]`
- `/blogs`
- `/blogs/[slug]`

These pages are intentionally minimal placeholders so the homepage direction can be approved first.

## Validation note
`npm run lint` could not be executed because the submitted ZIP does not include `node_modules`, so `eslint` is not available locally. Run `npm install` or `yarn install`, then run `npm run lint` and `npm run build` in the final development environment.


## Revision after preview feedback
- Reduced bloom strength/radius and increased threshold so the solar orbit reads as individual particles rather than a bright white blur.
- Restored original-style particle fragments: soft dots without the added halo layer.
- Lowered point opacity, point size and colour intensity in the opening solar system.
- Hidden the later section glass cards until their scroll phase begins, so no empty boxes appear in the opening hero.
