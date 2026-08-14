'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/lib/CartContext';

const links = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'Our Story' },
  { href: '/blog', label: 'Journal' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const cart = useCart();

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur border-b border-charcoal/10">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-2xl tracking-tight text-charcoal">
          Anti
        </Link>
        <ul className="hidden md:flex gap-8 font-body text-sm text-charcoal/80">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-terracotta transition-colors focus-ring">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative font-body text-sm text-charcoal focus-ring" aria-label="View cart">
            Cart
            {cart && cart.count > 0 && (
              <span className="absolute -top-2 -right-3 bg-terracotta text-cream text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.count}
              </span>
            )}
          </Link>
          <button
            className="md:hidden focus-ring"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span className="block w-6 h-0.5 bg-charcoal mb-1.5" />
            <span className="block w-6 h-0.5 bg-charcoal mb-1.5" />
            <span className="block w-6 h-0.5 bg-charcoal" />
          </button>
        </div>
      </nav>
      {open && (
        <ul className="md:hidden flex flex-col gap-1 px-6 pb-4 font-body text-charcoal/80">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="block py-2 focus-ring" onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
