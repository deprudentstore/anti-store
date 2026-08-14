'use client';
import { useState } from 'react';
import { subscribeNewsletter } from '@/lib/api';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await subscribeNewsletter(email);
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="bg-sand/40 py-16">
      <div className="max-w-2xl mx-auto text-center px-6">
        <h2 className="font-display text-3xl text-charcoal mb-2">Stay Updated with Anti</h2>
        <p className="font-body text-charcoal/70 mb-6">
          Get first look at new pieces, offers, and design notes from the workshop.
        </p>
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            required
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-sm border border-charcoal/20 font-body flex-1 max-w-sm focus-ring"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-terracotta text-cream px-6 py-3 rounded-sm font-body hover:bg-olive-dark transition-colors focus-ring"
          >
            {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
          </button>
        </form>
        {status === 'done' && <p className="mt-3 text-olive font-body text-sm">You're on the list.</p>}
        {status === 'error' && <p className="mt-3 text-terracotta font-body text-sm">Something went wrong — try again.</p>}
      </div>
    </section>
  );
}
