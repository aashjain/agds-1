"use client";

import { Eyebrow } from "@/components/ui/eyebrow";
import { GlassButton } from "@/components/ui/glass-button";
import type { ExperienceCopy } from "@/data/mocks/home";

import { useExperiencePhase } from "./experience";
import { Reveal } from "./reveal";
import { SectionTitle } from "./section-title";

const WAVE_TITLE_CLASS =
  "flex flex-wrap justify-start font-display text-display-sm font-normal leading-title tracking-title text-left text-foreground text-fade-trailing";

export interface WaveSectionProps {
  content: ExperienceCopy;
}

export const WaveSection = ({ content }: WaveSectionProps) => {
  const state = useExperiencePhase((s) => s.wave);

  return (
    <section
      aria-label="The pull of results"
      className="pointer-events-none fixed inset-0 z-10 flex items-end justify-between gap-12 px-6 pb-[14vh] text-left md:px-[8vw]"
    >
      <div className="max-w-title-sm">
        <Reveal state={state} className="mb-6">
          <Eyebrow>{content.eyebrow}</Eyebrow>
        </Reveal>

        {state !== "before" && (
          <Reveal state={state} enterAnimated={false}>
            <SectionTitle
              tag="h2"
              text={content.titleLines.join(" ")}
              className={WAVE_TITLE_CLASS}
            />
          </Reveal>
        )}
      </div>

      {state === "visible" && (
        <div className="hidden max-w-[420px] rounded-[2rem] border border-white/10 bg-surface-card p-6 backdrop-blur-xl lg:block">
          <Reveal state={state} tag="p" className="mb-8 text-lead leading-normal text-muted">
            {content.subtitle}
          </Reveal>

          <Reveal state={state} className="pointer-events-auto flex gap-4">
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
      )}
    </section>
  );
};
