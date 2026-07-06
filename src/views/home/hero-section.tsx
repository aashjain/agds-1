"use client";

import { Eyebrow } from "@/components/ui/eyebrow";
import { GlassButton } from "@/components/ui/glass-button";
import type { ExperienceCopy } from "@/data/mocks/home";

import { useExperiencePhase } from "./experience";
import { Reveal } from "./reveal";
import { SectionTitle } from "./section-title";

// TextEngine lays its words out as inline-blocks, so `text-align: center` alone
// doesn't reliably centre them — drive centring with a flex container instead.
export const HERO_TITLE_CLASS =
  "flex flex-wrap justify-center font-display text-display font-semibold leading-title tracking-title text-center text-foreground text-fade-trailing text-balance";

export interface HeroSectionProps {
  content: ExperienceCopy;
}

export const HeroSection = ({ content }: HeroSectionProps) => {
  const state = useExperiencePhase((s) => s.hero);

  return (
    <section
      aria-label="Introduction"
      className="pointer-events-none fixed inset-0 z-10 flex flex-col items-center justify-center px-5 text-center xl:items-start xl:px-[8vw] xl:text-left"
    >
      <Reveal state={state} className="mb-10">
        <Eyebrow>{content.eyebrow}</Eyebrow>
      </Reveal>

      <Reveal state={state} enterAnimated={false} className="mb-7 max-w-title">
        <SectionTitle
          tag="h1"
          text={content.titleLines.join(" ")}
          className={`${HERO_TITLE_CLASS} xl:justify-start xl:text-left`}
        />
      </Reveal>

      <Reveal
        state={state}
        tag="p"
        className="mb-12 max-w-lead text-lead leading-normal text-muted xl:text-left"
      >
        {content.subtitle}
      </Reveal>

      <Reveal
        state={state}
        className="flex gap-4 max-md:w-full max-md:max-w-75 max-md:flex-col"
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
    </section>
  );
};
