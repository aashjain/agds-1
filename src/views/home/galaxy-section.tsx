"use client";

import { Eyebrow } from "@/components/ui/eyebrow";
import { GlassButton } from "@/components/ui/glass-button";
import type { ExperienceCopy } from "@/data/mocks/home";

import { useExperiencePhase } from "./experience";
import { HERO_TITLE_CLASS } from "./hero-section";
import { Reveal } from "./reveal";
import { SectionTitle } from "./section-title";

export interface GalaxySectionProps {
  content: ExperienceCopy;
}

export const GalaxySection = ({ content }: GalaxySectionProps) => {
  const state = useExperiencePhase((s) => s.galaxy);

  return (
    <section
      aria-label="AG Designs Studio marketing ecosystem"
      className="pointer-events-none fixed inset-0 z-10 flex flex-col items-center justify-between px-6 py-[13vh] text-center"
    >
      <div className="flex flex-col items-center">
        <Reveal state={state} className="mb-9">
          <Eyebrow>{content.eyebrow}</Eyebrow>
        </Reveal>

        {state === "visible" && (
          <Reveal state={state} enterAnimated={false} className="max-w-title">
            <SectionTitle
              tag="h2"
              text={content.titleLines.join(" ")}
              className={HERO_TITLE_CLASS.replace("justify-start", "justify-center").replace("text-left", "text-center")}
            />
          </Reveal>
        )}
      </div>

      {state === "visible" && (
        <div className="flex max-w-[680px] flex-col items-center rounded-[2rem] border border-white/10 bg-background/35 p-6 backdrop-blur-xl">
          <Reveal
            state={state}
            tag="p"
            className="mb-8 text-lead leading-normal text-muted"
          >
            {content.subtitle}
          </Reveal>

          <Reveal
            state={state}
            className="pointer-events-auto flex gap-4 max-md:w-full max-md:max-w-75 max-md:flex-col"
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
      )}
    </section>
  );
};
