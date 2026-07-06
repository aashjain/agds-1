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

## Revision V3 - Service Planet + Sequential Cards

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

## V8 refinement
- Shifted the service-stage planet back towards the left so it reads as an oversized celestial body with most of the sphere visible and a controlled portion outside the viewport.
- Rebalanced the service camera look target to support the 80% visible / 20% cropped-left composition.
- Rebuilt the services overlay into a three-column masonry structure with two cards per column, preserving the requested top/bottom service order while avoiding content cropping.
- Removed negative masonry offsets and fixed card heights so all six cards can expand naturally around their copy.

### V9 refinement
- Shifted only the service-stage planet 20% further left.
- Service card layout and masonry positioning were left unchanged.


## V10 revision
- Shifted only the service-stage particle planet 20% further left.
- Service card layout and styling were intentionally left untouched.


## V11 revision
- Moved only the service-stage particle planet 40% further left by adjusting its shader X offset.
- Service card layout and styling were left untouched.


## V12 Adjustment
- Shifted only the service-stage planet 40% further left from the V11 position.
- Service card layout and styling were left untouched.


## V13 Revision
- Increased only the service-stage planet and its ring scale by 40%.
- Kept the current planet centre/offset values unchanged.
- Service card layout and styling were not modified.


## V14 Revision
- Increased only the service-stage planet and ring scale by a further 40%.
- Service card layout and planet positioning values were left unchanged.


## V15 ring refinement
- Increased only the service-stage planet ring thickness.
- Added a 10-degree pitched ring treatment so the band has visible width, closer to the supplied Saturn-style reference.
- Preserved the approved planet position and service-card layout.


## V17 ring angle refinement
- Raised only the rear arc of the service-stage planet ring so the backside sits higher while the approved front crossing, planet position, planet scale and service cards remain unchanged.


## V18 Ring Angle Revision
- Adjusted only the service-stage planet ring tilt to 37 degrees.
- Planet position, planet size and service cards remain unchanged from the approved version.


## V19 Revision
- Restored the particle colour palette across the full homepage animation to the original uploaded project colours: deep blue blending into warm orange.
- Kept the approved planet position, planet size, ring angle and service-card layout unchanged.


## V20 Revision
- Reversed only the service-ring particle flow so the ring reads clockwise.
- Kept the rear arc lifted and the front crossing in its approved position, creating a motion path from the upper backside of the planet towards the lower front side.
- No changes made to planet size, planet placement, service cards, particle colours or layout.


## V21 Revision
- Increased the particle source resolution to make the service planet visibly denser.
- Shifted a larger percentage of the service-stage particles into the planet body while preserving the approved ring direction, size and angle.
- Slightly strengthened point opacity and minimum point size so the planet reads as a fuller sphere without changing the service-card layout.


## V22 Revision
- Increased only the particle source resolution by roughly 80% from the V21 density pass so the service-stage planet reads as a fuller, denser sphere.
- No changes were made to the approved planet position, ring angle, ring direction or service-card layout.

## V23 Motion Timing Revision
- Kept the particle field rotating in one consistent clockwise direction during the transition from the opening orbit into the service planet.
- Delayed the service-card reveal so the planet forms first, then the six service cards appear in sequence through the service section.
- Preserved the approved planet position, planet density, ring angle, ring direction, particle colours and service-card layout.


## V24 uniform scroll update

- Added a capped smooth-scroll driver inside `ParticleCanvas`.
- Raw page scroll now acts as a target, while the 3D animation advances towards it at a controlled, uniform rate.
- Fast scrolling no longer forces the particles, planet formation or card reveal to jump forward abruptly.
- No changes were made to the approved planet position, planet scale, ring angle, particle colours or service card layout.

## V25 Motion Correction
- Removed scroll-progress driven particle rotation from the WebGL object.
- Particle travel is now governed by time only, so the opening field does not reverse direction when the user scrolls.
- Preserved all approved planet, ring, service-card, colour and layout settings.

## V26 revision
- Increased particle motion speed during scroll activity while preserving the approved clockwise direction.
- The boost is based on absolute scroll activity, not scroll direction, so the particles do not reverse when the user scrolls.
- Service cards, planet position, planet size, ring angle, ring direction and particle colours were not changed.

## V27 update
- Reworked scroll-linked particle acceleration so raw scroll velocity increases particle speed directly.
- The speed boost uses absolute scroll movement only, preserving clockwise direction while restoring the faster animated feel from the earlier version.
- Kept the camera smoothing, planet position, service cards, ring angle, density and colour palette unchanged.


## V28 revision
- Removed the scroll-velocity rotation accumulator that was still causing a visible direction fight.
- Particle speed still increases while scrolling through the shader time value only.
- The particle field now keeps a single clockwise travel direction while gaining speed on scroll.


## V29 - Scroll-scrubbed particle system
- Converted the particle animation from time-accumulated motion to scroll-scrubbed motion.
- Particle positions, orbit travel, ring movement, morph states and camera transitions now derive from the same smoothed scroll progress.
- Scrolling down moves the scene forward; scrolling up returns it backwards through the same path.
- Kept the approved planet placement, planet size, ring angle, service cards and visual layout unchanged.


## V31 revision
- Removed the lingering WaveSection glass panel after its content leaves the viewport.
- Preserved scroll-linked particle travel with subtle ambient particle motion.

## V32 revision
- Restored the service-planet framing behaviour from V22.
- The planet now settles into the earlier approved viewport position during formation instead of rotating out of frame.
- Service cards, card timing, ring angle, density, colours, scroll-linked morphing and ambient particle motion remain unchanged.

## V33 ring refinement
- Rebuilt the service-stage ring as a flat, inclined annulus to remove the folded/dented look.
- Increased the ring band thickness by 3x while keeping the approved planet and card placement intact.
- Applied an even blue-orange particle mix across the full ring, rather than isolated colour sections.


## V37 Update
- Flipped only the planet ring along the X axis.
- Preserved planet position, planet size, service cards, scroll behaviour and overall layout.
- Kept the latest ring colour logic as orange-dominant with blue accents and no violet/pink particles.


## V38 refinement
- Updated the service planet body to use an 85% blue, 10% orange and 5% violet particle mix.
- Lifted only the Saturn-style ring upward by roughly 20%, keeping the approved planet placement and service card layout untouched.


V41 update:
- Added back ring masking so the rear ring is softened behind the planet.
- Lifted the full ring upward so it sits around the planet instead of reading too low.
- Kept planet position, planet size, service cards, scroll behaviour and copy unchanged.


## V42 revision
- Brought the planet ring upward by roughly 40% while keeping the planet, cards, scroll behaviour and layout unchanged.


V43 update:
- Applied the ring lift after the ring slant/rotation so the upward move is visually visible in the browser.
- Planet position, planet size, service cards and scroll behaviour were not changed.


## V44 Revision
- Increased the Saturn-style ring band width by 2x only.
- Planet position, cards, scroll behaviour and colour logic were kept unchanged.


## V45 overlap timing fix
- Delayed the wave/next section start until after the service-card fade-out completes.
- Added a small scroll buffer so the last service card clears before the next section appears.
- Kept the planet, cards, ring, particles, colours and layout unchanged.

## V47 Revision

Restored the background shader treatment from the original uploaded project so the final ecosystem section uses the original aurora style background rather than the newer green glow treatment.


## V48 corrections
- Restored the original uploaded-project aurora shader and original blue/orange background uniforms (#3366ff and #ff4c33).
- Reworked the service-to-trajectory timing so the camera passes through the orbital gap between the planet and the ring before the trajectory content appears.
- Delayed the trajectory overlay so it starts after the service cards clear and after the gap transition begins.
- Kept the approved planet, ring, cards, colours, scroll behaviour and content unchanged otherwise.

V49 update:
- Replaced the final background particle formation with the original uploaded-project circular portal treatment.
- Kept the approved AG Designs Studio homepage flow, services, planet, ring and scroll behaviour intact.

## V50 Colour Revision
- Updated the final circular particle background to use the full original-style spectrum from the uploaded reference.
- Added electric blue, deep blue, violet, soft purple, magenta, warm orange and red-orange across the final energy ring.
- Kept the approved planet, service cards, ring styling, scroll behaviour and content unchanged.


## V52 Particle colour source sync
- Synced all particle colours back to the uploaded original project shader palette.
- Removed section-specific particle colour overrides for the service planet, planet ring and final portal.
- Restored the original particle fragment opacity multiplier.
- Restored the original background shader file from the uploaded project.
- Preserved the approved layout, planet framing, service cards and scroll logic.


## V54 correction
- Reverted the animation, scroll logic, camera movement, service timing and particle morph system back to the V52 project behaviour.
- Kept only the original uploaded-project visual particle look values: geometry density and bloom strength/radius/threshold.
- Did not copy the original project's animation sequence or scroll behaviour.
- Planet placement, ring treatment, services layout and approved page flow remain based on the AG Designs Studio version.

## V55 colour proportion update
- Applied the screenshot-matched particle colour proportion across all particle forms.
- Ratio used: 45 percent blue/cyan, 44 percent orange/red-orange, 6 percent violet and 5 percent pink/magenta.
- Kept glow, opacity, bloom, scroll behaviour, planet position, ring position and service cards unchanged.

## V56 Update
- Replaced random particle colour assignment with a position-based spatial gradient.
- Kept the approved proportion visually: 45% blue/cyan, 44% orange/red-orange, 6% violet/purple, 5% pink/magenta.
- The palette now flows directionally across each particle form instead of appearing as scattered multicolour dots.
- Scroll behaviour, animation flow, planet, ring, services and layout were not changed.

## V57 refinement

- Reworked particle colour mapping from a broad global left-to-right gradient into local, form-aware spatial gradients.
- Narrowed the violet and magenta transition bands so they appear as a refined bridge, not as large pink colour blocks.
- Restored stronger orange/red-orange presence on the warm side while preserving blue/cyan dominance on the cool side.
- Applied separate local colour axes for the hero orbit, focused planet, service planet, ring, stream and final portal so each form keeps the same premium blue-to-violet-to-magenta-to-orange direction without looking like random confetti.
- Animation flow, scroll behaviour, planet position, ring position, service cards and layout were not changed.

## V58 Colour Refinement
- Reworked the particle colour logic again so the colour distribution is spatial and directional, not random.
- Reduced the orange-heavy wash in the hero section.
- Reduced the service planet turning into one flat warm mass.
- Blue/cyan, violet/purple, pink/magenta and orange/red-orange now follow the local geometry angle of each form.
- Preserved the approved scroll behaviour, planet framing, service cards and layout.

## V59 Planet and Ring Colour Refinement
- Kept the approved banner colour treatment unchanged.
- Added a separate spatial palette for the service planet so it remains mostly blue/cyan with restrained violet, pink and warm edge accents.
- Added a dedicated orbital-ring palette so the ring reads as a continuous warm orange/red band with blue accents, not random colour scatter.
- Removed the duplicated service colour declaration in the particle shader.
- Did not change planet position, ring position, card layout, scroll behaviour or section timing.


## V60 revision
- Updated the service planet ring palette so the ring uses only warm orange/red-orange tones.
- Removed blue, violet, pink and magenta from the service ring colour function only.
- Kept planet colours, service cards, layout, scroll behaviour and the approved banner particle treatment unchanged.


## V61 timing adjustment

- Started the camera zoom into the planet/ring gap at 38% orbit progress instead of waiting until the service cards begin to clear.
- Kept service card layout, fade timing, planet position, ring position, colours and scroll behaviour unchanged.
- The zoom now develops gradually from 38% to the trajectory transition window, so there is no dead scroll between service reveal and the next section.


## V62 Update
- Adjusted only the trajectory zoom timing.
- The camera zoom now starts shortly after the last service tile has appeared, using a small scroll buffer equivalent to roughly 100px.
- The zoom ramp is tighter, so the movement is visible before the service cards begin fading.
- Service cards, planet position, ring position, colours, layout and scroll behaviour remain unchanged.


## V63 transition timing
- Extended the planet-to-trajectory zoom so it continues after service cards fade.
- Added a tunnel-hold camera phase from the end of the services section until the trajectory stream begins.
- Kept cards, planet, ring colours, positions and layout unchanged.


## V64 transition refinement

- Changed the service-to-trajectory camera move so the zoom continues into the planet rather than drifting outside its edge.
- Tightened the gap between the service-card fade out and trajectory section to roughly a short 300px-style transition window.
- Brought the trajectory content in earlier while preserving the approved planet, ring, services and particle colour treatments.

## V65 transition refinement
- Changed the service-to-trajectory morph so the planet transforms into the trajectory particle field within the short post-service scroll window.
- Kept the zoom moving through the planet instead of holding while only the ring rotates.
- Reframed the trajectory particle field with reduced depth spread and tighter x/y bounds so particles remain inside the viewport throughout the trajectory section.
- Service cards, planet placement, ring placement, colours and content were not changed.


## V67 transition correction
- Reverted the V66 centring approach that pushed the trajectory particles left/outside the viewport.
- Kept the earlier visible circular reveal, but added a controlled centre-resolve stage before the final ring emerges.
- Locked the particle group rotation during the trajectory section so the stream remains in frame.
- The trajectory field now gathers at screen centre before the circular background begins to form.

## V68 trajectory correction

- Slowed the planet-to-trajectory transition by extending the stream morph window.
- Restored the trajectory field closer to the V22 form with a broader, readable campaign-signal shape.
- Re-centred the camera target during the trajectory phase so the particles begin in frame instead of starting mostly outside the viewport.
- Removed the sharp spatial colour split from the trajectory section and replaced it with a controlled mixed palette, so no hard line pattern forms inside the field.
