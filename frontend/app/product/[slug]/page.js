import Image from 'next/image';
import { getProduct } from '@/lib/api';
import AddToCartButton from '@/components/AddToCartButton';

async function safe(fn, fallback) {
  try { return await fn(); } catch { return fallback; }
}

export default async function ProductPage({ params }) {
  const product = await safe(() => getProduct(params.slug), null);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="font-display text-3xl text-charcoal">Product not found</h1>
        <p className="font-body text-charcoal/60 mt-2">It may have been removed or is out of stock.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-12">
      <div className="aspect-[4/5] bg-sand/40 rounded-sm overflow-hidden">
        <Image src={product.image || '/placeholder-product.svg'} alt={product.name} width={700} height={875} className="w-full h-full object-cover" />
      </div>
      <div>
        {product.category && (
          <p className="font-body text-sm uppercase tracking-wide text-terracotta mb-2">{product.category.name}</p>
        )}
        <h1 className="font-display text-4xl text-charcoal mb-4">{product.name}</h1>
        <p className="font-body text-2xl text-charcoal mb-6">
          ${Number(product.price).toFixed(2)}
          {product.compare_at_price && (
            <span className="text-base text-charcoal/40 line-through ml-3">${Number(product.compare_at_price).toFixed(2)}</span>
          )}
        </p>
        <p className="font-body text-charcoal/70 leading-relaxed mb-8">{product.description}</p>
        <AddToCartButton product={product} />
        <p className="font-body text-xs text-charcoal/50 mt-4">
          {product.stock > 0 ? `${product.stock} in stock` : 'Currently out of stock'}
        </p>
      </div>
    </div>
  );
}
