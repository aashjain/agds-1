import { homeContent } from "@/data/mocks/home";

import { DnaCards } from "./dna-cards";
import { GalaxySection } from "./galaxy-section";
import { HeroSection } from "./hero-section";
import { ParticleCanvas } from "./particle-canvas";
import { WaveSection } from "./wave-section";
import { SiteChrome } from "./site-chrome";


export const HomeView = () => {
  return (
    <main>
      <ParticleCanvas />
      <div aria-hidden="true" className="ag-orbital-grid pointer-events-none fixed inset-0 z-0 opacity-40" />
      <SiteChrome />

      <HeroSection content={homeContent.hero} />
      <DnaCards cards={homeContent.cards} />
      <WaveSection content={homeContent.wave} />
      <GalaxySection content={homeContent.galaxy} />

      {/* Scroll driver - 14 screens of height produce the 0→1 progress that
          morphs the particles and reveals each overlay (source body 1400vh). */}
      <div aria-hidden="true" className="h-[1200vh]" />
    </main>
  );
};
