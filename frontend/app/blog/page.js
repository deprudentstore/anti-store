import Link from 'next/link';
import Image from 'next/image';
import { getBlogPosts } from '@/lib/api';

async function safe(fn, fallback) { try { return await fn(); } catch { return fallback; } }

export default async function BlogPage() {
  const posts = await safe(() => getBlogPosts(), { results: [] });
  const list = posts.results || posts;

  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      <h1 className="font-display text-4xl text-charcoal mb-2">The Journal</h1>
      <p className="font-body text-charcoal/60 mb-10">Notes on design, craft, and living well at home.</p>
      {list.length === 0 ? (
        <p className="font-body text-charcoal/60">No posts yet — add some from the admin panel.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-10">
          {list.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group focus-ring">
              <div className="aspect-[4/3] bg-sand/40 rounded-sm overflow-hidden mb-3">
                <Image src={post.cover_image || '/placeholder-product.svg'} alt={post.title} width={500} height={375} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <h2 className="font-display text-xl text-charcoal group-hover:text-terracotta transition-colors">{post.title}</h2>
              <p className="font-body text-sm text-charcoal/60 mt-1">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
