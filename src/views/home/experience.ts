import { create } from "zustand";

/**
 * Shared state for the scroll experience.
 *
 * `ParticleCanvas` owns the single smoothed scroll value and, each frame,
 * publishes it two ways:
 *  - `experienceProgress.current` — a mutable read for per-frame animators
 *    (no React re-render).
 *  - `useExperiencePhase` — coarse section states updated **only when they
 *    change**, so overlay springs re-render at phase boundaries, not 60×/s.
 */

/** Live smoothed scroll progress, 0 (top) → 1 (bottom). */
export const experienceProgress = { current: 0 };

export type SectionState = "before" | "visible" | "after";

/** Scroll-progress windows for each overlay section. */
export const PHASE = {
  hero: { leave: 0.05 },
  services: { in: 0.19, out: 0.38 },
  signal: { in: 0.45, out: 0.6 },
  ecosystem: { in: 0.88 },
} as const;

export interface ExperiencePhase {
  hero: SectionState;
  services: SectionState;
  signal: SectionState;
  ecosystem: SectionState;
  /** Recompute states from progress; only writes when something changed. */
  sync: (progress: number) => void;
}

const heroState = (p: number): SectionState =>
  p < PHASE.hero.leave ? "visible" : "after";

const windowState = (
  p: number,
  win: { in: number; out: number },
): SectionState => {
  if (p < win.in) return "before";
  if (p <= win.out) return "visible";
  return "after";
};

const ecosystemState = (p: number): SectionState =>
  p >= PHASE.ecosystem.in ? "visible" : "before";

export const useExperiencePhase = create<ExperiencePhase>((set, get) => ({
  hero: "visible",
  services: "before",
  signal: "before",
  ecosystem: "before",
  sync: (p) => {
    const hero = heroState(p);
    const services = windowState(p, PHASE.services);
    const signal = windowState(p, PHASE.signal);
    const ecosystem = ecosystemState(p);
    const s = get();
    if (
      s.hero === hero &&
      s.services === services &&
      s.signal === signal &&
      s.ecosystem === ecosystem
    ) {
      return;
    }
    set({ hero, services, signal, ecosystem });
  },
}));
