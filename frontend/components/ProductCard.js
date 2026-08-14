import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }) {
  const img = product.image || '/placeholder-product.svg';
  return (
    <Link href={`/product/${product.slug}`} className="group block focus-ring">
      <div className="aspect-[4/5] bg-sand/40 overflow-hidden rounded-sm">
        <Image
          src={img}
          alt={product.name}
          width={500}
          height={625}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="mt-3">
        <h3 className="font-body text-charcoal">{product.name}</h3>
        <p className="font-body text-sm text-charcoal/60">${Number(product.price).toFixed(2)}</p>
      </div>
    </Link>
  );
}
