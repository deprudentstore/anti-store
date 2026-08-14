'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="max-w-xl mx-auto px-6 py-14">
      <h1 className="font-display text-4xl text-charcoal mb-2">Get in Touch</h1>
      <p className="font-body text-charcoal/60 mb-10">Questions about an order, delivery, or a custom piece? We'd love to hear from you.</p>
      {sent ? (
        <p className="font-body text-olive">Thanks for reaching out — we'll reply within 1–2 business days.</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
          <input required placeholder="Your name" className="w-full px-4 py-3 border border-charcoal/20 rounded-sm font-body focus-ring" />
          <input required type="email" placeholder="Email address" className="w-full px-4 py-3 border border-charcoal/20 rounded-sm font-body focus-ring" />
          <textarea required placeholder="Your message" rows={5} className="w-full px-4 py-3 border border-charcoal/20 rounded-sm font-body focus-ring" />
          <button type="submit" className="bg-terracotta text-cream px-8 py-3 rounded-sm font-body hover:bg-olive-dark transition-colors focus-ring">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
