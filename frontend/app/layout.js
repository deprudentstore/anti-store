import { Fraunces, Manrope } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/lib/CartContext';

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', weight: ['400', '500', '600'] });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', weight: ['400', '500', '600', '700'] });

export const metadata = {
  title: 'Anti — Furniture Crafted for Comfort',
  description: 'Modern furniture designed for lasting comfort, elegance and function.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="font-body">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
