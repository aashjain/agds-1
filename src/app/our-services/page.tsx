import Link from "next/link";

import { services } from "@/data/mocks/services";
import { generateMetadata as buildMetadata } from "@/utils/seo/generate-page-metadata";
import { PageShell } from "@/views/pages/page-shell";

export const metadata = buildMetadata({
  title: "Our Services — AG Designs Studio",
  description:
    "Strategy, branding, social media, SEO, paid media, website design, content and performance marketing.",
  url: "/our-services",
});

export default function OurServicesPage() {
  return (
    <PageShell
      eyebrow="Our Services"
      title="Eight disciplines, one system"
      description="Every service below is run against the same plan and reported in the same place. Full service pages land in phase two."
    >
      <ul className="grid max-w-4xl grid-cols-2 gap-3 max-md:grid-cols-1">
        {services.map((service) => (
          <li key={service.slug}>
            <Link
              href={`/services/${service.slug}`}
              className="block h-full rounded-2xl border border-border-glass bg-surface-card p-6 backdrop-blur-lg"
            >
              <p className="font-display text-button font-medium text-foreground">
                {service.name}
              </p>
              <p className="mt-2 text-eyebrow leading-normal text-muted">
                {service.tagline}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
