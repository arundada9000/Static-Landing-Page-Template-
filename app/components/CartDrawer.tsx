"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { X, Plus, Minus, Trash2, QrCode, ArrowLeft, Check, Download } from "lucide-react";
import { formatPrice } from "../data/allProducts";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/config/site";

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

  const [showQR, setShowQR] = useState(false);
  const [activePaymentIdx, setActivePaymentIdx] = useState(0);

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
              {showQR ? (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowQR(false)}
                    className="p-1 -ml-1 text-stone-400 hover:text-stone-900 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-xl font-extrabold text-stone-900">
                    Scan to Pay
                  </h2>
                </div>
              ) : (
                <h2 className="text-xl font-extrabold text-stone-900">
                  Your Cart
                </h2>
              )}

              <button
                onClick={closeCart}
                className="p-2 -mr-2 text-stone-400 hover:bg-stone-100 hover:text-stone-900 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            {showQR ? (
              <div className="flex-1 flex flex-col p-6 overflow-y-auto">
                <div className="flex-1 flex flex-col items-center justify-center space-y-6 bg-stone-50 rounded-3xl p-6 border border-stone-200">
                  <div className="text-center space-y-1">
                    <p className="text-stone-500 text-[10px] font-extrabold uppercase tracking-widest leading-none">
                      Total Amount
                    </p>
                    <h3 className="text-3xl font-extrabold text-stone-900 leading-tight">
                      {formatPrice(subtotal)}
                    </h3>
                  </div>

                  {/* Payment Tabs (only if multiple) */}
                  {siteConfig.qrPayments.length > 1 && (
                    <div className="flex p-1 bg-stone-200/50 rounded-[1.25rem] w-full border border-stone-100 shadow-inner">
                      {siteConfig.qrPayments.map((payment, idx) => (
                        <button
                          key={payment.name}
                          onClick={() => setActivePaymentIdx(idx)}
                          className={`flex-1 py-2 text-[11px] font-extrabold rounded-xl transition-all duration-300 outline-none cursor-pointer ${
                            activePaymentIdx === idx
                              ? "bg-white text-stone-900 shadow-md scale-[1.03]"
                              : "text-stone-400 hover:text-stone-600 hover:bg-white/30"
                          }`}
                        >
                          {payment.name}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* QR Image Display */}
                  <div className="relative aspect-square w-full max-w-[220px] bg-white p-4 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-stone-100 flex items-center justify-center overflow-hidden group">
                    {siteConfig.qrPayments[activePaymentIdx]?.imageSrc ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={siteConfig.qrPayments[activePaymentIdx].imageSrc}
                          alt={siteConfig.qrPayments[activePaymentIdx].name}
                          fill
                          className="object-contain p-1 transition-transform duration-500 group-hover:scale-110"
                          priority
                        />
                      </div>
                    ) : (
                      <div className="text-center p-8 bg-stone-50 rounded-2xl w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-stone-100">
                        <QrCode className="w-12 h-12 text-stone-200 mb-2" />
                        <p className="text-[10px] text-stone-400 font-extrabold leading-none">
                          No QR Set
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Download QR Button */}
                  {siteConfig.qrPayments[activePaymentIdx]?.imageSrc && (
                    <a
                      href={siteConfig.qrPayments[activePaymentIdx].imageSrc}
                      download={`QR_${siteConfig.qrPayments[activePaymentIdx].name}.jpg`}
                      className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 text-stone-500 text-[10px] font-extrabold uppercase tracking-[0.1em] hover:bg-[var(--color-primary)] hover:text-white transition-all shadow-sm active:scale-95"
                    >
                      <Download className="w-3 h-3" />
                      Download QR
                    </a>
                  )}

                  {/* Help Text */}
                  <div className="text-center space-y-3 px-2">
                    <div className="flex flex-col items-center">
                      <p className="text-[13px] font-extrabold text-stone-900 tracking-tight leading-none mb-1">
                        Pay via{" "}
                        {siteConfig.qrPayments[activePaymentIdx]?.name ||
                          "Online Method"}
                      </p>
                      <div className="h-0.5 w-8 bg-[var(--color-primary)] rounded-full opacity-30" />
                    </div>
                    <p className="text-[11px] text-stone-500 leading-relaxed font-semibold max-w-[200px] mx-auto">
                      Scan the code above using your mobile banking or wallet
                      app for instant checkout.
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => checkoutViaWhatsApp(true)}
                    className="w-full flex justify-center items-center gap-2 py-4 px-6 rounded-2xl font-extrabold text-white text-lg tracking-tight shadow-xl shadow-[var(--color-primary)]/20 transition-all hover:-translate-y-1 hover:brightness-110 active:scale-95 group"
                    style={{ background: "var(--color-primary)" }}
                  >
                    <Check className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    I've Sent the Payment
                  </button>
                  <button
                    onClick={() => setShowQR(false)}
                    className="w-full py-2 text-stone-400 font-bold text-xs tracking-widest uppercase hover:text-stone-900 transition-colors"
                  >
                    Back to my Order
                  </button>
                </div>
              </div>
            ) : (
              // -- Default Items View --
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center bg-stone-50">
                        <Trash2 className="w-8 h-8 text-stone-300" />
                      </div>
                      <p className="text-stone-500 font-medium">
                        Your cart is empty.
                      </p>
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
                              {Object.entries(item.selectedOptions).map(
                                ([key, val]) => (
                                  <div key={key}>
                                    <span className="font-medium text-stone-400">
                                      {item.product.options?.find((o) =>
                                        o.choices.includes(val),
                                      )?.name || "Option"}
                                      :
                                    </span>{" "}
                                    {val}
                                  </div>
                                ),
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            {/* Qty Controls */}
                            <div className="flex items-center gap-2 bg-stone-50 rounded-full p-1 border border-stone-100 shadow-sm">
                              <button
                                onClick={() =>
                                  updateQty(idx, item.quantity - 1)
                                }
                                className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-full transition-colors cursor-pointer"
                                aria-label={`Decrease quantity of ${item.product.name}`}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span
                                className="text-sm font-extrabold w-6 text-center select-none text-stone-700"
                                aria-live="polite"
                              >
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQty(idx, item.quantity + 1)
                                }
                                className="p-1.5 text-emerald-500 hover:bg-emerald-100 rounded-full transition-colors cursor-pointer"
                                aria-label={`Increase quantity of ${item.product.name}`}
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Remove */}
                            <button
                              onClick={() => removeItem(idx)}
                              className="p-2.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 group ml-auto"
                              aria-label={`Remove ${item.product.name} from cart`}
                              title="Remove item"
                            >
                              <Trash2 className="w-[18px] h-[18px] group-hover:scale-110 transition-transform" />
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
                      <span className="text-stone-500 font-medium">
                        Subtotal
                      </span>
                      <span className="text-xl font-extrabold text-stone-900">
                        {formatPrice(subtotal)}
                      </span>
                    </div>

                    {/* Actions Group */}
                    <div className="space-y-3">
                      <button
                        onClick={() => checkoutViaWhatsApp(false)}
                        className="w-full flex justify-center items-center gap-3 py-4 px-6 rounded-2xl font-extrabold text-white text-[15px] sm:text-base tracking-tight shadow-lg shadow-[#25D366]/30 transition-all hover:-translate-y-1 hover:shadow-[#25D366]/40 active:scale-95"
                        style={{
                          background:
                            "linear-gradient(135deg, #25D366, #128C7E)",
                        }}
                      >
                        <svg
                          className="w-5 h-5 fill-current shrink-0"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                        </svg>
                        Checkout via WhatsApp
                      </button>

                      <button
                        onClick={() => setShowQR(true)}
                        className="w-full flex justify-center items-center gap-2 py-3.5 px-6 rounded-2xl font-extrabold text-stone-900 bg-white border border-stone-200 text-sm tracking-tight shadow-sm hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all active:scale-95 group"
                      >
                        <QrCode className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Pay Instantly via QR
                      </button>
                    </div>

                    <p className="text-center text-xs text-stone-400 mt-4 leading-relaxed">
                      Taxes and shipping calculated on WhatsApp.
                    </p>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
