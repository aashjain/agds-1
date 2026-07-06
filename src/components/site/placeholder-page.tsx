import Link from "next/link";

interface PlaceholderPageProps {
  eyebrow: string;
  title: string;
}

const links = [
  ["Home", "/"],
  ["About", "/about-us"],
  ["Services", "/our-services"],
  ["Blogs", "/blogs"],
  ["Contact", "/contact-us"],
] as const;

export const PlaceholderPage = ({ eyebrow, title }: PlaceholderPageProps) => (
  <main className="min-h-screen bg-background px-6 py-8 text-foreground md:px-10">
    <header className="mb-24 flex items-center justify-between text-[12px] uppercase tracking-[0.28em] text-foreground/70">
      <Link href="/" className="flex items-center gap-3">
        <span className="grid size-8 place-items-center rounded-full border border-accent-warm/40 bg-surface-glass text-[11px] font-semibold text-accent-warm backdrop-blur-md">
          AG
        </span>
        <span className="hidden sm:block">Designs Studio</span>
      </Link>
      <nav className="hidden items-center gap-7 md:flex">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="transition hover:text-accent-cool">
            {label}
          </Link>
        ))}
      </nav>
    </header>

    <section className="mx-auto flex min-h-[58vh] max-w-5xl flex-col justify-center border-y border-white/10 py-16">
      <p className="mb-8 text-[12px] uppercase tracking-[0.34em] text-accent-cool/80">
        {eyebrow}
      </p>
      <h1 className="max-w-3xl font-display text-display-sm font-normal leading-title tracking-title">
        {title}
      </h1>
      <p className="mt-8 max-w-xl text-lead leading-normal text-muted">
        This page has been intentionally reserved for the next content and design phase after the homepage direction is approved.
      </p>
    </section>
  </main>
);
