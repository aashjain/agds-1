import { notFound } from "next/navigation";

import { blogs, getBlog } from "@/data/mocks/blogs";
import { generateMetadata as buildMetadata } from "@/utils/seo/generate-page-metadata";
import { PageShell } from "@/views/pages/page-shell";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlog(slug);
  if (!post) return buildMetadata();
  return buildMetadata({
    title: `${post.title} — AG Designs Studio`,
    description: post.excerpt,
    url: `/blogs/${slug}`,
  });
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlog(slug);
  if (!post) notFound();

  return (
    <PageShell eyebrow="Blog" title={post.title} description={post.excerpt} />
  );
}
