import { homeContent } from "@/data/mocks/home";

import { EcosystemSection } from "./ecosystem-section";
import { HeroSection } from "./hero-section";
import { ParticleCanvas } from "./particle-canvas";
import { ServicesSection } from "./services-section";
import { SignalSection } from "./signal-section";

/**
 * Home view — the scroll-driven AG Designs Studio journey. A Server Component
 * composing the fixed WebGL canvas and the overlay sections (all client
 * leaves) over a tall scroll driver.
 *
 * Journey: orbital marketing system → focused brand planet (services) →
 * campaign signal field → full ecosystem orrery.
 */
export const HomeView = () => {
  return (
    <main>
      <ParticleCanvas />

      <HeroSection content={homeContent.hero} />
      <ServicesSection content={homeContent.services} />
      <SignalSection content={homeContent.signal} />
      <EcosystemSection content={homeContent.ecosystem} />

      {/* Scroll driver — 12 screens of height produce the 0→1 progress that
          morphs the particles and reveals each overlay. */}
      <div aria-hidden="true" className="h-[1200vh]" />
    </main>
  );
};
