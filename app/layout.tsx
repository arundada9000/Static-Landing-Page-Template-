import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: siteConfig.logoSrc || "/images/circular-logo.png",
    apple: [
      {
        url: siteConfig.logoSrc || "/images/circular-logo.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/manifest", // Next.js auto-resolves this to /app/manifest.ts
};

export const viewport: Viewport = {
  themeColor: "#3932A9",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} scroll-smooth antialiased h-full`}
    >
      <body className="min-h-full flex flex-col font-sans bg-surface-alt text-heading pb-20 md:pb-0">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
