"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

interface WishlistContextValue {
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

const STORAGE_KEY = "shop_wishlist_v1";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setWishlist(JSON.parse(saved));
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    }
  }, [wishlist, mounted]);

  const toggleWishlist = useCallback((productId: string) => {
    const isAdding = !wishlist.includes(productId);

    if (isAdding) {
      toast.success("Added to Wishlist", {
        description: "Item saved! You can view it later.",
        action: {
          label: "View Wishlist",
          onClick: () => { window.location.href = "/wishlist"; }
        }
      });
      setWishlist((prev) => Array.from(new Set([...prev, productId])));
    } else {
      toast("Removed from Wishlist", {
        description: "Item has been removed from your saved items.",
      });
      setWishlist((prev) => prev.filter((id) => id !== productId));
    }
  }, [wishlist]);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
}
