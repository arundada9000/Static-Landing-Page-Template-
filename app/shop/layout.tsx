import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Shop | ${siteConfig.name}`,
  description: `Browse our full collection of premium products at ${siteConfig.name}.`,
  alternates: {
    canonical: `${siteConfig.url}/shop`,
  },
  openGraph: {
    title: `Shop | ${siteConfig.name}`,
    description: `Browse our full collection of premium products at ${siteConfig.name}.`,
    url: `${siteConfig.url}/shop`,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Shop | ${siteConfig.name}`,
    description: `Browse our full collection of premium products at ${siteConfig.name}.`,
    images: [siteConfig.ogImage],
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}/shop/#webpage`,
    url: `${siteConfig.url}/shop`,
    name: `Shop | ${siteConfig.name}`,
    description: `Browse our full collection of premium products at ${siteConfig.name}.`,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      {children}
    </>
  );
}
