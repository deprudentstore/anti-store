import { getProducts, getCategories } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

async function safe(fn, fallback) {
  try { return await fn(); } catch { return fallback; }
}

export default async function ShopPage({ searchParams }) {
  const category = searchParams?.category || '';
  const query = category ? `?category=${category}` : '';
  const [products, categories] = await Promise.all([
    safe(() => getProducts(query), { results: [] }),
    safe(() => getCategories(), []),
  ]);
  const productList = products.results || products;
  const categoryList = categories.results || categories;

  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      <h1 className="font-display text-4xl text-charcoal mb-2">Shop All Furniture</h1>
      <p className="font-body text-charcoal/60 mb-8">{productList.length} pieces, crafted for comfort.</p>

      <div className="flex flex-wrap gap-3 mb-10">
        <Link href="/shop" className={`px-4 py-2 rounded-full text-sm font-body border ${!category ? 'bg-charcoal text-cream border-charcoal' : 'border-charcoal/20 text-charcoal/70'}`}>
          All
        </Link>
        {categoryList.map((c) => (
          <Link
            key={c.id}
            href={`/shop?category=${c.slug}`}
            className={`px-4 py-2 rounded-full text-sm font-body border ${category === c.slug ? 'bg-charcoal text-cream border-charcoal' : 'border-charcoal/20 text-charcoal/70'}`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      {productList.length === 0 ? (
        <p className="font-body text-charcoal/60">No products yet — add some from the admin panel.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {productList.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
