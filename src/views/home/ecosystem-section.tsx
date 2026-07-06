"use client";

import { Eyebrow } from "@/components/ui/eyebrow";
import { GlassButton } from "@/components/ui/glass-button";
import type { ExperienceCopy } from "@/data/mocks/home";

import { useExperiencePhase } from "./experience";
import { HERO_TITLE_CLASS } from "./hero-section";
import { Reveal } from "./reveal";
import { SectionTitle } from "./section-title";

/**
 * Closing ecosystem moment — the camera has risen to the overhead orrery
 * view; the copy resolves the story and routes to contact or services.
 */
export interface EcosystemSectionProps {
  content: ExperienceCopy;
}

export const EcosystemSection = ({ content }: EcosystemSectionProps) => {
  const state = useExperiencePhase((s) => s.ecosystem);

  return (
    <section
      aria-label="The full ecosystem"
      className="pointer-events-none fixed inset-0 z-10 flex flex-col items-center justify-between px-5 py-[15vh] text-center"
    >
      <div className="flex flex-col items-center">
        <Reveal state={state} className="mb-10">
          <Eyebrow>{content.eyebrow}</Eyebrow>
        </Reveal>

        {state === "visible" && (
          <Reveal state={state} enterAnimated={false} className="max-w-title">
            <SectionTitle
              tag="h2"
              text={content.titleLines.join(" ")}
              className={HERO_TITLE_CLASS}
            />
          </Reveal>
        )}
      </div>

      <div className="flex flex-col items-center">
        <Reveal
          state={state}
          tag="p"
          className="mb-8 max-w-lead text-lead leading-normal text-muted"
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
              href={button.href}
              variant={button.withArrow ? "primary" : "secondary"}
              withArrow={button.withArrow}
            >
              {button.label}
            </GlassButton>
          ))}
        </Reveal>
      </div>
    </section>
  );
};
