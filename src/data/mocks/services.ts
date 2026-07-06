/**
 * AG Designs Studio service catalogue — the single source for the homepage
 * capability grid, the /our-services index, and /services/[slug] pages.
 */

export interface ServiceEntry {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
}

export const services: ServiceEntry[] = [
  {
    slug: "strategy",
    name: "Strategy",
    tagline: "Decide where every hour and rupee of marketing goes.",
    summary:
      "Positioning, audience research and channel planning that give every campaign a reason to exist before a single asset is made.",
  },
  {
    slug: "branding",
    name: "Branding",
    tagline: "An identity system every touchpoint can carry.",
    summary:
      "Naming, visual identity, voice and guidelines built so your brand stays recognisable across ads, content, web and social.",
  },
  {
    slug: "social-media",
    name: "Social Media",
    tagline: "Turn followers into a repeatable audience.",
    summary:
      "Channel programming, creative production and community management with a publishing rhythm your audience can rely on.",
  },
  {
    slug: "seo",
    name: "SEO",
    tagline: "Search visibility that compounds month over month.",
    summary:
      "Technical audits, content architecture and authority building that move rankings — and keep them moving after launch.",
  },
  {
    slug: "paid-media",
    name: "Paid Media",
    tagline: "Full-funnel campaigns held to revenue targets.",
    summary:
      "Search, social and display campaigns planned, launched and optimised against cost per acquisition — not vanity reach.",
  },
  {
    slug: "website-design",
    name: "Website Design",
    tagline: "Fast, conversion-focused sites that close the journey.",
    summary:
      "Design and development built around your brand and your funnel, measured on speed, clarity and completed enquiries.",
  },
  {
    slug: "content",
    name: "Content",
    tagline: "Something worth publishing, on every channel.",
    summary:
      "Editorial calendars, copywriting and production that feed SEO, social and campaigns from one coordinated content system.",
  },
  {
    slug: "performance-marketing",
    name: "Performance Marketing",
    tagline: "Know exactly what works — and what to stop.",
    summary:
      "Testing frameworks, attribution and reporting that tie creative decisions to pipeline, so budgets follow evidence.",
  },
];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);
