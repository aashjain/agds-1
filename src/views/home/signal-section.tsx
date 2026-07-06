"use client";

import { Eyebrow } from "@/components/ui/eyebrow";
import { GlassButton } from "@/components/ui/glass-button";
import type { HomeContent } from "@/data/mocks/home";

import { useExperiencePhase } from "./experience";
import { Reveal } from "./reveal";
import { SectionTitle } from "./section-title";

const SIGNAL_TITLE_CLASS =
  "flex flex-wrap justify-start font-display text-display-sm font-normal leading-title tracking-title text-left text-foreground text-fade-trailing";

/**
 * Campaign signal moment — overlays the flowing signal-lane particle field.
 * Title on the left; on the right, the three-step working rhythm and a CTA.
 */
export interface SignalSectionProps {
  content: HomeContent["signal"];
}

export const SignalSection = ({ content }: SignalSectionProps) => {
  const state = useExperiencePhase((s) => s.signal);

  return (
    <section
      aria-label="How we work"
      className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center gap-15 px-[10vw] text-left max-lg:flex-col max-lg:items-start max-lg:justify-center max-lg:gap-8 max-lg:px-6"
    >
      <div className="flex max-w-title-sm flex-1 flex-col items-start max-lg:max-w-full">
        <Reveal state={state} className="mb-6">
          <Eyebrow>{content.eyebrow}</Eyebrow>
        </Reveal>

        {state !== "before" && (
          <Reveal state={state} enterAnimated={false}>
            <SectionTitle
              tag="h2"
              text={content.titleLines.join(" ")}
              className={SIGNAL_TITLE_CLASS}
            />
          </Reveal>
        )}
      </div>

      <div className="flex max-w-lead-sm flex-1 flex-col items-start max-lg:max-w-full">
        <Reveal
          state={state}
          tag="p"
          className="mb-8 text-left text-lead leading-normal text-muted"
        >
          {content.subtitle}
        </Reveal>

        <div className="mb-10 flex w-full flex-col gap-3">
          {content.steps.map((step, i) => (
            <Reveal key={step.label} state={state} delay={i * 90}>
              <div className="flex items-baseline gap-4 border-b border-border-glass pb-3">
                <span className="min-w-16 font-display text-button font-semibold text-gradient-accent">
                  {step.label}
                </span>
                <span className="text-eyebrow leading-normal text-muted">
                  {step.description}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

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
