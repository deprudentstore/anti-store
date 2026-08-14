'use client';
import { useState } from 'react';
import { useCart } from '@/lib/CartContext';

export default function AddToCartButton({ product }) {
  const cart = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    cart.addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center border border-charcoal/20 rounded-sm">
        <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 focus-ring" aria-label="Decrease quantity">−</button>
        <span className="px-3 font-body">{qty}</span>
        <button onClick={() => setQty(qty + 1)} className="px-3 py-2 focus-ring" aria-label="Increase quantity">+</button>
      </div>
      <button
        onClick={handleAdd}
        disabled={product.stock === 0}
        className="bg-terracotta text-cream px-8 py-3 rounded-sm font-body hover:bg-olive-dark transition-colors disabled:opacity-40 focus-ring"
      >
        {added ? 'Added ✓' : 'Add to Cart'}
      </button>
    </div>
  );
}
