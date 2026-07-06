import { generateMetadata as buildMetadata } from "@/utils/seo/generate-page-metadata";
import { PageShell } from "@/views/pages/page-shell";

export const metadata = buildMetadata({
  title: "About Us — AG Designs Studio",
  description:
    "The team and thinking behind AG Designs Studio, a growth-led digital marketing agency.",
  url: "/about-us",
});

export default function AboutUsPage() {
  return (
    <PageShell
      eyebrow="About Us"
      title="A studio built around your growth"
      description="Full about page coming in phase two — team, approach and the standards we hold campaigns to."
    />
  );
}
