"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { formatPrice } from "../data/allProducts";
import { AnimatePresence, motion } from "framer-motion";

export default function CartDrawer() {
  const {
    isOpen,
    items,
    closeCart,
    subtotal,
    removeItem,
    updateQty,
    checkoutViaWhatsApp,
  } = useCart();

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 z-50 w-full max-w-sm h-[100dvh] bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-stone-100">
              <h2 className="text-xl font-extrabold text-stone-900">Your Cart</h2>
              <button
                onClick={closeCart}
                className="p-2 -mr-2 text-stone-400 hover:bg-stone-100 hover:text-stone-900 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center bg-stone-50"
                  >
                    <Trash2 className="w-8 h-8 text-stone-300" />
                  </div>
                  <p className="text-stone-500 font-medium">Your cart is empty.</p>
                  <button
                    onClick={closeCart}
                    className="px-6 py-2 bg-stone-900 text-white rounded-full font-bold text-sm hover:bg-stone-800 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-20 h-20 relative rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-100">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-stone-900 text-sm leading-tight line-clamp-2">
                          {item.product.name}
                        </h3>
                        {/* Selected Options */}
                        <div className="text-xs text-stone-500 mt-1 space-y-0.5">
                          {Object.entries(item.selectedOptions).map(([key, val]) => (
                            <div key={key}>
                              <span className="font-medium text-stone-400">
                                {item.product.options?.find((o) => o.choices.includes(val))?.name || "Option"}:
                              </span>{" "}
                              {val}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        {/* Qty Controls */}
                        <div className="flex items-center gap-2 bg-stone-50 rounded-full p-1 border border-stone-100">
                          <button
                            onClick={() => updateQty(idx, item.quantity - 1)}
                            className="p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
                            aria-label={`Decrease quantity of ${item.product.name}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold w-5 text-center select-none" aria-live="polite">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(idx, item.quantity + 1)}
                            className="p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
                            aria-label={`Increase quantity of ${item.product.name}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        
                        {/* Remove */}
                        <button
                          onClick={() => removeItem(idx)}
                          className="p-2 text-stone-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 group"
                          aria-label={`Remove ${item.product.name} from cart`}
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className="font-extrabold text-stone-900 text-sm">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Checkout */}
            {items.length > 0 && (
              <div className="p-4 border-t border-stone-100 bg-stone-50/50">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-stone-500 font-medium">Subtotal</span>
                  <span className="text-xl font-extrabold text-stone-900">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <button
                  onClick={checkoutViaWhatsApp}
                  className="w-full py-4 px-6 rounded-2xl font-extrabold text-white text-lg tracking-tight shadow-lg shadow-[#25D366]/20 transition-all hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, #25D366, #128C7E)",
                  }}
                >
                  Checkout via WhatsApp
                </button>
                <p className="text-center text-xs text-stone-400 mt-3">
                  Taxes and shipping calculated on WhatsApp.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
