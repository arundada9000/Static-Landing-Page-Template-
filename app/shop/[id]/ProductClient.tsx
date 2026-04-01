"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Check, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { FadeIn } from "../../components/FadeIn";
import { useCart } from "../../context/CartContext";
import { ShopProduct, formatPrice, allProducts } from "../../data/allProducts";
import { siteConfig } from "@/config/site";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function ProductClient({ product }: { product: ShopProduct }) {
  const router = useRouter();
  const { addItem, openCart } = useCart();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // State to hold selected options
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const defaultOpts: Record<string, string> = {};
    if (product.options) {
      product.options.forEach((opt) => {
        defaultOpts[opt.id] = opt.choices[0]; // pick first by default
      });
    }
    return defaultOpts;
  });

  const handleOptionSelect = (optionId: string, choice: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionId]: choice }));
  };

  const handleAddToCart = () => {
    addItem({ product, selectedOptions, quantity });
    setAdded(true);
    
    // Instead of immediately opening the drawer, we show a sleek toast notification
    toast.success(`${quantity}x ${product.name} added to cart`, {
      description: "Your item is ready for checkout.",
      action: {
        label: "View Cart",
        onClick: () => openCart(),
      },
    });

    setTimeout(() => setAdded(false), 2000);
  };

  const handleDirectWhatsAppOrder = () => {
    const opts = Object.entries(selectedOptions)
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ");

    const message = `Hi! I'd like to directly order:\n*${product.name}*\nQuantity: ${quantity}\nOptions: [${opts}]\nPrice: ${formatPrice(product.price * quantity)}`;
    const phone = siteConfig.contact.whatsapp.replace(/[^0-9]/g, "");
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const swipeDistance = touchStart - touchEnd;
    
    // Swipe left (next image)
    if (swipeDistance > 50) {
      nextImage();
    } 
    // Swipe right (previous image)
    else if (swipeDistance < -50) {
      prevImage();
    }
    setTouchStart(null);
  };

  // Get similar products for suggestions
  const suggestedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  // If not enough in same category, just take random/first 3 distinct
  const finalSuggestions = suggestedProducts.length === 3
    ? suggestedProducts
    : allProducts.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 w-full">
      {/* Breadcrumb / Back */}
      <FadeIn direction="up">
        <Link
          href="/shop"
          className="inline-flex items-center gap-3 text-stone-600 hover:text-[var(--color-primary)] font-extrabold text-xs uppercase tracking-widest transition-all group px-5 py-2.5 bg-white rounded-full border border-stone-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[var(--color-primary)]/10 mb-8 w-fit"
        >
          <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          </div>
          Back to Shop
        </Link>
      </FadeIn>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* ── Left Column: Image Gallery ── */}
        <FadeIn direction="right" className="space-y-6 lg:sticky lg:top-32">
          {/* Main Image */}
          <div 
            className="relative aspect-square md:aspect-[4/5] bg-stone-50 rounded-[2.5rem] overflow-hidden shadow-sm group select-none touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImageIdx}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={product.images[activeImageIdx]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Badge */}
            {product.badge && (
              <div
                className="absolute top-6 left-6 z-10 text-white text-xs font-black uppercase tracking-wider px-4 py-2 rounded-full shadow-lg backdrop-blur-md"
                style={{ background: "var(--color-primary)" }}
              >
                {product.badge}
              </div>
            )}

            {/* Navigation Arrows (Desktop) */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-center text-stone-700 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:text-[var(--color-primary)] active:scale-95 hidden sm:flex cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 mr-0.5" />
                </button>
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-center text-stone-700 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:text-[var(--color-primary)] active:scale-95 hidden sm:flex cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 ml-0.5" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  aria-label={`View image ${idx + 1} of ${product.name}`}
                  className={`relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 transition-all duration-300 border-2 cursor-pointer ${
                    activeImageIdx === idx
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
            <div className="inline-flex items-center gap-4 bg-stone-100/50 border border-stone-200/40 p-2 pr-6 rounded-[2rem] shadow-inner mb-6">
              <div
                className="px-6 py-3 rounded-[1.75rem] flex items-center justify-center text-white shadow-lg"
                style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))" }}
              >
                <span className="text-2xl md:text-3xl font-black tracking-tight">{formatPrice(product.price)}</span>
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest leading-none mb-1">Was</span>
                    <span className="text-lg text-rose-400/80 line-through font-bold leading-none">
                      {formatPrice(product.originalPrice)}
                    </span>
                  </div>
                  <div className="px-2.5 py-1.5 bg-rose-100 text-rose-600 font-extrabold text-xs tracking-wide rounded-lg shadow-sm border border-rose-200">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </div>
                </div>
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
            <div className="flex items-center justify-between w-full sm:w-auto bg-stone-100 rounded-2xl p-2 shrink-0 border border-stone-200/60 shadow-inner">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-12 h-12 flex items-center justify-center text-stone-400 hover:text-rose-500 hover:bg-rose-50 hover:shadow-sm rounded-xl transition-all disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:shadow-none disabled:hover:text-stone-400 disabled:cursor-not-allowed cursor-pointer active:scale-90"
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus className="w-5 h-5" />
              </button>
              <div className="w-12 text-center font-black text-lg text-stone-800 select-none" aria-live="polite">
                {quantity}
              </div>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-12 h-12 flex items-center justify-center text-stone-400 hover:text-emerald-500 hover:bg-emerald-50 hover:shadow-sm rounded-xl transition-all cursor-pointer active:scale-90"
                aria-label="Increase quantity"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Add Button Section */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <div className="hidden sm:flex flex-row gap-3 w-full">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-extrabold text-white text-lg tracking-tight shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 active:scale-95 disabled:opacity-80 disabled:hover:scale-100 disabled:hover:translate-y-0 cursor-pointer overflow-hidden relative group"
                  style={{
                    background: added
                      ? "#10B981"
                      : "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
                    boxShadow: added
                      ? "0 12px 32px rgba(16, 185, 129, 0.3)"
                      : "0 12px 32px color-mix(in srgb, var(--color-primary) 35%, transparent)",
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                  <span className="relative z-10 flex items-center gap-2">
                    {added ? <><Check className="w-5 h-5 animate-scale-in" /> Added!</> : <><ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" /> Add to Cart</>}
                  </span>
                </button>

                <button
                  onClick={handleDirectWhatsAppOrder}
                  className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-extrabold text-white text-lg tracking-tight shadow-lg transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 active:scale-95 cursor-pointer relative group overflow-hidden"
                  style={{ 
                    background: "linear-gradient(135deg, #25D366, #128C7E)",
                    boxShadow: "0 12px 32px rgba(37, 211, 102, 0.25)"
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                    </svg>
                    Order Direct
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Sticky Bar */}
          <div className="fixed bottom-15 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-stone-200/60 p-4 z-40 sm:hidden flex flex-row gap-2 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-extrabold text-white text-sm tracking-tight shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer relative overflow-hidden group"
              style={{ background: added ? "#10B981" : "var(--color-primary)" }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
              <span className="relative z-10 flex items-center gap-2">
                {added ? <Check className="w-4 h-4 animate-scale-in" /> : <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                {added ? "Added!" : "Add to Cart"}
              </span>
            </button>
            <button
              onClick={handleDirectWhatsAppOrder}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-extrabold text-white text-sm tracking-tight shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer relative overflow-hidden group"
              style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
                Order Direct
              </span>
            </button>
          </div>

          {/* Features Accordion alternative */}
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

      {/* ── Suggested Products Section ── */}
      <div className="mt-28 mb-12 border-t border-stone-200 pt-20">
        <FadeIn direction="up">
          <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 mb-2">You Might Also Like</h2>
          <p className="text-lg text-stone-500 mb-12">Discover similar premium items from our collection.</p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {finalSuggestions.map((item, idx) => (
            <FadeIn key={item.id} direction="up" delay={idx * 0.15}>
              <Link
                href={`/shop/${item.id}`}
                className="group bg-white rounded-3xl overflow-hidden flex flex-col border border-stone-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative h-64 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="flex flex-col flex-1 p-7">
                  <h3 className="text-xl font-extrabold text-stone-900 mb-2 leading-tight">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-extrabold text-stone-900">
                      {formatPrice(item.price)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm font-bold text-stone-400 line-through">
                        {formatPrice(item.originalPrice)}
                      </span>
                    )
                    }
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </main>
  );
}
