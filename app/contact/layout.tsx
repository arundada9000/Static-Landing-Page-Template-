import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Contact Us | ${siteConfig.name}`,
  description: "Get in touch with us for any inquiries, custom orders, or support. We are here to help.",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: `Contact Us | ${siteConfig.name}`,
    description: "Get in touch with us for any inquiries, custom orders, or support. We are here to help.",
    url: `${siteConfig.url}/contact`,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact Us | ${siteConfig.name}`,
    description: "Get in touch with us for any inquiries, custom orders, or support. We are here to help.",
    images: [siteConfig.ogImage],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contactSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${siteConfig.url}/contact/#webpage`,
        url: `${siteConfig.url}/contact`,
        name: `Contact Us | ${siteConfig.name}`,
        description: "Get in touch with us for any inquiries, custom orders, or support.",
        isPartOf: { "@id": `${siteConfig.url}/#website` },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteConfig.url}/#localbusiness`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}${siteConfig.logoSrc}`,
        image: `${siteConfig.url}${siteConfig.ogImage}`,
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.contact.address,
          addressCountry: "NP",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      {children}
    </>
  );
}
