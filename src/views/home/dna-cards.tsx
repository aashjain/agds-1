"use client";

import { useRef } from "react";

import { StatCard } from "@/components/ui/stat-card";
import type { StatCardContent } from "@/data/mocks/home";
import { useLoop } from "@/hooks/animation/use-render-loop";

import { experienceProgress } from "./experience";

const START_POSITIONS = [
  { x: 0.18, y: 0.28 },
  { x: 0.74, y: 0.36 },
  { x: 0.36, y: 0.74 },
];

export interface DnaCardsProps {
  cards: StatCardContent[];
}

export const DnaCards = ({ cards }: DnaCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const card0 = useRef<HTMLDivElement>(null);
  const card1 = useRef<HTMLDivElement>(null);
  const card2 = useRef<HTMLDivElement>(null);
  const cardRefs = [card0, card1, card2];

  useLoop(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const cs = experienceProgress.current;
      let opacity = 0;
      if (cs > 0.18 && cs < 0.5) {
        opacity = Math.min((cs - 0.18) / 0.05, 1);
        if (cs > 0.43) opacity = Math.max(1 - (cs - 0.43) / 0.07, 0);
      }
      container.style.opacity = `${opacity}`;
      if (opacity <= 0) return;

      const sceneProgress = Math.min(Math.max((cs - 0.18) / 0.32, 0), 1);
      const orbit = sceneProgress * Math.PI * 2;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;

      cardRefs.forEach((ref, i) => {
        const el = ref.current;
        if (!el) return;
        const base = START_POSITIONS[i];
        const driftX = Math.cos(orbit + i * 2.1) * 46;
        const driftY = Math.sin(orbit * 0.8 + i * 1.7) * 34;
        const x = base.x * window.innerWidth + driftX;
        const y = base.y * window.innerHeight + driftY;
        const distance = Math.hypot(x - cx, y - cy) / Math.max(cx, cy);
        const scale = 0.82 + (1 - distance) * 0.18;
        el.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        el.style.opacity = `${0.55 + (1 - distance) * 0.45}`;
        el.style.zIndex = `${Math.round((1 - distance) * 100)}`;
      });
    },
    { framerate: 0 },
  );

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[12] opacity-0"
      style={{ perspective: "1200px" }}
    >
      {cards.map((card, i) => (
        <div
          key={card.id}
          ref={cardRefs[i]}
          className="absolute left-0 top-0 opacity-0 will-change-transform"
        >
          <StatCard content={card} />
        </div>
      ))}
    </div>
  );
};
