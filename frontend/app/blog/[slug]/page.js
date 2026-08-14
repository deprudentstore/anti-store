import Image from 'next/image';
import { getBlogPost } from '@/lib/api';

async function safe(fn, fallback) { try { return await fn(); } catch { return fallback; } }

export default async function BlogPostPage({ params }) {
  const post = await safe(() => getBlogPost(params.slug), null);
  if (!post) {
    return <div className="max-w-2xl mx-auto px-6 py-24 text-center font-body text-charcoal/60">Post not found.</div>;
  }
  return (
    <article className="max-w-2xl mx-auto px-6 py-14">
      <h1 className="font-display text-4xl text-charcoal mb-6">{post.title}</h1>
      <div className="aspect-[16/9] bg-sand/40 rounded-sm overflow-hidden mb-8">
        <Image src={post.cover_image || '/placeholder-product.svg'} alt={post.title} width={800} height={450} className="w-full h-full object-cover" />
      </div>
      <div className="font-body text-charcoal/80 leading-relaxed whitespace-pre-line">{post.body}</div>
    </article>
  );
}
