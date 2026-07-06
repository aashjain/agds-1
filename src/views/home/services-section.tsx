"use client";

import { Eyebrow } from "@/components/ui/eyebrow";
import type { HomeContent } from "@/data/mocks/home";

import { useExperiencePhase } from "./experience";
import { Reveal } from "./reveal";
import { SectionTitle } from "./section-title";

const SERVICES_TITLE_CLASS =
  "flex flex-wrap justify-start font-display text-display-sm font-normal leading-title tracking-title text-left text-foreground text-fade-trailing";

/**
 * Capability moment — appears while the camera dives toward the focused
 * brand planet. A title column on the left, eight compact service cards on
 * the right, each staggered in through the shared Reveal spring.
 */
export interface ServicesSectionProps {
  content: HomeContent["services"];
}

export const ServicesSection = ({ content }: ServicesSectionProps) => {
  const state = useExperiencePhase((s) => s.services);

  return (
    <section
      aria-label="Our capabilities"
      className="pointer-events-none fixed inset-0 z-10 flex items-center gap-14 px-[7vw] max-lg:flex-col max-lg:justify-center max-lg:gap-7 max-lg:px-6"
    >
      <div className="flex max-w-title-sm flex-1 flex-col items-start max-lg:max-w-full max-lg:flex-none">
        <Reveal state={state} className="mb-6 max-lg:mb-4">
          <Eyebrow>{content.eyebrow}</Eyebrow>
        </Reveal>

        {state !== "before" && (
          <Reveal state={state} enterAnimated={false}>
            <SectionTitle
              tag="h2"
              text={content.titleLines.join(" ")}
              className={SERVICES_TITLE_CLASS}
            />
          </Reveal>
        )}

        <Reveal
          state={state}
          tag="p"
          className="mt-6 max-w-lead-sm text-lead leading-normal text-muted max-lg:mt-3"
        >
          {content.subtitle}
        </Reveal>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-3 max-lg:w-full max-lg:flex-none max-sm:gap-2">
        {content.items.map((service, i) => (
          <Reveal key={service.slug} state={state} delay={i * 60}>
            <a
              href={`/services/${service.slug}`}
              className="pointer-events-auto block h-full rounded-2xl border border-border-glass bg-surface-card p-5 backdrop-blur-lg max-sm:p-3.5"
            >
              <p className="font-display text-button font-medium text-foreground">
                {service.name}
              </p>
              <p className="mt-1.5 text-eyebrow leading-normal text-muted max-sm:hidden">
                {service.tagline}
              </p>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
