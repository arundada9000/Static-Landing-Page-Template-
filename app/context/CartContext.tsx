"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
  useCallback,
} from "react";
import { ShopProduct, formatPrice, CURRENCY } from "@/app/data/allProducts";
import { siteConfig } from "@/config/site";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CartItem {
  product: ShopProduct;
  /** { color: "Midnight Black", size: "M" } etc. */
  selectedOptions: Record<string, string>;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { index: number } }
  | { type: "UPDATE_QTY"; payload: { index: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "HYDRATE"; payload: CartItem[] };

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = "shop_cart_v1";

const isSameItem = (a: CartItem, b: CartItem) => {
  if (a.product.id !== b.product.id) return false;
  const aKeys = Object.keys(a.selectedOptions).sort();
  const bKeys = Object.keys(b.selectedOptions).sort();
  if (aKeys.join() !== bKeys.join()) return false;
  return aKeys.every((k) => a.selectedOptions[k] === b.selectedOptions[k]);
};

// ─── Reducer ──────────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, items: action.payload };

    case "ADD_ITEM": {
      const existing = state.items.findIndex((i) =>
        isSameItem(i, action.payload)
      );
      if (existing !== -1) {
        const updated = state.items.map((item, idx) =>
          idx === existing
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return { ...state, items: updated };
      }
      return { ...state, items: [...state.items, action.payload] };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((_, i) => i !== action.payload.index),
      };

    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map((item, i) =>
          i === action.payload.index
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        ),
      };

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "OPEN_CART":
      return { ...state, isOpen: true };

    case "CLOSE_CART":
      return { ...state, isOpen: false };

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  subtotal: number;
  addItem: (item: CartItem) => void;
  removeItem: (index: number) => void;
  updateQty: (index: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  checkoutViaWhatsApp: (isPaid?: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });

  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage on mount & listen to cross-tab storage events
  useEffect(() => {
    const hydrate = (saved: string | null) => {
      try {
        if (saved) {
          const parsed: CartItem[] = JSON.parse(saved);
          dispatch({ type: "HYDRATE", payload: parsed });
        }
      } catch {
        // ignore malformed storage
      }
    };

    // Initial hydrate
    hydrate(localStorage.getItem(STORAGE_KEY));
    setMounted(true);

    // Listen to changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        hydrate(e.newValue);
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Persist to localStorage whenever items change
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
      } catch {
        // ignore (e.g. private mode quota)
      }
    }
  }, [state.items, mounted]);

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = state.items.reduce(
    (s, i) => s + i.product.price * i.quantity,
    0
  );

  const addItem = useCallback(
    (item: CartItem) => dispatch({ type: "ADD_ITEM", payload: item }),
    []
  );
  const removeItem = useCallback(
    (index: number) => dispatch({ type: "REMOVE_ITEM", payload: { index } }),
    []
  );
  const updateQty = useCallback(
    (index: number, quantity: number) =>
      dispatch({ type: "UPDATE_QTY", payload: { index, quantity } }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);
  const openCart = useCallback(() => dispatch({ type: "OPEN_CART" }), []);
  const closeCart = useCallback(() => dispatch({ type: "CLOSE_CART" }), []);

  /** Build the WhatsApp message from the current cart and open wa.me */
  const checkoutViaWhatsApp = useCallback((isPaid?: boolean) => {
    if (state.items.length === 0) return;

    const lines: string[] = [
      `Hello! I'd like to place an order from ${siteConfig.name}:`,
      "",
    ];

    state.items.forEach((item, idx) => {
      lines.push(`${idx + 1}. *${item.product.name}*`);
      Object.entries(item.selectedOptions).forEach(([, val]) => {
        // find the option label
        const opt = item.product.options?.find((o) =>
          o.choices.includes(val)
        );
        lines.push(`   - ${opt?.name ?? "Option"}: ${val}`);
      });
      lines.push(`   - Qty: ${item.quantity}`);
      lines.push(
        `   - Price: ${formatPrice(item.product.price * item.quantity)}`
      );
      lines.push("");
    });

    lines.push(`*Total: ${CURRENCY}${subtotal.toLocaleString("en-IN")}*`);
    lines.push("");
    
    if (isPaid) {
      lines.push("✅ *PAYMENT STATUS: PAID VIA QR*");
      lines.push("I have submitted my payment via the QR code. Please verify my transaction.");
    } else {
      lines.push("Please let me know how to proceed with payment. Thank you!");
    }

    const message = encodeURIComponent(lines.join("\n"));
    const phone = siteConfig.contact.whatsapp.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  }, [state.items, subtotal]);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        totalItems,
        subtotal,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        openCart,
        closeCart,
        checkoutViaWhatsApp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
