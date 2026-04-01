"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FadeIn } from "../components/FadeIn";
import { useCart } from "../context/CartContext";
import { ShoppingBag, ArrowRight, Search, ListFilter, ArrowUpDown, Tag } from "lucide-react";
import {
  allProducts,
  shopCategories,
  formatPrice,
  ShopProduct,
} from "../data/allProducts";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBadge, setActiveBadge] = useState("All");
  const [sortOrder, setSortOrder] = useState("default"); // default, asc, desc
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = allProducts
    .filter((p) => {
      if (p.active === false) return false;
      
      const matchesCategory =
        activeCategory === "All" || p.category === activeCategory;
        
      const matchesBadge =
        activeBadge === "All" || p.badge === activeBadge;
        
      const matchesSearch =
        searchQuery.trim() === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesBadge && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0; // default order based on array index
    });

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
            <div className="flex flex-col gap-4 mb-16 max-w-5xl mx-auto">
              {/* Top Row: Search and Mobile Filter Toggle */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1 group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-stone-400 group-focus-within:text-[var(--color-primary)] transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-stone-200/80 rounded-2xl text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 shadow-sm hover:shadow-md transition-all text-sm font-medium"
                  />
                </div>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="sm:hidden flex items-center justify-center p-3.5 bg-white border border-stone-200/80 rounded-2xl text-stone-700 shadow-sm hover:bg-stone-50 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50"
                  aria-label="Toggle Filters"
                >
                  <ListFilter className={`w-5 h-5 transition-transform duration-300 ${showFilters ? "rotate-90 text-[var(--color-primary)]" : ""}`} />
                </button>
              </div>

              {/* Bottom Row: Filters (Category, Badge, Sort) */}
              <div 
                className={`grid grid-cols-1 sm:grid-cols-3 gap-4 transition-all duration-300 ease-in-out sm:mt-0 ${
                  showFilters 
                    ? "grid-rows-[1fr] opacity-100 mt-2" 
                    : "grid-rows-[0fr] opacity-0 mt-0 sm:grid-rows-[1fr] sm:opacity-100"
                }`}
              >
                <div className="overflow-hidden sm:col-span-3 sm:!overflow-visible">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Category Dropdown */}
                <div className="relative w-full group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[var(--color-primary)] transition-colors z-10">
                    <ListFilter className="w-4 h-4" />
                  </div>
                  <select
                    value={activeCategory}
                    onChange={(e) => setActiveCategory(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-white border border-stone-200/80 rounded-xl text-stone-900 focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 shadow-sm hover:border-stone-300 transition-all appearance-none cursor-pointer text-sm font-medium hover:bg-stone-50"
                  >
                    {shopCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === "All" ? "All Categories" : cat}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-stone-400 z-10">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Badge Dropdown */}
                <div className="relative w-full group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[var(--color-primary)] transition-colors z-10">
                    <Tag className="w-4 h-4" />
                  </div>
                  <select
                    value={activeBadge}
                    onChange={(e) => setActiveBadge(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-white border border-stone-200/80 rounded-xl text-stone-900 focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 shadow-sm hover:border-stone-300 transition-all appearance-none cursor-pointer text-sm font-medium hover:bg-stone-50"
                  >
                    <option value="All">All Tags</option>
                    <option value="Bestseller">Bestsellers</option>
                    <option value="Sale">On Sale</option>
                    <option value="New">New Arrivals</option>
                    <option value="Limited">Limited Edition</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-stone-400 z-10">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Price Sort Dropdown */}
                <div className="relative w-full group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[var(--color-primary)] transition-colors z-10">
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-white border border-stone-200/80 rounded-xl text-stone-900 focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 shadow-sm hover:border-stone-300 transition-all appearance-none cursor-pointer text-sm font-medium hover:bg-stone-50"
                  >
                    <option value="default">Default Sorting</option>
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-stone-400 z-10">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                  </div>
                </div>
              </div>
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
                          <div className="flex items-center gap-3">
                            <span 
                              className="font-black text-lg text-white px-4 py-1.5 rounded-xl shadow-lg transition-transform group-hover:scale-105"
                              style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))" }}
                            >
                              {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-[12px] font-bold text-stone-400 line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                          
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all group-hover:scale-110 shadow-md group-hover:shadow-[var(--color-primary)]/20"
                            style={{ backgroundColor: "var(--color-primary)" }}
                          >
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
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
