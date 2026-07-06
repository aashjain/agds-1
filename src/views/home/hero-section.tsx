"use client";

import { Eyebrow } from "@/components/ui/eyebrow";
import { GlassButton } from "@/components/ui/glass-button";
import type { ExperienceCopy } from "@/data/mocks/home";

import { useExperiencePhase } from "./experience";
import { Reveal } from "./reveal";
import { SectionTitle } from "./section-title";

export const HERO_TITLE_CLASS =
  "flex flex-wrap justify-start font-display text-display font-normal leading-title tracking-title text-left text-foreground text-fade-trailing max-md:justify-center max-md:text-center";

export interface HeroSectionProps {
  content: ExperienceCopy;
}

export const HeroSection = ({ content }: HeroSectionProps) => {
  const state = useExperiencePhase((s) => s.hero);

  return (
    <section
      aria-label="Introduction"
      className="pointer-events-none fixed inset-0 z-10 grid items-center px-6 pt-16 md:grid-cols-[1.1fr_0.9fr] md:px-[8vw]"
    >
      <div className="max-w-[760px] max-md:text-center">
        <Reveal state={state} className="mb-8">
          <Eyebrow>{content.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal state={state} enterAnimated={false} className="mb-7">
          <SectionTitle
            tag="h1"
            text={content.titleLines.join(" ")}
            className={HERO_TITLE_CLASS}
          />
        </Reveal>

        <Reveal
          state={state}
          tag="p"
          className="mb-11 max-w-lead text-lead leading-normal text-muted max-md:mx-auto"
        >
          {content.subtitle}
        </Reveal>

        <Reveal
          state={state}
          className="flex gap-4 max-md:mx-auto max-md:w-full max-md:max-w-75 max-md:flex-col md:pointer-events-auto"
        >
          {content.buttons.map((button) => (
            <GlassButton
              key={button.label}
              variant={button.withArrow ? "primary" : "secondary"}
              withArrow={button.withArrow}
            >
              {button.label}
            </GlassButton>
          ))}
        </Reveal>
      </div>

      <Reveal
        state={state}
        className="hidden justify-self-end md:block"
        enterAnimated={false}
      >
        <aside className="relative w-[360px] overflow-hidden rounded-[2rem] border border-border-glass-strong bg-surface-card p-6 shadow-glass-card backdrop-blur-xl">
          <div className="ag-scanline absolute left-0 top-0 h-px w-full" />
          <p className="mb-8 text-[11px] uppercase tracking-[0.34em] text-accent-cool/80">
            Live Orbit Map
          </p>
          <div className="space-y-5">
            {[
              ["Strategy", "Brand gravity"],
              ["Creative", "Content signal"],
              ["Growth", "Search + media"],
              ["Web", "Conversion path"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-[12px] uppercase tracking-[0.24em] text-foreground/45">
                  {label}
                </span>
                <span className="font-display text-[18px] text-foreground/90">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </aside>
      </Reveal>
    </section>
  );
};
