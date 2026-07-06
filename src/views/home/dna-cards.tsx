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

const columnGroups = [[0, 3], [1, 4], [2, 5]];
const columnOffsets = [0, 34, 16];

export const DnaCards = ({ cards }: DnaCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLoop(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const cs = experienceProgress.current;
      let opacity = 0;

      // Let the service planet form first. The cards begin only after the
      // planet has visibly settled into place, then complete their reveal
      // through the service section.
      if (cs > 0.29 && cs < 0.52) {
        opacity = Math.min((cs - 0.29) / 0.025, 1);
        if (cs > 0.47) opacity = Math.max(1 - (cs - 0.47) / 0.05, 0);
      }

      container.style.opacity = `${opacity}`;
      container.style.visibility = opacity > 0.01 ? "visible" : "hidden";
      if (opacity <= 0.01) return;

      const sceneProgress = clamp((cs - 0.305) / 0.165, 0, 1);

      cardRefs.current.forEach((el, i) => {
        if (!el) return;

        const stepStart = i * 0.055;
        const local = clamp((sceneProgress - stepStart) / 0.13, 0, 1);
        const eased = 1 - Math.pow(1 - local, 3);
        const revealOffset = (1 - eased) * 18;

        el.style.opacity = `${eased}`;
        el.style.transform = `translate3d(0, ${revealOffset}px, 0) scale(${0.985 + eased * 0.015})`;
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
      <div className="absolute left-[36vw] right-[3.5vw] top-1/2 flex -translate-y-1/2 items-start gap-5 max-xl:left-[34vw] max-xl:right-5 max-lg:left-[24vw] max-sm:left-5 max-sm:right-5 max-sm:flex-col">
        {columnGroups.map((group, columnIndex) => (
          <div
            key={columnIndex}
            className="flex min-w-0 flex-1 flex-col gap-5 overflow-visible max-sm:w-full"
            style={{ transform: `translate3d(0, ${columnOffsets[columnIndex] ?? 0}px, 0)` }}
          >
            {group.map((cardIndex) => {
              const card = cards[cardIndex];
              if (!card) return null;

              return (
                <div key={card.id} className="min-w-0 overflow-visible">
                  <div
                    ref={(node) => {
                      cardRefs.current[cardIndex] = node;
                    }}
                    className="opacity-0 will-change-transform"
                  >
                    <StatCard content={card} compact />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
