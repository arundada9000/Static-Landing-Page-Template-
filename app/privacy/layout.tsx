import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Privacy Policy and data handling practices for ${siteConfig.name}`,
  alternates: {
    canonical: `${siteConfig.url}/privacy`,
  },
  openGraph: {
    title: `Privacy Policy | ${siteConfig.name}`,
    description: `Privacy Policy and data handling practices for ${siteConfig.name}`,
    url: `${siteConfig.url}/privacy`,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Privacy Policy | ${siteConfig.name}`,
    description: `Privacy Policy and data handling practices for ${siteConfig.name}`,
    images: [siteConfig.ogImage],
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
