import Link from "next/link";
import Image from "next/image";
import {
  Bell,
  ShoppingBag,
  Phone,
  ShoppingCart,
  Wallet,
  WalletCards,
  TruckElectric,
} from "lucide-react";
import { products } from "../data/products";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: `Shop | ${siteConfig.name} — Coming Soon`,
  description:
    "Our online store is coming soon. In the meantime, order via WhatsApp or call us directly.",
};

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

export default function ShopPage() {
  const getWhatsAppUrl = (productName: string) => {
    const message = encodeURIComponent(`Hi! I want to order ${productName}`);
    return `https://wa.me/${siteConfig.contact.whatsapp}?text=${message}`;
  };

  const notifyWhatsApp = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    `Please notify me when the ${siteConfig.name} online store is live`
  )}`;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-surface-alt)" }}>
      <Navbar />

      {/* Hero Banner */}
      <div
        className="relative text-white py-28 lg:py-36 overflow-hidden text-center"
        style={{ backgroundColor: "var(--color-primary-dark)" }}
      >
        {/* Glow scrim */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, color-mix(in srgb, var(--color-primary) 40%, transparent) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto px-4">
          {/* Icon */}
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/20"
            style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
          >
            <ShoppingBag className="w-10 h-10 text-white" />
          </div>

          {/* Badge */}
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase mb-5 px-4 py-1.5 rounded-full border border-white/20"
            style={{ color: "var(--color-accent)", backgroundColor: "rgba(255,255,255,0.08)" }}
          >
            Phase 2 — Coming Soon
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-5 leading-tight">
            Our Online Store is <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--color-accent-light), var(--color-accent))",
              }}
            >
              Coming Soon
            </span>
          </h1>

          <p
            className="text-lg mb-10 leading-relaxed max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            We&apos;re building a beautiful online store with cart, secure payments, and
            fast delivery worldwide. Until then, order directly via WhatsApp!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={notifyWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white px-6 py-3 rounded-full font-bold text-sm transition-all active:scale-95"
              style={{ background: "var(--color-primary)" }}
            >
              <Bell className="w-4 h-4" />
              Notify Me When Live
            </a>
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-white border border-white/25 px-6 py-3 rounded-full font-bold text-sm transition-all active:scale-95 hover:bg-white/10"
            >
              <Phone className="w-4 h-4" />
              Call Us Now
            </a>
          </div>
        </div>
      </div>

      {/* Product Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full border"
            style={{
              color: "var(--color-primary)",
              backgroundColor: "var(--color-primary-50)",
              borderColor: "var(--color-primary-100)",
            }}
          >
            Order Now via WhatsApp
          </span>
          <h2 className="text-3xl font-extrabold text-stone-900 mt-4 mb-3">
            Products Available Right Now
          </h2>
          <p className="text-stone-500">
            Browse our collection and place your order instantly through WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                <Image
                  src={product.imagePath}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
                {product.isBest && (
                  <div
                    className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md"
                    style={{ background: "var(--color-primary)" }}
                  >
                    Best Seller
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-extrabold text-stone-900 text-lg mb-2">
                  {product.name}
                </h3>
                <p className="text-stone-500 text-sm mb-4 flex-1">
                  {product.shortDescription}
                </p>
                <p className="text-xs text-stone-400 mb-5">
                  <span className="font-bold text-stone-700">Variant: </span>
                  {product.variant}
                </p>
                <a
                  href={getWhatsAppUrl(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white py-3 rounded-xl font-bold text-sm transition-all active:scale-95"
                >
                  <WhatsAppIcon />
                  Order via WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phase 2 Features */}
      <div
        className="border-t border-stone-200 py-16"
        style={{ backgroundColor: "var(--color-primary-50)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-extrabold text-stone-900 mb-3">
            What&apos;s Coming in Phase 2
          </h2>
          <p className="text-stone-500 mb-10">Our full-featured online store is on its way.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {[
              { label: "Shopping Cart", icon: <ShoppingCart /> },
              { label: "Secure Payments", icon: <Wallet /> },
              { label: "Card Payments", icon: <WalletCards /> },
              { label: "Fast Delivery", icon: <TruckElectric /> },
            ].map(({ label, icon }) => (
              <div
                key={label}
                className="bg-white rounded-2xl border p-5 flex flex-col items-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
                style={{ borderColor: "var(--color-primary-100)" }}
              >
                <span style={{ color: "var(--color-primary)" }} className="text-3xl">
                  {icon}
                </span>
                <span className="text-sm font-bold text-stone-900">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
