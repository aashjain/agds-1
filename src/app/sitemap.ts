import type { MetadataRoute } from "next";

import { blogs } from "@/data/mocks/blogs";
import { services } from "@/data/mocks/services";
import { siteConfig } from "@/lib/site";

/** Generates `/sitemap.xml` from the static routes plus data-driven slugs. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/about-us`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/our-services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/blogs`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/contact-us`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map(({ slug }) => ({
    url: `${siteConfig.url}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogs.map(({ slug }) => ({
    url: `${siteConfig.url}/blogs/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
