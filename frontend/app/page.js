import Link from 'next/link';
import Image from 'next/image';
import { getProducts, getCategories, getTestimonials, getBlogPosts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import JointDivider from '@/components/JointDivider';
import Newsletter from '@/components/Newsletter';

async function safe(fn, fallback) {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export default async function HomePage() {
  const [featured, categories, testimonials, posts] = await Promise.all([
    safe(() => getProducts('?featured=1'), { results: [] }),
    safe(() => getCategories(), []),
    safe(() => getTestimonials(), []),
    safe(() => getBlogPosts(), []),
  ]);

  const featuredList = featured.results || featured;
  const categoryList = categories.results || categories;
  const testimonialList = testimonials.results || testimonials;
  const postList = (posts.results || posts).slice(0, 3);

  const whyShop = [
    { title: 'Premium Materials', desc: 'Only the finest hardwoods, textiles and finishes.' },
    { title: 'Expert Craftsmanship', desc: 'Made with skill and precision at every joint.' },
    { title: 'Stylish & Functional', desc: 'Designed to fit real life, not just look good.' },
    { title: "Customer First", desc: "We're here to make every purchase easy." },
  ];

  return (
    <div>
      <section className="max-w-6xl mx-auto px-6 pt-14 pb-10 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="font-body text-sm tracking-widest uppercase text-terracotta mb-4">Anti Furniture Co.</p>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05] text-charcoal">
            Crafted for Comfort.<br /><span className="text-olive">Made for Life.</span>
          </h1>
          <p className="font-body text-charcoal/70 mt-6 max-w-md">
            Expressive modern furniture designed for lasting elegance, comfort and function in your home.
          </p>
          <div className="flex gap-4 mt-8">
            <Link href="/shop" className="bg-terracotta text-cream px-6 py-3 rounded-sm font-body hover:bg-olive-dark transition-colors focus-ring">
              Shop Now
            </Link>
            <Link href="/shop" className="border border-charcoal/30 text-charcoal px-6 py-3 rounded-sm font-body hover:border-charcoal transition-colors focus-ring">
              View Collections
            </Link>
          </div>
        </div>
        <div className="aspect-[4/3] bg-sand/50 rounded-sm overflow-hidden">
          <Image src="/placeholder-hero.svg" alt="Modern living room with Anti furniture" width={800} height={600} className="w-full h-full object-cover" priority />
        </div>
      </section>

      <JointDivider />

      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="font-display text-2xl text-charcoal mb-8 text-center">Why Shop With Anti?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {whyShop.map((item) => (
            <div key={item.title} className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-olive/10 flex items-center justify-center text-olive font-display">✦</div>
              <h3 className="font-body font-semibold text-charcoal text-sm">{item.title}</h3>
              <p className="font-body text-xs text-charcoal/60 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {featuredList.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-14">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl text-charcoal">Featured Products</h2>
            <Link href="/shop" className="font-body text-sm text-terracotta hover:underline focus-ring">View All Products →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredList.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {categoryList.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-14">
          <h2 className="font-display text-2xl text-charcoal mb-8">Browse by Category</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {categoryList.map((c) => (
              <Link key={c.id} href={`/shop?category=${c.slug}`} className="text-center group focus-ring">
                <div className="aspect-square rounded-full bg-sand/40 overflow-hidden mb-2">
                  <Image src={c.image || '/placeholder-product.svg'} alt={c.name} width={150} height={150} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <p className="font-body text-xs text-charcoal/80">{c.name}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <JointDivider />

      <section className="bg-olive text-cream py-16">
        <div className="max-w-3xl mx-auto text-center px-6">
          <p className="font-display text-2xl md:text-3xl leading-relaxed">
            &ldquo;Furniture that transforms your house into a home.&rdquo;
          </p>
          {testimonialList[0] && (
            <p className="font-body text-cream/70 text-sm mt-4">— {testimonialList[0].customer_name}</p>
          )}
        </div>
      </section>

      {postList.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-14">
          <h2 className="font-display text-2xl text-charcoal mb-8">From Our Journal</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {postList.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group focus-ring">
                <div className="aspect-[4/3] bg-sand/40 rounded-sm overflow-hidden mb-3">
                  <Image src={post.cover_image || '/placeholder-product.svg'} alt={post.title} width={400} height={300} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <h3 className="font-body text-charcoal group-hover:text-terracotta transition-colors">{post.title}</h3>
                <p className="font-body text-sm text-charcoal/60 mt-1">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Newsletter />
    </div>
  );
}
