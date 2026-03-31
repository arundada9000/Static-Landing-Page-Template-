"use client";

import Image from "next/image";
import Link from "next/link";
import { Tag, Star, ArrowRight, ShoppingBag } from "lucide-react";
import { allProducts, formatPrice } from "../data/allProducts";
import { motion } from "framer-motion";



export default function Products() {
  // Grab the top 3 products for the featured section
  const featuredProducts = allProducts.slice(0, 3);

  return (
    <section id="products" className="py-24 lg:py-32" style={{ backgroundColor: "var(--color-surface-alt)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
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
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, idx) => {
            const isBest = product.badge === "Bestseller";
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group bg-white rounded-3xl overflow-hidden flex flex-col border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                style={
                  isBest
                    ? { borderColor: "var(--color-primary)", boxShadow: "0 4px 24px color-mix(in srgb, var(--color-primary) 15%, transparent)" }
                    : { borderColor: "#e5e7eb" }
                }
              >
                {/* Product Image */}
                <div className="relative h-64 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {product.badge && (
                    <div
                      className="absolute top-4 left-4 flex items-center gap-1 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md"
                      style={
                        isBest ? { background: "var(--color-primary)" } : { background: "var(--color-accent)" }
                      }
                    >
                      {isBest && <Star className="w-3 h-3 fill-current" />}
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-7">
                  <div className="flex-1">
                    <h3 className="text-xl font-extrabold text-stone-900 mb-2 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-stone-500 text-sm leading-relaxed mb-5 line-clamp-2">
                      {product.shortDescription}
                    </p>

                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-stone-50">
                      <div className="flex items-center gap-4">
                        <span 
                          className="text-lg font-black px-5 py-2 rounded-xl text-white shadow-xl shadow-[var(--color-primary)]/10"
                          style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))" }}
                        >
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs font-bold text-stone-400 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col gap-3 mt-auto">
                    <Link
                      href={`/shop/${product.id}`}
                      className="w-full text-center bg-[var(--color-primary)] text-white py-3.5 rounded-xl font-extrabold text-sm hover:brightness-110 active:scale-95 transition-all shadow-md shadow-[var(--color-primary)]/20"
                    >
                      Configure & Order
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
