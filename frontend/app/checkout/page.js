'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import { createOrder } from '@/lib/api';

export default function CheckoutPage() {
  const cart = useCart();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!cart || cart.items.length === 0) return;
    setStatus('loading');
    setError('');
    try {
      await createOrder({
        customer_name: form.name,
        customer_email: form.email,
        customer_phone: form.phone,
        customer_address: form.address,
        customer_city: form.city,
        items: cart.items.map((i) => ({ product: i.id, quantity: i.quantity, price: i.price })),
      });
      cart.clearCart();
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setError('Could not place order. Please try again.');
    }
  };

  if (status === 'done') {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-charcoal mb-3">Thank you, {form.name.split(' ')[0]}!</h1>
        <p className="font-body text-charcoal/70">Your order has been received. We'll be in touch to confirm delivery.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-14">
      <h1 className="font-display text-4xl text-charcoal mb-8">Checkout</h1>
      <form onSubmit={submit} className="space-y-4">
        <input required placeholder="Full name" value={form.name} onChange={update('name')} className="w-full px-4 py-3 border border-charcoal/20 rounded-sm font-body focus-ring" />
        <input required type="email" placeholder="Email address" value={form.email} onChange={update('email')} className="w-full px-4 py-3 border border-charcoal/20 rounded-sm font-body focus-ring" />
        <input required placeholder="Phone number" value={form.phone} onChange={update('phone')} className="w-full px-4 py-3 border border-charcoal/20 rounded-sm font-body focus-ring" />
        <input required placeholder="Delivery address" value={form.address} onChange={update('address')} className="w-full px-4 py-3 border border-charcoal/20 rounded-sm font-body focus-ring" />
        <input required placeholder="City" value={form.city} onChange={update('city')} className="w-full px-4 py-3 border border-charcoal/20 rounded-sm font-body focus-ring" />

        <div className="border-t border-charcoal/10 pt-4 mt-6">
          <p className="font-body text-charcoal flex justify-between"><span>Total</span><span>${cart ? cart.total.toFixed(2) : '0.00'}</span></p>
        </div>

        {error && <p className="text-terracotta font-body text-sm">{error}</p>}

        <button type="submit" disabled={status === 'loading'} className="w-full bg-terracotta text-cream px-8 py-3 rounded-sm font-body hover:bg-olive-dark transition-colors focus-ring">
          {status === 'loading' ? 'Placing order…' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}
