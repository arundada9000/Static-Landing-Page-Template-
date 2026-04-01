"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FadeIn } from "../components/FadeIn";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { allProducts, formatPrice } from "../data/allProducts";
import { ShoppingBag, ArrowRight, X, HeartCrack } from "lucide-react";
import { toast } from "sonner";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addItem, openCart } = useCart();

  const wishlistedProducts = useMemo(() => {
    return wishlist
      .map((id) => allProducts.find((p) => p.id === id))
      .filter(Boolean) as typeof allProducts;
  }, [wishlist]);

  const handleQuickAdd = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();

    const defaultOptions: Record<string, string> = {};
    if (product.options) {
      product.options.forEach((opt: any) => {
        defaultOptions[opt.id] = opt.choices[0];
      });
    }

    addItem({ product, selectedOptions: defaultOptions, quantity: 1 });
    
    toast.success(`1x ${product.name} added to cart`, {
      description: "Quick add successful.",
      action: {
        label: "View Cart",
        onClick: () => openCart(),
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface-alt)]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full">
        <FadeIn direction="up">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4 tracking-tight">
              Your Wishlist
            </h1>
            <p className="text-lg text-stone-500 max-w-2xl">
              Keep track of the items you love. Add them to your cart when you're ready.
            </p>
          </div>
        </FadeIn>

        {wishlistedProducts.length === 0 ? (
          <FadeIn>
            <div className="bg-white rounded-[2rem] border border-stone-200/60 p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6 text-rose-300">
                <HeartCrack className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">Your wishlist is empty</h2>
              <p className="text-stone-500 mb-8 max-w-md">
                You haven't added any items to your wishlist yet. Explore our shop and find something you love.
              </p>
              <Link
                href="/shop"
                className="px-8 py-4 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition-colors shadow-lg shadow-stone-900/20 active:scale-95"
              >
                Explore Shop
              </Link>
            </div>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 hover:cursor-pointer">
            {wishlistedProducts.map((product, idx) => (
              <FadeIn key={product.id} delay={(idx % 8) * 0.05} direction="up">
                <Link href={`/shop/${product.id}`} className="block group h-full">
                  <div className="bg-white rounded-[2rem] overflow-hidden border border-stone-200/60 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full relative">
                    
                    {/* Remove from wishlist button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="cursor-pointer absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-[0_4px_10px_rgba(0,0,0,0.1)] text-stone-400 hover:text-rose-500 hover:bg-rose-50 flex items-center justify-center transition-all active:scale-90"
                      aria-label="Remove from wishlist"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-colors duration-500" />
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-extrabold text-stone-900 text-lg line-clamp-2 mb-2">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center gap-2 mb-6">
                        <span className="font-black text-lg text-[var(--color-primary)]">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-sm font-bold text-stone-400 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <button
                          onClick={(e) => handleQuickAdd(e, product)}
                          className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white tracking-tight shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95 bg-stone-900 hover:bg-stone-800"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
