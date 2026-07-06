"use client";

import { useRef } from "react";

import { StatCard } from "@/components/ui/stat-card";
import type { StatCardContent } from "@/data/mocks/home";
import { useLoop } from "@/hooks/animation/use-render-loop";

import { experienceProgress } from "./experience";

export interface DnaCardsProps {
  cards: StatCardContent[];
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const DnaCards = ({ cards }: DnaCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLoop(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const cs = experienceProgress.current;
      let opacity = 0;

      if (cs > 0.18 && cs < 0.52) {
        opacity = Math.min((cs - 0.18) / 0.045, 1);
        if (cs > 0.47) opacity = Math.max(1 - (cs - 0.47) / 0.05, 0);
      }

      container.style.opacity = `${opacity}`;
      container.style.visibility = opacity > 0.01 ? "visible" : "hidden";
      if (opacity <= 0.01) return;

      const sceneProgress = clamp((cs - 0.19) / 0.2, 0, 1);

      cardRefs.current.forEach((el, i) => {
        if (!el) return;

        const stepStart = i * 0.085;
        const local = clamp((sceneProgress - stepStart) / 0.14, 0, 1);
        const eased = 1 - Math.pow(1 - local, 3);

        el.style.opacity = `${eased}`;
        el.style.transform = `translate3d(0, ${(1 - eased) * 18}px, 0) scale(${0.97 + eased * 0.03})`;
        el.style.filter = `blur(${(1 - eased) * 8}px)`;
      });
    },
    { framerate: 0 },
  );

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[12] opacity-0"
      style={{ visibility: "hidden" }}
    >
      <div className="absolute left-[34vw] right-[4vw] top-1/2 grid -translate-y-1/2 grid-cols-3 gap-5 max-xl:left-[36vw] max-lg:left-[30vw] max-lg:right-6 max-lg:grid-cols-2 max-sm:left-6 max-sm:right-6 max-sm:grid-cols-1">
        {cards.map((card, i) => (
          <div
            key={card.id}
            ref={(node) => {
              cardRefs.current[i] = node;
            }}
            className="opacity-0 will-change-transform"
          >
            <StatCard content={card} compact />
          </div>
        ))}
      </div>
    </div>
  );
};
