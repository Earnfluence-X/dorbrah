"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  image: string;
  imageFilter?: string | null;
  colorway: string;
  collection: string;
  qty: number;
}

interface StoreState {
  items: CartItem[];
  hydrated: boolean;
  isCartOpen: boolean;
  count: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  updateQty: (slug: string, qty: number) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const STORAGE_KEY = "dorbrah.cart.v1";

const StoreContext = createContext<StoreState | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      /* corrupted storage — start fresh */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }, [items, hydrated]);

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  const addItem = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.slug === item.slug);
      if (existing) {
        return prev.map((p) =>
          p.slug === item.slug ? { ...p, qty: Math.min(12, p.qty + qty) } : p
        );
      }
      return [...prev, { ...item, qty: Math.min(12, qty) }];
    });
    setCartOpen(true);
  }, []);

  const updateQty = useCallback((slug: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((p) => p.slug !== slug)
        : prev.map((p) =>
            p.slug === slug ? { ...p, qty: Math.min(12, qty) } : p
          )
    );
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((p) => p.slug !== slug));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const subtotal = useMemo(
    () => items.reduce((sum, p) => sum + p.price * p.qty, 0),
    [items]
  );
  const count = useMemo(
    () => items.reduce((sum, p) => sum + p.qty, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      hydrated,
      isCartOpen,
      count,
      subtotal,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      openCart,
      closeCart,
    }),
    [items, hydrated, isCartOpen, count, subtotal, addItem, updateQty, removeItem, clearCart, openCart, closeCart]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreState {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
