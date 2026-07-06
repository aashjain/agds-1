"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  ["About", "/about-us"],
  ["Services", "/our-services"],
  ["Blogs", "/blogs"],
  ["Contact", "/contact-us"],
] as const;

export const SiteChrome = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="pointer-events-auto fixed left-0 right-0 top-0 z-30 flex items-center justify-between px-6 py-5 text-[12px] uppercase tracking-[0.28em] text-foreground/80 md:px-10">
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-full border border-accent-warm/40 bg-surface-glass text-[11px] font-semibold text-accent-warm backdrop-blur-md">
            AG
          </span>
          <span className="hidden text-foreground/85 sm:block">Designs Studio</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-accent-cool">
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="pointer-events-none fixed bottom-7 left-6 right-6 z-30 hidden items-center gap-4 text-[11px] uppercase tracking-[0.24em] text-foreground/45 md:flex">
        <span>Orbit</span>
        <div className="h-px flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-accent-cool via-[#b79cff] to-accent-warm"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
        <span>{String(Math.round(progress * 100)).padStart(2, "0")}%</span>
      </div>
    </>
  );
};
