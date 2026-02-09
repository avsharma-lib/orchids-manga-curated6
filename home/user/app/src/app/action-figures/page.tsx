'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { formatPrice } from '@/lib/manga-data';
import { useProducts } from '@/lib/products-context';

export default function ActionFiguresPage() {
  const { allActionFigures } = useProducts();
  return (
    <div className="bg-[var(--paper)] pt-20 min-h-screen">
      <section className="py-16 border-b border-[var(--mist)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <nav className="flex items-center gap-2 text-sm text-[var(--stone)] mb-6"><Link href="/" className="hover:text-[var(--ink)]">Home</Link><span>/</span><span className="text-[var(--ink)]">Action Figures</span></nav>
          <h1 className="text-4xl md:text-5xl text-[var(--ink)]" style={{ fontFamily: 'var(--font-heading)' }}>Action Figures</h1>
          <p className="mt-4 text-[var(--stone)]">{allActionFigures.length} figures available</p>
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {allActionFigures.length === 0 ? (
            <div className="text-center py-24"><p className="text-[var(--stone)] text-lg">No action figures yet. Check back soon!</p></div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {allActionFigures.map((figure, index) => (
                <motion.div key={figure.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03, duration: 0.3 }}>
                  <Link href={`/action-figures/${figure.id}`} className="group block">
                    <div className="relative aspect-square bg-[var(--mist)] overflow-hidden rounded-lg mb-4">
                      <Image src={figure.image} alt={figure.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 25vw" unoptimized />
                      <div className="absolute top-2 left-2"><span className="px-2 py-1 text-[10px] tracking-widest uppercase bg-[var(--ink)] text-white rounded">Figure</span></div>
                    </div>
                    <h3 className="text-sm font-medium text-[var(--ink)] mb-1 group-hover:text-[var(--crimson)] transition-colors line-clamp-2">{figure.title}</h3>
                    {figure.series && <p className="text-xs text-[var(--stone)] mb-2">{figure.series}</p>}
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-medium text-[var(--ink)]">{formatPrice(figure.price)}</span>
                      <span className="text-xs text-[var(--stone)] line-through">{formatPrice(figure.originalPrice)}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
