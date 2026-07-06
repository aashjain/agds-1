import { notFound } from "next/navigation";

import { getService, services } from "@/data/mocks/services";
import { generateMetadata as buildMetadata } from "@/utils/seo/generate-page-metadata";
import { PageShell } from "@/views/pages/page-shell";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return buildMetadata();
  return buildMetadata({
    title: `${service.name} — AG Designs Studio`,
    description: service.tagline,
    url: `/services/${slug}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <PageShell
      eyebrow="Service"
      title={service.name}
      description={service.summary}
    />
  );
}
