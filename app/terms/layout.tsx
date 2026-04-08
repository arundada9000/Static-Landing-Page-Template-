import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Terms of Service | ${siteConfig.name}`,
  description: `Terms and conditions of use for ${siteConfig.name}`,
  alternates: {
    canonical: `${siteConfig.url}/terms`,
  },
  openGraph: {
    title: `Terms of Service | ${siteConfig.name}`,
    description: `Terms and conditions of use for ${siteConfig.name}`,
    url: `${siteConfig.url}/terms`,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Terms of Service | ${siteConfig.name}`,
    description: `Terms and conditions of use for ${siteConfig.name}`,
    images: [siteConfig.ogImage],
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
