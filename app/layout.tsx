import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
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
        <WishlistProvider>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </WishlistProvider>
        <Toaster 
          position="top-center" 
          expand={true}
          toastOptions={{
            classNames: {
              toast:
                "group flex w-full items-center gap-3 rounded-2xl border p-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] backdrop-blur-2xl transition-all sm:min-w-[380px]",
              title: "font-semibold text-[15px]",
              description: "text-sm font-medium opacity-80",
              actionButton:
                "rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-primary-dark hover:scale-105 active:scale-95",
              cancelButton:
                "rounded-xl bg-black/5 px-4 py-2 text-xs font-semibold transition-all hover:bg-black/10 hover:scale-105 active:scale-95",
              success:
                "border-green-500/20 bg-green-50/85 text-green-900",
              error:
                "border-red-500/20 bg-red-50/85 text-red-900",
              warning:
                "border-amber-500/20 bg-amber-50/85 text-amber-900",
              info:
                "border-blue-500/20 bg-blue-50/85 text-blue-900",
              default:
                "border-white/40 bg-white/85 text-heading",
            },
          }}
        />
      </body>
    </html>
  );
}
