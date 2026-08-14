'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/CartContext';

export default function CartPage() {
  const cart = useCart();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="font-display text-3xl text-charcoal mb-3">Your cart is empty</h1>
        <Link href="/shop" className="text-terracotta font-body hover:underline focus-ring">Browse the collection →</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-14">
      <h1 className="font-display text-4xl text-charcoal mb-10">Your Cart</h1>
      <div className="space-y-6">
        {cart.items.map((item) => (
          <div key={item.id} className="flex gap-4 items-center border-b border-charcoal/10 pb-6">
            <div className="w-24 h-24 bg-sand/40 rounded-sm overflow-hidden flex-shrink-0">
              <Image src={item.image || '/placeholder-product.svg'} alt={item.name} width={96} height={96} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-body text-charcoal">{item.name}</h3>
              <p className="font-body text-sm text-charcoal/60">${Number(item.price).toFixed(2)}</p>
            </div>
            <div className="flex items-center border border-charcoal/20 rounded-sm">
              <button onClick={() => cart.updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 focus-ring" aria-label="Decrease quantity">−</button>
              <span className="px-3 font-body">{item.quantity}</span>
              <button onClick={() => cart.updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 focus-ring" aria-label="Increase quantity">+</button>
            </div>
            <p className="font-body text-charcoal w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
            <button onClick={() => cart.removeItem(item.id)} className="text-charcoal/40 hover:text-terracotta text-sm focus-ring" aria-label={`Remove ${item.name}`}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-10">
        <p className="font-display text-2xl text-charcoal">Total: ${cart.total.toFixed(2)}</p>
        <Link href="/checkout" className="bg-terracotta text-cream px-8 py-3 rounded-sm font-body hover:bg-olive-dark transition-colors focus-ring">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
