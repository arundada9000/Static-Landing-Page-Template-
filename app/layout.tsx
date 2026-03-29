import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Premium Bamboo Salt from Nepal | Nepal Bamboo Salt",
  description: "Ancient roasting process. Modern health benefits. Detoxify and improve health with 100% natural Nepal Bamboo Salt.",
  keywords: ["Bamboo Salt", "Nepal Bamboo Salt", "Natural Health", "Detoxify", "Roasted Salt", "Himalayan Salt Alternative", "Alkaline Salt"],
  authors: [{ name: "Nepal Bamboo Salt Pvt. Ltd." }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Premium Bamboo Salt from Nepal | Nepal Bamboo Salt",
    description: "Ancient roasting process. Modern health benefits. Detoxify and improve health with 100% natural Nepal Bamboo Salt.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "Nepal Bamboo Salt",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nepal Bamboo Salt - Premium Quality",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Bamboo Salt from Nepal | Nepal Bamboo Salt",
    description: "Ancient roasting process. Modern health benefits. Detoxify and improve health with 100% natural Nepal Bamboo Salt.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth antialiased h-full`}>
      <body className="min-h-full flex flex-col font-sans bg-stone-50 text-stone-900">
        {children}
      </body>
    </html>
  );
}
