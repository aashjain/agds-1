"use client";

import { useExperiencePhase } from "./experience";
import { Reveal } from "./reveal";

const ITEMS = [
  { label: "Atmosphere", value: "Realtime particles" },
  { label: "Depth", value: "3D scroll camera" },
  { label: "System", value: "Design-led code" },
];

export const OrbitalDossier = () => {
  const state = useExperiencePhase((s) => s.hero);

  return (
    <aside className="pointer-events-none fixed right-[6vw] top-1/2 z-10 hidden w-[18rem] -translate-y-1/2 xl:block">
      <Reveal state={state} className="rounded-[2rem] border border-border-glass bg-surface-card/70 p-5 shadow-glass-card backdrop-blur-2xl">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-[0.68rem] uppercase tracking-[0.24em] text-foreground/45">
            Live system
          </span>
          <span className="rounded-full border border-accent-cool/30 px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-accent-cool">
            Online
          </span>
        </div>
        <div className="relative mb-6 aspect-square rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_58%)]">
          <span className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground shadow-[0_0_28px_rgba(255,255,255,0.7)]" />
          <span className="absolute inset-5 rounded-full border border-dashed border-accent-cool/35" />
          <span className="absolute inset-12 rounded-full border border-accent-warm/20" />
          <span className="absolute left-[68%] top-[26%] size-2 rounded-full bg-accent-warm shadow-[0_0_22px_var(--accent-warm)]" />
          <span className="absolute bottom-[23%] left-[24%] size-2 rounded-full bg-accent-violet shadow-[0_0_22px_var(--accent-violet)]" />
        </div>
        <div className="space-y-3">
          {ITEMS.map((item) => (
            <div key={item.label} className="flex items-center justify-between border-t border-white/10 pt-3">
              <span className="text-[0.72rem] uppercase tracking-[0.16em] text-foreground/42">
                {item.label}
              </span>
              <span className="text-sm text-foreground/82">{item.value}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </aside>
  );
};
