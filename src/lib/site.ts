/**
 * Site-wide configuration — the single source of truth for SEO.
 *
 * Consumed by the metadata generator, `robots.ts`, `sitemap.ts`, and the
 * JSON-LD structured-data helper.
 */
import { publicEnv } from "@/env";

export const siteConfig = {
  name: "AG Designs Studio",
  description:
    "AG Designs Studio is a digital marketing agency building brand visibility, content systems, campaigns, websites, SEO, paid media and growth-led digital experiences.",
  /**
   * Public origin, no trailing slash. Drives canonical URLs, OG tags, the
   * sitemap, and JSON-LD. Set `NEXT_PUBLIC_SITE_URL` in production.
   */
  url: publicEnv.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Default Open Graph / Twitter share image (path under `public/`). */
  ogImage: "/open-graph.png",
  twitterHandle: "@agdesignsstudio",
  author: "AG Designs Studio",
  /** Browser theme-color (address bar / PWA). */
  themeColor: "#05070f",
} as const;
