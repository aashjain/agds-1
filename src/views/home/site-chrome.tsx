"use client";

import { useEffect, useState } from "react";

import { experienceProgress } from "./experience";

const CHAPTERS = ["Origin", "Orbit", "Wave", "Singularity"];

export const SiteChrome = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const tick = () => {
      setProgress(experienceProgress.current);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const activeIndex = Math.min(
    CHAPTERS.length - 1,
    Math.floor(progress * CHAPTERS.length),
  );

  return (
    <>
      <header className="pointer-events-none fixed left-0 right-0 top-0 z-30 flex items-center justify-between px-8 py-7 max-md:px-5">
        <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-border-glass bg-surface-glass px-4 py-2 backdrop-blur-xl">
          <span className="size-2 rounded-full bg-accent-cool shadow-[0_0_18px_var(--accent-cool)]" />
          <span className="text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-foreground/90">
            New Era
          </span>
        </div>

        <nav className="pointer-events-auto hidden items-center gap-2 rounded-full border border-border-glass bg-surface-glass px-2 py-2 backdrop-blur-xl md:flex">
          {CHAPTERS.map((chapter, index) => (
            <span
              key={chapter}
              className={`rounded-full px-4 py-2 text-[0.72rem] uppercase tracking-[0.18em] transition-colors ${
                index === activeIndex
                  ? "bg-foreground text-background"
                  : "text-foreground/55"
              }`}
            >
              {chapter}
            </span>
          ))}
        </nav>
      </header>

      <aside className="pointer-events-none fixed bottom-8 left-8 z-30 hidden w-52 md:block">
        <div className="mb-3 flex items-center justify-between text-[0.68rem] uppercase tracking-[0.22em] text-foreground/45">
          <span>Scroll depth</span>
          <span>{Math.round(progress * 100)}%</span>
        </div>
        <div className="h-px w-full overflow-hidden bg-foreground/15">
          <div
            className="h-full bg-gradient-to-r from-accent-cool via-accent-violet to-accent-warm"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </aside>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-t from-background via-background/55 to-transparent" />
      <div className="pointer-events-none fixed inset-0 z-20 border border-white/[0.03]" />
    </>
  );
};
