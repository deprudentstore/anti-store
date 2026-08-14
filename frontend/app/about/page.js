import Image from 'next/image';

export default function AboutPage() {
  const values = [
    { title: 'Sustainable & Eco-Friendly', desc: 'We source responsibly and build to last, not to landfill.' },
    { title: 'Modern & Timeless Designs', desc: 'Pieces that feel current today and considered for years.' },
    { title: 'Built For Durability', desc: 'Real joinery and real materials, not shortcuts.' },
    { title: 'Designed for Everyday Living', desc: 'Comfort and function come before decoration.' },
  ];
  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      <h1 className="font-display text-4xl text-charcoal mb-4">Why Choose Anti?</h1>
      <p className="font-body text-charcoal/70 max-w-xl mb-10">
        We combine design, comfort and durability to create furniture you'll love for years.
      </p>
      <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
        <div className="aspect-[4/3] bg-sand/40 rounded-sm overflow-hidden">
          <Image src="/placeholder-hero.svg" alt="Anti workshop" width={700} height={525} className="w-full h-full object-cover" />
        </div>
        <ul className="space-y-5">
          {values.map((v) => (
            <li key={v.title} className="flex gap-3">
              <span className="text-terracotta font-display text-lg">✦</span>
              <div>
                <h3 className="font-body font-semibold text-charcoal">{v.title}</h3>
                <p className="font-body text-sm text-charcoal/60">{v.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
