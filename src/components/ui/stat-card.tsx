import type { StatCardContent } from "@/data/mocks/home";

export interface StatCardProps {
  content: StatCardContent;
  compact?: boolean;
}

export const StatCard = ({ content, compact = false }: StatCardProps) => (
  <article
    aria-label={content.title}
    className={[
      "rounded-[1.55rem] border border-border-glass-strong bg-surface-card shadow-glass-card backdrop-blur-xl",
      compact
        ? "min-h-fit overflow-visible p-5"
        : "h-full overflow-hidden w-[var(--width-card)] p-7 max-sm:p-6",
    ].join(" ")}
  >
    <div className="mb-4 flex items-center justify-between gap-4">
      <p className="font-display text-kicker font-semibold uppercase tracking-[0.28em] text-accent-cool/80">
        {content.title}
      </p>
      <span className="size-2 rounded-full bg-accent-warm shadow-[0_0_22px_rgba(214,170,99,0.8)]" />
    </div>
    <p
      className={[
        "mb-4 block max-w-full whitespace-normal break-words font-display font-semibold leading-[1.04] text-gradient-accent",
        compact ? "text-[clamp(24px,2.05vw,36px)]" : "text-stat",
      ].join(" ")}
    >
      {content.stat}
    </p>
    <p className="font-display text-[clamp(13px,0.88vw,15px)] font-normal leading-[1.55] text-muted">
      {content.description}
    </p>
  </article>
);
