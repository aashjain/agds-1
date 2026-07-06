import { create } from "zustand";

export const experienceProgress = { current: 0 };

export type SectionState = "before" | "visible" | "after";

export const PHASE = {
  hero: { leave: 0.12 },
  dna: { in: 0.18, full: 0.24, fadeStart: 0.43, out: 0.5, spanEnd: 0.5 },
  // Wave content now starts only after the service cards have fully cleared.
  // This creates a small scroll buffer between the service section and the next section.
  wave: { in: 0.555, out: 0.72 },
  galaxy: { in: 0.79 },
} as const;

export interface ExperiencePhase {
  hero: SectionState;
  wave: SectionState;
  galaxy: SectionState;
  dnaActive: boolean;
  sync: (progress: number) => void;
}

const heroState = (p: number): SectionState =>
  p < PHASE.hero.leave ? "visible" : "after";

const waveState = (p: number): SectionState => {
  if (p < PHASE.wave.in) return "before";
  if (p <= PHASE.wave.out) return "visible";
  return "after";
};

const galaxyState = (p: number): SectionState =>
  p >= PHASE.galaxy.in ? "visible" : "before";

export const useExperiencePhase = create<ExperiencePhase>((set, get) => ({
  hero: "visible",
  wave: "before",
  galaxy: "before",
  dnaActive: false,
  sync: (p) => {
    const hero = heroState(p);
    const wave = waveState(p);
    const galaxy = galaxyState(p);
    const dnaActive = p > PHASE.dna.in && p < PHASE.dna.spanEnd;
    const s = get();
    if (
      s.hero === hero &&
      s.wave === wave &&
      s.galaxy === galaxy &&
      s.dnaActive === dnaActive
    ) {
      return;
    }
    set({ hero, wave, galaxy, dnaActive });
  },
}));
