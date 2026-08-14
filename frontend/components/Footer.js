import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/80 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <h3 className="font-display text-2xl text-cream mb-3">Anti</h3>
          <p className="font-body text-sm leading-relaxed">
            Furniture crafted for comfort, made for life.
          </p>
        </div>
        <div>
          <h4 className="font-body text-cream text-sm tracking-wide uppercase mb-3">Shop</h4>
          <ul className="font-body text-sm space-y-2">
            <li><Link href="/shop">All Products</Link></li>
            <li><Link href="/shop?category=living-room">Living Room</Link></li>
            <li><Link href="/shop?category=bedroom">Bedroom</Link></li>
            <li><Link href="/shop?category=dining-room">Dining Room</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-body text-cream text-sm tracking-wide uppercase mb-3">Company</h4>
          <ul className="font-body text-sm space-y-2">
            <li><Link href="/about">Our Story</Link></li>
            <li><Link href="/blog">Journal</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-body text-cream text-sm tracking-wide uppercase mb-3">Support</h4>
          <ul className="font-body text-sm space-y-2">
            <li><Link href="/contact">Shipping &amp; Delivery</Link></li>
            <li><Link href="/contact">Returns &amp; Refunds</Link></li>
            <li><Link href="/contact">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-5 text-center text-xs font-body text-cream/50">
        © {new Date().getFullYear()} Anti. All rights reserved.
      </div>
    </footer>
  );
}
