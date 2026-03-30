/**
 * ============================================================
 *  CONTENT CONFIGURATION — Edit this file to update all
 *  page copy, images, features, and section text without
 *  touching any React component files.
 * ============================================================
 */

import {
  Wind,
  Star,
  Shield,
  Sparkles,
  Gauge,
  Leaf,
  FlaskConical,
  Gem,
  Award,
  Globe,
  PackagePlus,
  Cylinder,
  Zap,
  CheckCircle,
  type LucideIcon,
} from "lucide-react";

// ─── Hero Section ────────────────────────────────────────────────────────────

export const heroContent = {
  /** Small badge text at top of hero */
  badge: "Premium Quality · Free Worldwide Shipping",

  /** Headline (3 parts — middle is highlighted with gradient) */
  headlineStart: "The Future of",
  headlineHighlight: "Premium",
  headlineEnd: "Craftsmanship",

  /** Subheadline paragraph */
  subheadline:
    "Engineered for those who refuse to compromise. Discover the perfect blend of innovation, quality, and timeless design.",

  /** CTA buttons */
  primaryCTA: { label: "Shop Now", href: "#products" },
  secondaryCTA: { label: "Discover More", href: "#benefits" },

  /** Hero background image */
  heroImage:
    "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1920&q=80",
  heroImageAlt: "Premium VELA product showcase",
};

// ─── About / Brand Story Section ───────────────────────────────────────────

export const aboutContent = {
  /** Small badge label */
  badge: "Our Story",

  /** Headline */
  headlineStart: "Passion Meets",
  headlineHighlight: "Precision",

  /** Body paragraphs */
  body1:
    "At VELA, we believe every great product starts with an uncompromising vision. Our team of artisans and engineers collaborate to create goods that truly stand apart from the rest.",
  body2:
    "Every piece we craft goes through a meticulous multi-stage process — blending best-in-class materials with decades of expertise to deliver an experience that exceeds every expectation.",

  /** Circular badge */
  badgeValue: "100%",
  badgeLabel: "Quality Assured",

  /** Feature cards (2 shown below body text) */
  feature1Title: "Expert Craftsmanship",
  feature1Desc: "Built by world-class artisans with decades of experience.",
  feature2Title: "Premium Materials",
  feature2Desc: "Sourced from the finest suppliers across the globe.",

  /** CTA link */
  cta: { label: "Learn more about our journey", href: "/about" },

  /** About section image */
  aboutImage:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
  aboutImageAlt: "VELA craftsmanship and production process",
};

// ─── Trust Bar ───────────────────────────────────────────────────────────────

export interface TrustFeature {
  title: string;
  desc: string;
  Icon: LucideIcon;
}

export const trustFeatures: TrustFeature[] = [
  {
    title: "Premium Quality",
    desc: "Best-in-class materials only",
    Icon: Gem,
  },
  {
    title: "Rigorously Tested",
    desc: "Multi-stage quality verification",
    Icon: FlaskConical,
  },
  {
    title: "Award Winning",
    desc: "Recognized for design excellence",
    Icon: Award,
  },
  {
    title: "Sustainable",
    desc: "Responsibly sourced & eco-friendly",
    Icon: Leaf,
  },
  {
    title: "Ships Worldwide",
    desc: "Delivered to 50+ countries",
    Icon: Globe,
  },
];

// ─── Benefits Section ────────────────────────────────────────────────────────

export interface Benefit {
  title: string;
  desc: string;
  Icon: LucideIcon;
}

export const benefitsContent = {
  badge: "Why Choose VELA?",
  headlineStart: "Designed to",
  headlineHighlight: "Elevate",
  headlineEnd: "Your Life",
  subheadline:
    "VELA products are crafted to seamlessly integrate into your world — delivering quality you can see, feel, and trust every single day.",

  /** Side image */
  benefitsImage:
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
  benefitsImageAlt: "Lifestyle benefits of VELA products",

  /** Floating stat card */
  statValue: "50K+",
  statLabel: "Customers worldwide",

  /** Floating badge */
  badgeValue: "4.9★",
  badgeLabel: "Avg. Customer Rating",
};

export const benefits: Benefit[] = [
  {
    title: "Unmatched Durability",
    desc: "Engineered with premium materials that outlast the competition — built to be a lifetime investment.",
    Icon: Shield,
  },
  {
    title: "Effortless Elegance",
    desc: "Minimalist, timeless design that fits every lifestyle, space, and aesthetic seamlessly.",
    Icon: Sparkles,
  },
  {
    title: "Peak Performance",
    desc: "Every detail is optimized for performance — nothing is left to chance or compromise.",
    Icon: Gauge,
  },
  {
    title: "Eco-Conscious",
    desc: "Committed to sustainable production using ethically sourced and responsibly crafted materials.",
    Icon: Wind,
  },
  {
    title: "5-Star Satisfaction",
    desc: "Backed by thousands of verified reviews and our industry-leading satisfaction guarantee.",
    Icon: Star,
  },
];

// ─── Process Section ─────────────────────────────────────────────────────────

export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
  img: string;
  Icon: LucideIcon;
}

export const processContent = {
  badge: "How We Do It",
  headline: "The VELA Process",
  subheadline:
    "A meticulous, end-to-end journey that transforms the finest raw materials into products you will treasure for a lifetime.",
};

export const processSteps: ProcessStep[] = [
  {
    num: "01",
    title: "Design & Concept",
    desc: "Every product starts as a bold concept shaped by our designers and engineers, building from the ground up.",
    img: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80",
    Icon: PackagePlus,
  },
  {
    num: "02",
    title: "Material Sourcing",
    desc: "We meticulously source the highest-grade materials from trusted global partners, ensuring quality at the source.",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
    Icon: Cylinder,
  },
  {
    num: "03",
    title: "Expert Crafting",
    desc: "Skilled artisans bring each design to life with precision — every component assembled with care and expertise.",
    img: "https://images.unsplash.com/photo-1624615903992-a2a1e61b3f98?w=800&q=80",
    Icon: Zap,
  },
  {
    num: "04",
    title: "Quality Assurance",
    desc: "Before shipping, every item passes our rigorous 47-point quality check to guarantee it exceeds expectations.",
    img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80",
    Icon: CheckCircle,
  },
];

// ─── CTA Section ─────────────────────────────────────────────────────────────

export const ctaContent = {
  badge: "Ready to Experience VELA?",
  headlineStart: "Elevate Your",
  headlineHighlight: "Everyday",
  subheadline:
    "Join thousands of satisfied customers. Order today with free worldwide shipping and our 30-day money-back guarantee.",
  whatsappBtnLabel: "Order via WhatsApp",
  storeBtnLabel: "Visit Our Store",
  storeBtnHref: "/shop",
  callBtnLabel: "Call Now",
};

// ─── Footer ──────────────────────────────────────────────────────────────────

export const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/#products" },
  { label: "Key Benefits", href: "/#benefits" },
  { label: "Our Process", href: "/#process" },
  { label: "Shop", href: "/shop" },
];

export const footerTagline =
  "Bringing premium craftsmanship into the hands of everyone who deserves the best. Quality you can trust, delivered to your door.";
