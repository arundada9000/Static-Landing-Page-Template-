<p align="center">
  <img src="https://img.shields.io/badge/Built%20by-SajiloDigital-4F46E5?style=for-the-badge&logo=vercel&logoColor=white" alt="Built by SajiloDigital" />
  <img src="https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=nextdotjs" alt="Next.js" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</p>

<h1 align="center"> Premium Product Landing Page Template</h1>
<p align="center">
  A production-ready, fully customizable Next.js landing page for any product.<br/>
  Built and maintained by <strong><a href="https://sajilodigital.com.np">SajiloDigital</a></strong> — Nepal's premium web agency.
</p>

---

## What Is This?

This is SajiloDigital's **flagship product landing page template**  designed to showcase and sell any physical or digital product beautifully. Clothing, electronics, health goods, SaaS tools, food products — you name it. Built to impress at first glance and convert visitors into buyers.

### Pages Included
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Full marketing landing page |
| About | `/about` | Brand story, vision & mission |
| Shop | `/shop` | Product listing + WhatsApp ordering |

### Sections on Landing Page
- **Hero** — Full-screen dramatic opener with CTA buttons
- **Trust Bar** — 5 trust-building feature badges
- **About (Short)** — Brand story snippet with image
- **Products** — 3-tier product cards with WhatsApp Order + View buttons
- **Benefits** — 5 key product benefits with floating stat cards
- **Process** — 4-step how-it's-made visual cards
- **CTA** — Final conversion section (WhatsApp / Shop / Call)
- **Footer** — Contact, quick links, social media

---

## Quick Start

```bash
# 1. Clone this repo
git clone https://github.com/sajilodigital/product-landing-template.git
cd product-landing-template

# 2. Install dependencies
npm install

# 3. Copy environment file
cp .env.example .env
# Edit .env and set NEXT_PUBLIC_SITE_URL=https://yourclientdomain.com

# 4. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the template is live!

---

## How to Rebrand for a New Client (3 Steps)

Almost everything lives in **2 config files**. You rarely need to touch React components.

### Step 1 — `config/site.ts` · Identity & Contact

```typescript
export const siteConfig = {
  name: "ClientBrand",               // ← Displayed in navbar, footer, SEO
  tagline: "Your One-Line Tagline",
  description: "SEO meta description...",
  url: "https://clientdomain.com",

  contact: {
    phone: "+1 (800) 000-0000",
    email: "hello@client.com",
    address: "123 Street, City, Country",
    whatsapp: "10000000000",          // ← International format, no + or spaces
  },

  social: {
    facebook: "https://facebook.com/client",
    instagram: "https://instagram.com/client",
    twitter: "https://twitter.com/client",
  },
};
```

### Step 2 — `config/content.ts` · All Page Copy & Images

Edit any section's text and Unsplash image URLs:

```typescript
// Hero section
export const heroContent = {
  badge: "Free Shipping · 30-Day Returns",
  headlineStart: "The World's Best",
  headlineHighlight: "Premium",       // ← Gets the gold gradient effect
  headlineEnd: "Wireless Earbuds",
  subheadline: "Crystal-clear sound. All-day comfort.",
  heroImage: "https://images.unsplash.com/photo-XXXX?w=1920&q=80",
  // ...
};

// About, Trust, Benefits, Process, CTA, Footer — all configurable the same way
```

### Step 3 — `app/data/products.ts` · Product Cards

```typescript
export const products: Product[] = [
  {
    id: "basic",
    name: "Brand Basic",
    shortDescription: "Short pitch for this variant.",
    variant: "Available in S / M / L",
    imagePath: "https://images.unsplash.com/photo-XXXX?w=800&q=80",
  },
  // Add more...
];
```

---

## Changing the Color Scheme

All colors are in **one place** — `app/globals.css`:

```css
@theme inline {
  --color-primary:        #4F46E5;   /* Main brand color — change this! */
  --color-primary-light:  #818CF8;   /* Hover states */
  --color-primary-dark:   #3730A3;   /* Dark sections background */
  --color-primary-50:     #EEF2FF;   /* Light tint backgrounds */
  --color-primary-100:    #C7D2FE;   /* Border colors */
  --color-accent:         #F59E0B;   /* Gold highlights & gradients */
  --color-accent-light:   #FDE68A;   /* Lighter gold */
}
```

**Every component automatically inherits these.** Just change one hex value and the whole site repaints.

### Color Presets by Industry

| Industry | Primary | Accent |
|----------|---------|--------|
| **Health / Wellness** | `#059669` emerald | `#F59E0B` amber |
| **Tech / SaaS** | `#3B82F6` blue | `#8B5CF6` violet |
| **Luxury / Fashion** | `#1C1917` near-black | `#D97706` gold |
| **Food & Beverage** | `#16A34A` green | `#CA8A04` golden |
| **Beauty / Cosmetics** | `#EC4899` pink | `#F59E0B` amber |
| **Sports / Fitness** | `#DC2626` red | `#F97316` orange |

---

## Sourcing Images (Unsplash)

1. Go to [unsplash.com](https://unsplash.com), search for the client's product category
2. Click any photo → copy the browser URL
3. Extract the photo ID (e.g. `photo-1523275335684-37898b6baf30`)  
4. Format: `https://images.unsplash.com/photo-XXXXXX?w=1920&q=80`
5. Paste into `config/content.ts` or `app/data/products.ts`

> **For production:** Replace Unsplash URLs with the client's actual product photography on their CDN for best performance.

---

## 🗂️ Project Structure

```
├── config/
│   ├── site.ts          ← Brand, contact, social, agency
│   └── content.ts       ← All section copy, images, features, steps
│
├── app/
│   ├── data/
│   │   └── products.ts  ← Product cards (name, description, image, variant)
│   │
│   ├── components/      ← UI sections (DO NOT edit directly)
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── AboutShort.tsx
│   │   ├── Trust.tsx
│   │   ├── Products.tsx
│   │   ├── Benefits.tsx
│   │   ├── Process.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   │
│   ├── about/page.tsx   ← Full About page
│   ├── shop/page.tsx    ← Shop "Coming Soon" page
│   ├── globals.css      ← Color scheme (change colors here)
│   └── layout.tsx       ← SEO metadata (auto-generated from siteConfig)
│
├── next.config.ts       ← Image domains config
├── .env                 ← NEXT_PUBLIC_SITE_URL
└── README.md
```

---

## Deploying for a Client

### Recommended: Vercel (Free tier, perfect for landing pages)

```bash
# 1. Verify build is clean
npm run build

# 2. Deploy
npx vercel --prod
```

Set `NEXT_PUBLIC_SITE_URL=https://clientdomain.com` in Vercel's Environment Variables dashboard.

### Self-Hosted / VPS

```bash
npm run build
npm start   # Runs on port 3000
```

Use nginx as reverse proxy to point the domain to port 3000.

---

## Client Launch Checklist

- [ ] `config/site.ts` — name, tagline, contact details, WhatsApp number, social links
- [ ] `config/content.ts` — all section copy and Unsplash image URLs
- [ ] `app/data/products.ts` — real product names, descriptions, variants, images
- [ ] `app/globals.css` — `--color-primary` matches client brand
- [ ] `.env` — `NEXT_PUBLIC_SITE_URL` set to client's domain
- [ ] `/public/images/og-image.png` — 1200×630px Open Graph image for social sharing
- [ ] `npm run build` — zero TypeScript/lint errors
- [ ] Tested on mobile (iPhone + Android via DevTools) and desktop
- [ ] Custom domain connected in hosting dashboard

---

## Tech Stack

| Tech | Version | Role |
|------|---------|------|
| [Next.js](https://nextjs.org) | 16.2 | React framework (App Router) |
| [React](https://react.dev) | 19 | UI library |
| [Tailwind CSS](https://tailwindcss.com) | v4 | Utility-first CSS with `@theme` tokens |
| [TypeScript](https://typescriptlang.org) | 5 | Type safety |
| [Lucide React](https://lucide.dev) | latest | Icon library |
| [Unsplash](https://unsplash.com) | — | Placeholder photography |

---

## Built by SajiloDigital

<p align="center">
  <strong>
    <a href="https://sajilodigital.com.np">sajilodigital.com.np</a>
  </strong>
  <br/>
  Nepal's premier web design & development agency.<br/>
  We build premium digital products for Nepali and global businesses.
</p>
<p align="center">
  <img src="/public/images/SajiloDigital.png" alt="SajiloDigital" width="100" height="100" />

</p>
> **Need a custom website, e-commerce store, or a full digital strategy?**  
> Reach out at [sajilodigital.com.np](https://sajilodigital.com.np)

---

*© SajiloDigital. This template is for internal agency use.*
