"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FadeIn } from "../components/FadeIn";
import { useCart } from "../context/CartContext";
import { ShoppingBag, ArrowRight } from "lucide-react";
import {
  allProducts,
  shopCategories,
  formatPrice,
  ShopProduct,
} from "../data/allProducts";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? allProducts.filter((p) => p.active !== false)
      : allProducts.filter(
          (p) => p.active !== false && p.category === activeCategory
        );

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-surface-alt)" }}>
      <Navbar />

      <main className="flex-1">
        {/* ── Hero Banner ── */}
        <div
          className="relative text-white pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden text-center"
          style={{ backgroundColor: "var(--color-primary-dark)" }}
        >
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--color-primary) 50%, transparent) 0%, transparent 80%)",
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <FadeIn>
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md border border-white/20"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <ShoppingBag className="w-8 h-8 text-white/90" />
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                Curated {" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, var(--color-accent-light), var(--color-accent))",
                  }}
                >
                  Excellence
                </span>
              </h1>

              <p className="text-lg md:text-xl mb-0 leading-relaxed max-w-2xl mx-auto text-white/70 font-medium">
                Discover our collection of premium goods. Add to your cart and place your order securely via WhatsApp.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* ── Shop Section ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          
          {/* Filter Bar */}
          <FadeIn direction="up">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
              {shopCategories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={isActive}
                    aria-label={`Filter by category: ${cat}`}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
                      isActive ? "ring-2 ring-offset-2 ring-primary" : ""
                    }`}
                    style={{
                      backgroundColor: isActive
                        ? "var(--color-primary)"
                        : "white",
                      color: isActive ? "white" : "var(--color-stone-600)",
                      border: isActive
                        ? "1px solid var(--color-primary)"
                        : "1px solid var(--color-border)",
                      boxShadow: isActive
                        ? "0 4px 14px color-mix(in srgb, var(--color-primary) 30%, transparent)"
                        : "0 2px 4px transparent",
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </FadeIn>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-stone-500 font-medium">
              No products found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filteredProducts.map((product, idx) => (
                <FadeIn key={product.id} delay={idx * 0.05} direction="up">
                  <Link href={`/shop/${product.id}`} className="block group h-full">
                    <div className="bg-white rounded-[2rem] overflow-hidden border border-stone-200/60 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full relative">
                      
                      {/* Badge (if any) */}
                      {product.badge && (
                        <div
                          className="absolute top-4 left-4 z-20 text-white text-xs font-extrabold px-4 py-1.5 rounded-full shadow-lg backdrop-blur-md"
                          style={{ background: "var(--color-primary)" }}
                        >
                          {product.badge}
                        </div>
                      )}

                      {/* Image Container */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-500" />
                      </div>

                      {/* Content */}
                      <div className="p-6 md:p-8 flex flex-col flex-1">
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <h3 className="font-extrabold text-stone-900 text-xl line-clamp-2">
                            {product.name}
                          </h3>
                        </div>
                        
                        <p className="text-stone-500 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">
                          {product.shortDescription}
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-baseline gap-2">
                            <span className="font-extrabold text-lg text-stone-900">
                              {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-stone-400 line-through font-medium">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110 shadow-md"
                            style={{ backgroundColor: "var(--color-primary)" }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
