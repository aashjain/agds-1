import type { StatCardContent } from "@/data/mocks/home";

export interface StatCardProps {
  content: StatCardContent;
  compact?: boolean;
}

export const StatCard = ({ content, compact = false }: StatCardProps) => (
  <article
    aria-label={content.title}
    className={[
      "overflow-hidden rounded-[1.55rem] border border-border-glass-strong bg-surface-card shadow-glass-card backdrop-blur-xl",
      compact ? "min-h-[220px] p-6" : "w-[var(--width-card)] p-7 max-sm:p-6",
    ].join(" ")}
  >
    <div className="mb-6 flex items-center justify-between gap-4">
      <p className="font-display text-kicker font-semibold uppercase tracking-[0.28em] text-accent-cool/80">
        {content.title}
      </p>
      <span className="size-2 rounded-full bg-accent-warm shadow-[0_0_22px_rgba(214,170,99,0.8)]" />
    </div>
    <p
      className={[
        "mb-5 inline-block font-display font-semibold leading-none text-gradient-accent",
        compact ? "text-[clamp(34px,3.4vw,54px)]" : "text-stat",
      ].join(" ")}
    >
      {content.stat}
    </p>
    <p className="font-display text-lead font-normal leading-normal text-muted">
      {content.description}
    </p>
  </article>
);
