"use client";

import { useState, useEffect, useRef } from "react";
import { Share2, Copy, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface ShareProductProps {
  productTitle: string;
  productUrl?: string; // Optional, defaults to window.location.href
}

export default function ShareProduct({ productTitle, productUrl }: ShareProductProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUrl(productUrl || window.location.href);
  }, [productUrl]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleShare = async () => {
    const shareData = {
      title: productTitle,
      text: `Check out ${productTitle}`,
      url: url,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Error sharing:", err);
          setIsOpen(true);
        }
      }
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
      setIsOpen(false);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const shareOptions = [
    {
      name: "Copy Link",
      icon: <Copy className="w-4 h-4" />,
      action: copyLink,
    },
    {
      name: "WhatsApp",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      ),
      action: () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(`${productTitle} - ${url}`)}`, "_blank");
        setIsOpen(false);
      },
      color: "text-green-600",
      bgHover: "hover:bg-green-50",
    },
    {
      name: "Facebook",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      ),
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
        setIsOpen(false);
      },
      color: "text-blue-600",
      bgHover: "hover:bg-blue-50",
    },
    {
      name: "Twitter / X",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      action: () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`Check out ${productTitle}`)}`, "_blank");
        setIsOpen(false);
      },
      color: "text-sky-500",
      bgHover: "hover:bg-sky-50",
    },
  ];

  return (
    <div className="relative inline-block w-full sm:w-auto" ref={dropdownRef}>
      <button
        onClick={handleShare}
        className="w-12 h-12 sm:w-12 sm:h-12 w-full h-[46px] flex items-center justify-center text-stone-600 bg-stone-100 rounded-xl sm:rounded-2xl border border-stone-200/60 shadow-sm transition-all hover:bg-stone-200 hover:text-stone-900 active:scale-95 cursor-pointer"
        aria-label="Share product"
      >
        <Share2 className="w-5 h-5 sm:w-5 sm:h-5 w-4 h-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 bottom-full mb-3 w-56 bg-white/95 backdrop-blur-md border border-stone-200/60 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden z-[100] origin-bottom-right"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100 bg-stone-50/50">
              <span className="text-xs font-black uppercase tracking-widest text-stone-500">Share</span>
              <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-stone-700 transition-colors">
                <X className="w-4 h-4 cursor-pointer" />
              </button>
            </div>
            <div className="flex flex-col py-1.5">
              {shareOptions.map((option, idx) => (
                <button
                  key={idx}
                  onClick={option.action}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-bold transition-colors cursor-pointer
                    ${option.bgHover ? option.bgHover : "hover:bg-stone-100"} 
                    ${option.color ? option.color : "text-stone-700"}
                  `}
                >
                  {option.icon}
                  {option.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
