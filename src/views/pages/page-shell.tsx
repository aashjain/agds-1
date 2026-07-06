import Link from "next/link";

/**
 * Minimal shell for placeholder pages — keeps every non-home route on-brand
 * (deep navy, display type, glass accents) until phase-two designs land.
 */
export interface PageShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const PageShell = ({
  eyebrow,
  title,
  description,
  children,
}: PageShellProps) => (
  <main className="min-h-screen px-[7vw] pb-24 pt-40 max-lg:px-6 max-lg:pt-32">
    <p className="mb-6 text-eyebrow font-medium uppercase tracking-widest text-gradient-accent">
      {eyebrow}
    </p>
    <h1 className="mb-6 max-w-title font-display text-display-sm font-normal leading-title tracking-title text-foreground">
      {title}
    </h1>
    <p className="mb-12 max-w-lead text-lead leading-normal text-muted">
      {description}
    </p>

    {children}

    <p className="mt-16 text-eyebrow text-muted">
      <Link href="/" className="text-foreground underline underline-offset-4">
        Back to the homepage
      </Link>
    </p>
  </main>
);
