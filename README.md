# Nepal Bamboo Salt — Official Landing Page

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)

A premium, production-ready landing page built for **Nepal Bamboo Salt Pvt. Ltd.** to educate customers on the ancient benefits of roasted bamboo salt and generate direct sales via WhatsApp.

---

## Features & Implementation

- **Next.js App Router**: Lightning-fast static rendering (`/` and `/shop`) optimized for SEO and Core Web Vitals.
- **Tailwind CSS v4**: Built entirely with the newest Tailwind engine and strict custom design tokens (`@theme` in `globals.css`) matching the brand's primary green (`#296B46`).
- **Lucide Icons**: Crisp, professional SVG icons across the interface.
- **Fully Responsive**: Mobile-first design with a custom animated hamburger menu and scroll-aware navigation.
- **WhatsApp Integration**: Dynamic links pre-filling customer intent automatically based on the product selected.
- **Phase 2 Ready**: The `/shop` page acts as an expansive teaser for upcoming eCommerce features.

## 🛠️ Tech Stack & Structure

- **Core**: Next.js (App Router), React, TypeScript.
- **Styling**: Tailwind v4 (`app/globals.css`).
- **Data Source**: Centralized product mock data located at `app/data/products.ts`.
- **Components**: Modular and reusable sections (`Navbar`, `Hero`, `Products`, `Trust`, `Benefits`, `Process`, `CTA`, `Footer`) housed in `app/components`.

## 🌱 SEO & Meta Configuration

This project uses comprehensive Next.js file-based metadata out-of-the-box:
- **`app/layout.tsx`**: Contains the full SEO configuration including `openGraph`, `twitter` cards, and keywords.
- **`app/icon.png` / `app/apple-icon.png`**: Auto-injected as favicons.
- **`public/images/og-image.png`**: Custom-crafted social sharing map.

## Running Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```

3. **View Application**:
   Open [http://localhost:3000](http://localhost:3000) with your browser.

4. **Production Build**:
   ```bash
   npm run build
   npm start
   ```

---

<br />

<div align="center">
  <a href="https://sajilodigital.com.np" target="_blank">
    <img src="/images/SajiloDigital.png" alt="Sajilo Digital Logo" width="120" />
  </a>
  <h3>Proudly Designed & Developed by <a href="https://sajilodigital.com.np" style="color: #296B46; text-decoration: none;">Sajilo Digital</a></h3>
  <p>YOUR VISION , OUR INNOVATION</p>
</div>
