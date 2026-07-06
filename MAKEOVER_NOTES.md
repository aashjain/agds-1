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

## Revision V3 — Service Planet + Sequential Cards

- Reworked the service phase so the particle field resolves into a complete, anchored planet instead of a partially clipped shape.
- Adjusted the camera position and look target so the focused planet stays inside the viewport during the service section.
- Replaced the drifting three-card overlay with six service cards arranged in two rows.
- Service cards now appear one by one in a controlled sequence, with no random orbital movement.
- Updated the six visible services to: Website Development, Social Media Marketing, SEO, Branding & Designing, Content Writing, and Strategy & Planning.

## V4 refinements
- Repositioned and resized the service-stage particle planet so the full sphere remains inside the viewport.
- Adjusted camera/target values for the service stage to prevent the top of the planet from clipping.
- Expanded the services grid across the available right-side width.
- Reduced compact card height and title scale so all six service cards can read as a balanced two-row section.
- Tightened the sequential card reveal so the services appear in order without random floating movement.

## V5 refinements
- Advanced the transition into the service planet earlier, so the service scene no longer shows the previous partially visible planet at the same time as the cards.
- Reduced the service planet radius and moved it further inside the frame, keeping the complete sphere visible instead of clipping at the top edge.
- Rebalanced the service camera and look target for a cleaner left-planet / right-content composition.
- Reworked the service cards into a staggered masonry-style grid with varied card heights and offsets while keeping the six service cards readable across the right-side width.

## V6 revision
- Enlarged the left service planet so it reads closer to a full-height sphere while keeping its circular aspect ratio.
- Repositioned the service planet and ring system further inside the scene so it has more presence without top cropping.
- Rebuilt the service-card layout as a true auto-height masonry grid instead of fixed row spans.
- Removed fixed-height clipping from compact cards so all content remains visible.


## V7 revision
- Moved the service-stage planet further right and enlarged the particle sphere/ring so it has stronger screen presence.
- Tuned the service camera to keep the planet visible while allowing it to feel close and immersive.
- Replaced the masonry service layout with a clean two-row, three-column grid as requested.
- Reduced compact service-card typography slightly and kept cards auto-height so text no longer crops.

## V7 refinement
- Shifted the service-stage planet further into the viewport and reduced global Y-rotation during the service scene so the planet remains visually present instead of sliding out of frame.
- Enlarged the service planet while keeping the same spherical aspect ratio.
- Rebuilt the service cards as a controlled 3-column / 2-row masonry composition with staggered vertical offsets.
- Removed fixed-height/cropping behaviour from the service cards so each card expands naturally around its content.
