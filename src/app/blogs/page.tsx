import Link from "next/link";

import { blogs } from "@/data/mocks/blogs";
import { generateMetadata as buildMetadata } from "@/utils/seo/generate-page-metadata";
import { PageShell } from "@/views/pages/page-shell";

export const metadata = buildMetadata({
  title: "Blogs — AG Designs Studio",
  description:
    "Notes on brand, search, paid media and growth from the AG Designs Studio team.",
  url: "/blogs",
});

export default function BlogsPage() {
  return (
    <PageShell
      eyebrow="Blogs"
      title="Notes from the studio"
      description="Editorial content ships in phase two — the entries below hold the route structure."
    >
      <ul className="flex max-w-2xl flex-col gap-3">
        {blogs.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blogs/${post.slug}`}
              className="block rounded-2xl border border-border-glass bg-surface-card p-6 backdrop-blur-lg"
            >
              <p className="font-display text-button font-medium text-foreground">
                {post.title}
              </p>
              <p className="mt-2 text-eyebrow leading-normal text-muted">
                {post.excerpt}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
