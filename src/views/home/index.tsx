import { homeContent } from "@/data/mocks/home";

import { CapabilityRibbon } from "./capability-ribbon";
import { DnaCards } from "./dna-cards";
import { GalaxySection } from "./galaxy-section";
import { HeroSection } from "./hero-section";
import { OrbitalDossier } from "./orbital-dossier";
import { ParticleCanvas } from "./particle-canvas";
import { SiteChrome } from "./site-chrome";
import { WaveSection } from "./wave-section";

/**
 * Home view — the scroll-driven particle experience rebuilt from the source
 * `New Era` project. A Server Component that composes the fixed WebGL canvas and
 * the overlay sections (all client leaves) over a tall scroll driver.
 */
export const HomeView = () => {
  return (
    <main>
      <ParticleCanvas />
      <SiteChrome />

      <HeroSection content={homeContent.hero} />
      <OrbitalDossier />
      <DnaCards cards={homeContent.cards} />
      <WaveSection content={homeContent.wave} />
      <CapabilityRibbon />
      <GalaxySection content={homeContent.galaxy} />

      {/* Scroll driver — 14 screens of height produce the 0→1 progress that
          morphs the particles and reveals each overlay (source body 1400vh). */}
      <div aria-hidden="true" className="h-[1600vh]" />
    </main>
  );
};
