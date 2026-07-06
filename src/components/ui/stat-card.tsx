import type { StatCardContent } from "@/data/mocks/home";

export interface StatCardProps {
  content: StatCardContent;
}

export const StatCard = ({ content }: StatCardProps) => (
  <article
    aria-label={content.title}
    className="w-[var(--width-card)] overflow-hidden rounded-[1.75rem] border border-border-glass-strong bg-surface-card p-7 shadow-glass-card backdrop-blur-xl max-sm:p-6"
  >
    <div className="mb-7 flex items-center justify-between gap-4">
      <p className="font-display text-kicker font-semibold uppercase tracking-[0.28em] text-accent-cool/80">
        {content.title}
      </p>
      <span className="size-2 rounded-full bg-accent-warm shadow-[0_0_22px_rgba(214,170,99,0.8)]" />
    </div>
    <p className="mb-5 inline-block font-display text-stat font-semibold leading-none text-gradient-accent">
      {content.stat}
    </p>
    <p className="font-display text-lead font-normal leading-normal text-muted">
      {content.description}
    </p>
  </article>
);
