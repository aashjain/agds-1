import { generateMetadata as buildMetadata } from "@/utils/seo/generate-page-metadata";
import { PageShell } from "@/views/pages/page-shell";

export const metadata = buildMetadata({
  title: "Contact Us — AG Designs Studio",
  description:
    "Start a project with AG Designs Studio — strategy, branding, SEO, paid media and web.",
  url: "/contact-us",
});

export default function ContactUsPage() {
  return (
    <PageShell
      eyebrow="Contact Us"
      title="Tell us where you want to grow"
      description="A proper enquiry form and studio contact details arrive in phase two. For now, this route holds the structure."
    />
  );
}
