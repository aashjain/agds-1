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

const masonryOffsets = [0, 34, 10, 28, -8, 42];

export const DnaCards = ({ cards }: DnaCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLoop(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const cs = experienceProgress.current;
      let opacity = 0;

      if (cs > 0.19 && cs < 0.52) {
        opacity = Math.min((cs - 0.19) / 0.035, 1);
        if (cs > 0.47) opacity = Math.max(1 - (cs - 0.47) / 0.05, 0);
      }

      container.style.opacity = `${opacity}`;
      container.style.visibility = opacity > 0.01 ? "visible" : "hidden";
      if (opacity <= 0.01) return;

      const sceneProgress = clamp((cs - 0.2) / 0.22, 0, 1);

      cardRefs.current.forEach((el, i) => {
        if (!el) return;

        const stepStart = i * 0.075;
        const local = clamp((sceneProgress - stepStart) / 0.13, 0, 1);
        const eased = 1 - Math.pow(1 - local, 3);

        const masonryOffset = masonryOffsets[i] ?? 0;
        const revealOffset = (1 - eased) * 18;
        el.style.opacity = `${eased}`;
        el.style.transform = `translate3d(0, ${masonryOffset + revealOffset}px, 0) scale(${0.985 + eased * 0.015})`;
        el.style.filter = `blur(${(1 - eased) * 6}px)`;
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
      <div className="absolute left-[38vw] right-[3.5vw] top-1/2 grid -translate-y-1/2 grid-cols-3 items-start gap-x-5 gap-y-4 max-xl:left-[36vw] max-xl:right-5 max-lg:left-[28vw] max-lg:grid-cols-2 max-sm:left-5 max-sm:right-5 max-sm:grid-cols-1">
        {cards.map((card, i) => (
          <div key={card.id} className="min-w-0 overflow-visible">
            <div
              ref={(node) => {
                cardRefs.current[i] = node;
              }}
              className="h-full opacity-0 will-change-transform"
            >
              <StatCard content={card} compact />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
