"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "@/data/navigation";

/**
 * Fixed site header — wordmark on the left, primary navigation on the right.
 * Collapses to a full-screen overlay menu below lg. Sits above the
 * pointer-events-none overlay sections, so it stays interactive everywhere.
 */
export const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="pointer-events-auto fixed inset-x-0 top-0 z-30">
      <div className="flex items-center justify-between px-[4vw] py-5 max-lg:px-5">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-display text-button font-semibold tracking-wide text-foreground"
        >
          AG Designs{" "}
          <span className="font-normal text-muted">Studio</span>
        </Link>

        <nav
          aria-label="Primary"
          className="flex items-center gap-1 rounded-full border border-border-glass bg-surface-glass px-2 py-1.5 backdrop-blur-md max-lg:hidden"
        >
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-eyebrow font-medium ${
                  active
                    ? "bg-surface-glass-hover text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="hidden size-11 items-center justify-center rounded-full border border-border-glass bg-surface-glass backdrop-blur-md max-lg:flex"
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 top-0 h-px w-full bg-foreground transition-transform ${
                open ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-full bg-foreground transition-transform ${
                open ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <nav
          aria-label="Primary mobile"
          className="fixed inset-0 -z-10 flex flex-col items-center justify-center gap-2 bg-background/95 backdrop-blur-xl lg:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-6 py-3 font-display text-display-sm font-normal leading-title tracking-title text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};
