import type { Metadata, Viewport } from "next";
import { Assistant, Inter, Onest } from "next/font/google";

import {
  generateMetadata,
  generateViewport,
} from "@/utils/seo/generate-page-metadata";
import { getSiteStructuredData } from "@/utils/seo/structured-data";

import { LazyCookie } from "@/components/common/Cookie";
import { AdaptiveGrid } from "@/components/common/grid";
import { ReducedMotion } from "@/components/common/reduced-motion";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollLayout } from "@/layouts/scroll-layout";

import "@/app/globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  display: "swap",
});

// Inter (body) + Assistant (display) — bound to --font-inter /
// --font-assistant in globals.css.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = generateMetadata();
export const viewport: Viewport = generateViewport();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${onest.variable} ${inter.variable} ${assistant.variable}`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSiteStructuredData()),
          }}
        />
        <ScrollLayout>
          <AdaptiveGrid />
          <ReducedMotion />
          <LazyCookie />
          <SiteHeader />
          {children}
        </ScrollLayout>
      </body>
    </html>
  );
}
