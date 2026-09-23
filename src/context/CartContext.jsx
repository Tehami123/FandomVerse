import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { merchandise } from '../data/mockData';

const STORAGE_KEY = 'fandomverse_cart';
const CartContext = createContext(null);
const productsById = new Map(merchandise.map((product) => [product.id, product]));

const canUseStorage = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const readCart = () => {
  if (!canUseStorage()) return [];

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((line) => line?.productId && Number.isInteger(line.quantity) && line.quantity > 0)
      .map((line) => ({ productId: line.productId, quantity: line.quantity }));
  } catch {
    return [];
  }
};

const parsePrice = (price) => {
  const value = Number.parseFloat(String(price || '').replace(/[^0-9.-]+/g, ''));
  return Number.isFinite(value) && value >= 0 ? value : 0;
};

export function CartProvider({ children }) {
  const [lines, setLines] = useState(readCart);

  useEffect(() => {
    if (!canUseStorage()) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // The temporary in-memory cart remains usable when storage is unavailable.
    }
  }, [lines]);

  const value = useMemo(() => {
    const items = lines
      .map((line) => {
        const product = productsById.get(line.productId);
        return product ? { ...product, quantity: line.quantity, unitPrice: parsePrice(product.price) } : null;
      })
      .filter(Boolean);
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);

    return {
      lines,
      items,
      totalQuantity,
      subtotal,
      addToCart: (productId) => setLines((current) => {
        if (!productsById.has(productId)) return current;
        const existing = current.find((line) => line.productId === productId);
        return existing
          ? current.map((line) => line.productId === productId ? { ...line, quantity: line.quantity + 1 } : line)
          : [...current, { productId, quantity: 1 }];
      }),
      increaseQuantity: (productId) => setLines((current) => current.map((line) => (
        line.productId === productId ? { ...line, quantity: line.quantity + 1 } : line
      ))),
      decreaseQuantity: (productId) => setLines((current) => current
        .map((line) => line.productId === productId ? { ...line, quantity: line.quantity - 1 } : line)
        .filter((line) => line.quantity > 0)),
      removeFromCart: (productId) => setLines((current) => current.filter((line) => line.productId !== productId)),
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}

export { STORAGE_KEY, parsePrice };
