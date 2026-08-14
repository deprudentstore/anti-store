'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem('anti-cart');
    if (saved) setItems(JSON.parse(saved));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem('anti-cart', JSON.stringify(items));
  }, [items, ready]);

  const addItem = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, image: product.image, slug: product.slug, quantity }];
    });
  };

  const updateQuantity = (id, quantity) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i)));
  };

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setItems([]);
  const total = items.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
