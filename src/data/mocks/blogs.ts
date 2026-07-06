/**
 * Placeholder blog entries — enough structure for /blogs and /blogs/[slug]
 * to exist ahead of real editorial content in phase two.
 */

export interface BlogEntry {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
}

export const blogs: BlogEntry[] = [
  {
    slug: "brand-gravity",
    title: "Brand gravity: why visibility compounds",
    excerpt:
      "Placeholder post. How consistent brand systems make every later campaign cheaper to run.",
    date: "2026-07-01",
  },
  {
    slug: "seo-that-holds",
    title: "SEO that holds after the audit",
    excerpt:
      "Placeholder post. What separates rankings that survive core updates from ones that don't.",
    date: "2026-06-15",
  },
  {
    slug: "paid-media-signals",
    title: "Reading paid media signals early",
    excerpt:
      "Placeholder post. The first-week metrics that actually predict campaign performance.",
    date: "2026-06-01",
  },
];

export const getBlog = (slug: string) => blogs.find((b) => b.slug === slug);
