"use client";

import { useExperiencePhase } from "./experience";
import { Reveal } from "./reveal";

const CAPABILITIES = ["3D Web", "Motion UI", "Brand Systems", "SEO Structure"];

export const CapabilityRibbon = () => {
  const state = useExperiencePhase((s) => s.wave);

  return (
    <div className="pointer-events-none fixed bottom-[12vh] left-1/2 z-10 hidden -translate-x-1/2 lg:block">
      <Reveal state={state} className="flex gap-3 rounded-full border border-border-glass bg-surface-glass px-3 py-3 backdrop-blur-2xl">
        {CAPABILITIES.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 px-5 py-3 text-[0.72rem] uppercase tracking-[0.18em] text-foreground/65"
          >
            {item}
          </span>
        ))}
      </Reveal>
    </div>
  );
};
