'use client';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { use, useState } from 'react';
import { formatPrice } from '@/lib/manga-data';
import { useProducts } from '@/lib/products-context';
import { useCart } from '@/lib/cart-context';

export default function ActionFigureDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getActionFigureById } = useProducts();
  const figure = getActionFigureById(id);
  const router = useRouter();
  const { addToCart } = useCart();
  const [imgError, setImgError] = useState(false);

  if (!figure) { notFound(); }

  const handleAddToCart = () => {
    addToCart({ id: figure.id, title: figure.title, author: figure.brand || 'Action Figure', description: figure.description, price: figure.price, originalPrice: figure.originalPrice, image: figure.image, genre: ['Action Figure'], rating: 4.5, volumes: 1, status: 'completed' });
  };

  const handleBuyNow = () => {
    const item = { id: figure.id, title: figure.title, author: figure.brand || 'Action Figure', description: figure.description, price: figure.price, originalPrice: figure.originalPrice, image: figure.image, genre: ['Action Figure'] as string[], rating: 4.5, volumes: 1, status: 'completed' as const };
    const buyNowItems = JSON.stringify([{ manga: item, quantity: 1 }]);
    sessionStorage.setItem('buy-now-items', buyNowItems);
    router.push('/checkout?mode=buynow');
  };

  return (
    <div className="bg-[var(--paper)] pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-6">
        <nav className="flex items-center gap-2 text-sm text-[var(--stone)]">
          <Link href="/" className="hover:text-[var(--ink)]">Home</Link><span>/</span>
          <Link href="/action-figures" className="hover:text-[var(--ink)]">Action Figures</Link><span>/</span>
          <span className="text-[var(--ink)]">{figure.title}</span>
        </nav>
      </div>
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="relative">
              <div className="sticky top-32">
                <div className="relative aspect-square bg-[var(--mist)] overflow-hidden rounded-lg">
                  {imgError ? <div className="absolute inset-0 flex items-center justify-center"><span className="text-xl text-[var(--stone)]">{figure.title}</span></div> : <Image src={figure.image} alt={figure.title} fill className="object-cover" sizes="50vw" priority onError={() => setImgError(true)} unoptimized />}
                </div>
                <div className="absolute top-4 left-4"><span className="px-3 py-1.5 text-xs tracking-widest uppercase bg-[var(--ink)] text-white">Action Figure</span></div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="lg:py-8">
              {figure.brand && <p className="text-sm tracking-wider text-[var(--stone)] mb-2">{figure.brand}</p>}
              <h1 className="text-4xl md:text-5xl text-[var(--ink)] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>{figure.title}</h1>
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-3xl font-medium text-[var(--ink)]">{formatPrice(figure.price)}</span>
                <span className="text-lg text-[var(--stone)] line-through">{formatPrice(figure.originalPrice)}</span>
                <span className="px-2 py-1 text-xs tracking-wider bg-[var(--crimson)] text-white">SAVE {Math.round((1 - figure.price / figure.originalPrice) * 100)}%</span>
              </div>
              {figure.description && <p className="text-lg text-[var(--stone)] leading-relaxed mb-8">{figure.description}</p>}
              <div className="border-t border-b border-[var(--mist)] py-6 mb-8 space-y-3">
                {figure.characterName && <div className="flex justify-between text-sm"><span className="text-[var(--stone)]">Character</span><span className="text-[var(--ink)]">{figure.characterName}</span></div>}
                {figure.series && <div className="flex justify-between text-sm"><span className="text-[var(--stone)]">Series</span><span className="text-[var(--ink)]">{figure.series}</span></div>}
                {figure.material && <div className="flex justify-between text-sm"><span className="text-[var(--stone)]">Material</span><span className="text-[var(--ink)]">{figure.material}</span></div>}
                {figure.height && <div className="flex justify-between text-sm"><span className="text-[var(--stone)]">Height</span><span className="text-[var(--ink)]">{figure.height}</span></div>}
                {figure.weight && <div className="flex justify-between text-sm"><span className="text-[var(--stone)]">Weight</span><span className="text-[var(--ink)]">{figure.weight}</span></div>}
              </div>
              <button onClick={handleAddToCart} className="group w-full py-4 bg-[var(--ink)] text-[var(--paper)] text-sm tracking-widest uppercase hover:bg-[var(--charcoal)] transition-all duration-300 flex items-center justify-center gap-3">Add to Cart</button>
              <button onClick={handleBuyNow} className="w-full mt-3 py-4 bg-[var(--crimson)] text-white text-sm tracking-widest uppercase hover:bg-[var(--crimson)]/90 transition-colors">Buy Now</button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
