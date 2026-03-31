"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import { faqContent, faqItems, type FAQItem } from "@/config/content";
import { FadeIn } from "./FadeIn";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section 
      id="faq" 
      className="py-24 md:py-32 relative overflow-hidden bg-white border-t border-stone-200"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute -top-[20%] -right-[10%] w-[40%] h-[50%] rounded-full blur-[100px] opacity-20"
          style={{ backgroundColor: "var(--color-primary)" }}
        />
        <div 
          className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[100px] opacity-[0.15]"
          style={{ backgroundColor: "var(--color-accent)" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <FadeIn direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-[10px] sm:text-xs font-bold mb-6 text-stone-600 uppercase tracking-widest">
              <span 
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: "var(--color-primary)" }}
              />
              {faqContent.badge}
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-stone-900 mb-6 tracking-tight">
              {faqContent.headlineStart}{" "}
              <span 
                className="text-transparent bg-clip-text"
                style={{ 
                  backgroundImage: "linear-gradient(to right, var(--color-primary), var(--color-accent))" 
                }}
              >
                {faqContent.headlineHighlight}
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto font-medium leading-relaxed">
              {faqContent.subheadline}
            </p>
          </FadeIn>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 md:space-y-6">
          {faqItems.map((item: FAQItem, index) => {
            const isOpen = openId === item.id;

            return (
              <FadeIn key={item.id} direction="up" delay={0.2 + index * 0.1}>
                  <div 
                    className={`rounded-2xl md:rounded-[2rem] border transition-all duration-300 overflow-hidden ${
                      isOpen 
                        ? "bg-white border-stone-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] scale-[1.02] md:scale-[1.01]" 
                        : "bg-stone-50/50 border-transparent hover:bg-stone-50 hover:border-stone-200"
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full flex items-center justify-between gap-4 p-6 md:p-8 text-left focus:outline-none cursor-pointer group"
                      aria-expanded={isOpen}
                    >
                      <span className="text-lg md:text-xl font-bold text-stone-900 group-hover:text-[var(--color-primary)] transition-colors pr-8">
                        {item.question}
                      </span>
                      
                      <div 
                        className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isOpen 
                            ? "bg-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary)]/20" 
                            : "bg-stone-100 text-stone-500 group-hover:bg-stone-200 group-hover:text-stone-900"
                        }`}
                      >
                        <ChevronDown 
                          className={`w-5 h-5 transition-transform duration-500 ${isOpen ? "rotate-180" : "rotate-0"}`} 
                        />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                        >
                          <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                            <div className="h-px w-full bg-stone-100 mb-6" />
                            <p className="text-stone-500 leading-relaxed font-medium md:text-lg">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        
        {/* Helper bottom text */}
        <FadeIn direction="up" delay={0.6}>
          <div className="mt-16 text-center">
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-bold transition-colors group cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Still have questions? Send us a message
            </a>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
