"use client";

import Image from "next/image";
import Link from "next/link";
import { Tag, Star, ArrowRight, ShoppingBag } from "lucide-react";
import { products } from "../data/products";
import { siteConfig } from "@/config/site";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className ?? "w-4 h-4"} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

export default function Products() {
  const getWhatsAppUrl = (productName: string) => {
    const message = encodeURIComponent(`Hi! I want to order ${productName}`);
    return `https://wa.me/${siteConfig.contact.whatsapp}?text=${message}`;
  };

  return (
    <section id="products" className="py-24 lg:py-32" style={{ backgroundColor: "var(--color-surface-alt)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full border"
            style={{
              color: "var(--color-primary)",
              backgroundColor: "var(--color-primary-50)",
              borderColor: "var(--color-primary-100)",
            }}
          >
            Our Collection
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight mt-4 mb-4">
            Find Your Perfect Fit
          </h2>
          <p className="text-stone-500 text-lg leading-relaxed">
            Three tiers of uncompromising quality — each crafted to deliver an exceptional experience.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-3xl overflow-hidden flex flex-col border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              style={
                product.isBest
                  ? { borderColor: "var(--color-primary)", boxShadow: "0 4px 24px color-mix(in srgb, var(--color-primary) 15%, transparent)" }
                  : { borderColor: "#e5e7eb" }
              }
            >
              {/* Product Image */}
              <div className="relative h-64 w-full overflow-hidden bg-stone-100">
                <Image
                  src={product.imagePath}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {product.isBest && (
                  <div
                    className="absolute top-4 left-4 flex items-center gap-1 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md"
                    style={{ background: "var(--color-primary)" }}
                  >
                    <Star className="w-3 h-3 fill-current" />
                    Best Seller
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-7">
                <div className="flex-1">
                  <h3 className="text-xl font-extrabold text-stone-900 mb-2 leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed mb-5">
                    {product.shortDescription}
                  </p>

                  <div className="flex items-center gap-2 mb-6 pb-6 border-b border-stone-100">
                    <Tag className="w-4 h-4" style={{ color: "var(--color-primary)" }} />
                    <span className="text-sm text-stone-500">Variant</span>
                    <span className="text-sm font-bold text-stone-900">{product.variant}</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="grid md:grid-cols-2 gap-3">
                  <a
                    href={getWhatsAppUrl(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#1da851] transition-all duration-300 active:scale-95 shadow-sm"
                  >
                    <WhatsAppIcon />
                    Order
                  </a>
                  <Link
                    href="/shop"
                    className="flex items-center justify-center gap-2 border py-3 rounded-xl font-bold text-sm transition-all duration-300 active:scale-95"
                    style={{
                      color: "var(--color-primary)",
                      backgroundColor: "var(--color-primary-50)",
                      borderColor: "var(--color-primary-100)",
                    }}
                  >
                    <ShoppingBag className="w-4 h-4" /> View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Browse all */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-white px-8 py-4 rounded-full font-bold text-base transition-all duration-300 shadow-xl active:scale-95 w-full sm:w-auto justify-center"
            style={{ background: "var(--color-primary)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.background =
                "var(--color-primary-light)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.background =
                "var(--color-primary)")
            }
          >
            Browse All Products{" "}
            <ArrowRight className="group-hover:translate-x-1 transition-all ease-in duration-200" />
          </Link>
        </div>
      </div>
    </section>
  );
}
