"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Check, Plus, Minus, ShoppingBag } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FadeIn } from "../../components/FadeIn";
import { useCart } from "../../context/CartContext";
import { getProductById, formatPrice } from "../../data/allProducts";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const product = getProductById(id);
  const { addItem, openCart } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  // State to hold selected options
  // e.g. { size: "XL", color: "Black" }
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const defaultOpts: Record<string, string> = {};
    if (product?.options) {
      product.options.forEach((opt) => {
        defaultOpts[opt.id] = opt.choices[0]; // pick first by default
      });
    }
    return defaultOpts;
  });

  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link href="/shop" className="text-blue-600 underline">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleOptionSelect = (optionId: string, choice: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionId]: choice }));
  };

  const handleAddToCart = () => {
    addItem({ product, selectedOptions, quantity });
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 w-full">
        
        {/* Breadcrumb / Back */}
        <FadeIn direction="up">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-stone-500 hover:text-stone-900 font-medium mb-10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Collection
          </button>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* ── Left Column: Image Gallery ── */}
          <FadeIn direction="right" className="space-y-6 lg:sticky lg:top-32">
            
            {/* Main Image */}
            <div className="relative aspect-square md:aspect-[4/5] bg-stone-100 rounded-[2.5rem] overflow-hidden shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[activeImage]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    aria-label={`View image ${idx + 1} of ${product.name}`}
                    className={`relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 transition-all duration-300 border-2 cursor-pointer ${
                      activeImage === idx
                        ? "border-[#4F46E5] ring-2 ring-[#4F46E5]/20 shadow-md scale-105"
                        : "border-transparent opacity-60 hover:opacity-100 bg-stone-200"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </FadeIn>

          {/* ── Right Column: Info & Actions ── */}
          <FadeIn direction="left" className="flex flex-col">
            
            {/* Title & Price */}
            <div className="mb-8">
              {product.badge && (
                <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-stone-900 text-white mb-4">
                  {product.badge}
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 leading-tight mb-4">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-stone-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-stone-400 line-through font-medium">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex gap-2 mb-8 flex-wrap">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-stone-100 text-stone-600 rounded-lg text-sm font-medium border border-stone-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="prose prose-stone prose-lg text-stone-600 mb-10 leading-relaxed">
              <p>{product.longDescription}</p>
            </div>

            {/* ── Separator ── */}
            <div className="h-px w-full bg-stone-200 my-8" />

            {/* ── Dynamic Options ── */}
            {product.options && product.options.length > 0 && (
              <div className="space-y-8 mb-10">
                {product.options.map((option) => (
                  <div key={option.id}>
                    <h3 className="text-sm font-extrabold uppercase tracking-widest text-stone-900 mb-4">
                      {option.name}: <span className="text-stone-500 font-medium ml-2">{selectedOptions[option.id]}</span>
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {option.choices.map((choice) => {
                        const isSelected = selectedOptions[option.id] === choice;
                        return (
                          <button
                            key={choice}
                            onClick={() => handleOptionSelect(option.id, choice)}
                            aria-label={`Select ${option.name}: ${choice}`}
                            aria-pressed={isSelected}
                            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all border outline-none cursor-pointer focus:ring-4 focus:ring-[#4F46E5]/20 ${
                              isSelected
                                ? "bg-stone-900 text-white border-stone-900 shadow-md"
                                : "bg-white text-stone-600 border-stone-200 hover:border-stone-400 hover:bg-stone-50"
                            }`}
                          >
                            {choice}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Add to Cart Row ── */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              
              {/* Quantity */}
              <div className="flex items-center justify-between w-full sm:w-auto bg-stone-100 rounded-2xl p-2 shrink-0 border border-stone-200/60">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-12 h-12 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-white rounded-xl transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <div className="w-12 text-center font-extrabold text-lg select-none" aria-live="polite">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-12 h-12 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-white rounded-xl transition-all shadow-sm cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Add Button */}
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-3 py-4 px-8 rounded-2xl font-extrabold text-white text-lg tracking-tight shadow-xl transition-all active:scale-95 disabled:opacity-80"
                style={{
                  background: added
                    ? "#10B981"
                    : "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
                  boxShadow: added
                    ? "0 12px 32px rgba(16, 185, 129, 0.2)"
                    : "0 12px 32px color-mix(in srgb, var(--color-primary) 30%, transparent)",
                }}
              >
                {added ? (
                  <>
                    <Check className="w-6 h-6" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-6 h-6" /> Add to Cart
                  </>
                )}
              </button>
            </div>

            {/* Features Accordion alternative (Just a list for now) */}
            {product.features && product.features.length > 0 && (
              <div className="bg-white rounded-3xl p-8 border border-stone-200/60 shadow-sm">
                <h3 className="text-lg font-extrabold text-stone-900 mb-6 flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  />
                  Product Features
                </h3>
                <ul className="space-y-4">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-stone-500" />
                      </div>
                      <span className="text-stone-600 font-medium leading-relaxed">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  );
}
