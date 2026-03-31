/**
 * ============================================================
 *  SITE CONFIGURATION — Edit this file to rebrand the site
 *  for a new client. No other files need to be touched for
 *  basic branding changes.
 * ============================================================
 */

export const siteConfig = {
  /** The brand / company name shown in the header & footer */
  name: "THE SHOP",

  /** One-line brand tagline shown in footer */
  tagline: "Crafted for the Exceptional",

  /** Meta description for SEO */
  description:
    "Discover premium-quality products engineered for those who demand the best. THE SHOP combines breakthrough innovation with timeless craftsmanship.",

  /** Canonical URL of the deployed site */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://statictemplate.sajilodigital.com.np",

  /** Open Graph / Twitter card image (place in /public/images/) */
  ogImage: "/images/og-image.png",

  /** Logo — use a circular image at /public/images/circular-logo.png
   *  OR set to null to render the text monogram logo instead */
  logoSrc: null as string | null,

  /** SEO keywords */
  keywords: [
    "THE SHOP",
    "premium products",
    "luxury goods",
    "high quality craftsmanship",
    "innovative design",
    "premium lifestyle",
  ],

  /** Contact information */
  contact: {
    phone: "+977-9811420975",
    email: "arunneupane0000@gmail.com",
    address: "Butwal-11, Devinagar , Nepal",
    /** WhatsApp number in full international format without + or spaces */
    whatsapp: "+977-9811420975",
  },

  /** Social media links */
  social: {
    facebook: "https://facebook.com/arundada9000",
    instagram: "https://instagram.com/arundada9000",
    twitter: "https://youtube.com/@arundada9000",
  },

  /** Agency credit (SajiloDigital) */
  agency: {
    name: "SajiloDigital",
    url: "https://sajilodigital.com.np",
  },
};

// ─── Navigation Links ────────────────────────────────────────────────────────

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/#products" },
  { label: "Benefits", href: "/#benefits" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
];

export const mobileNavLinks = [
  { label: "Home", href: "/", icon: "Home" as const },
  { label: "Products", href: "/#products", icon: "Package" as const },
  { label: "Shop", href: "/shop", icon: "ShoppingBag" as const },
  { label: "About", href: "/about", icon: "Info" as const },
  { label: "Contact", href: "/#contact", icon: "Phone" as const },
];
