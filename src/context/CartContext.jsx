/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { charactersByCategory, merchandise } from '../data/mockData';

const STORAGE_KEY = 'fandomverse_cart';
const CART_TYPE = {
  merchandise: 'merchandise',
  character: 'character',
};
const CartContext = createContext(null);
const productsById = new Map(merchandise.map((product) => [product.id, product]));
const charactersById = new Map(
  Object.values(charactersByCategory).flat().map((character) => [character.id, character]),
);

const canUseStorage = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const getCatalog = (type) => (type === CART_TYPE.character ? charactersById : productsById);

const normalizeType = (type) => (type === CART_TYPE.character ? CART_TYPE.character : CART_TYPE.merchandise);

const normalizeLine = (line) => {
  const quantity = line?.quantity;
  const itemId = line?.itemId || line?.productId;
  if (!itemId || !Number.isInteger(quantity) || quantity <= 0) return null;

  const type = normalizeType(line.type);
  if (!getCatalog(type).has(itemId)) return null;

  return { itemId, type, quantity };
};

const readCart = () => {
  if (!canUseStorage()) return [];

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeLine).filter(Boolean);
  } catch {
    return [];
  }
};

const parsePrice = (price) => {
  const value = Number.parseFloat(String(price || '').replace(/[^0-9.-]+/g, ''));
  return Number.isFinite(value) && value >= 0 ? value : 0;
};

const resolveCartItem = (line) => {
  if (line.type === CART_TYPE.character) {
    const character = charactersById.get(line.itemId);
    if (!character) return null;

    return {
      id: character.id,
      title: character.name,
      name: character.name,
      image: character.image,
      category: character.category,
      type: CART_TYPE.character,
      description: character.biography || '',
      quantity: line.quantity,
      unitPrice: parsePrice(character.price),
    };
  }

  const product = productsById.get(line.itemId);
  if (!product) return null;

  return {
    ...product,
    type: CART_TYPE.merchandise,
    quantity: line.quantity,
    unitPrice: parsePrice(product.price),
  };
};

const matchesLine = (line, itemId, type) => line.itemId === itemId && line.type === normalizeType(type);

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
    const items = lines.map(resolveCartItem).filter(Boolean);
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);

    return {
      lines,
      items,
      totalQuantity,
      subtotal,
      addToCart: (itemId, type = CART_TYPE.merchandise) => setLines((current) => {
        const cartType = normalizeType(type);
        if (!getCatalog(cartType).has(itemId)) return current;
        const existing = current.find((line) => matchesLine(line, itemId, cartType));
        return existing
          ? current.map((line) => (matchesLine(line, itemId, cartType) ? { ...line, quantity: line.quantity + 1 } : line))
          : [...current, { itemId, type: cartType, quantity: 1 }];
      }),
      increaseQuantity: (itemId, type = CART_TYPE.merchandise) => setLines((current) => current.map((line) => (
        matchesLine(line, itemId, type) ? { ...line, quantity: line.quantity + 1 } : line
      ))),
      decreaseQuantity: (itemId, type = CART_TYPE.merchandise) => setLines((current) => current
        .map((line) => (matchesLine(line, itemId, type) ? { ...line, quantity: line.quantity - 1 } : line))
        .filter((line) => line.quantity > 0)),
      removeFromCart: (itemId, type = CART_TYPE.merchandise) => setLines((current) => (
        current.filter((line) => !matchesLine(line, itemId, type))
      )),
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}

export { STORAGE_KEY, parsePrice, CART_TYPE };
