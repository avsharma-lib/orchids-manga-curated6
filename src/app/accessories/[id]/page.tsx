'use client';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { use, useState } from 'react';
import { formatPrice } from '@/lib/product-data';
import { useProducts } from '@/lib/products-context';
import { useCart } from '@/lib/cart-context';

export default function AccessoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getAccessoryById } = useProducts();
  const accessory = getAccessoryById(id);
  const router = useRouter();
  const { addToCart } = useCart();
  const [imgError, setImgError] = useState(false);

  if (!accessory) { notFound(); }

  const handleAddToCart = () => {
    addToCart({ id: accessory.id, title: accessory.title, author: 'Accessory', description: accessory.description, price: accessory.price, originalPrice: accessory.originalPrice, image: accessory.image, genre: ['Accessory'], rating: 4.5, volumes: 1, status: 'completed' });
  };

  const handleBuyNow = () => {
    const item = { id: accessory.id, title: accessory.title, author: 'Accessory', description: accessory.description, price: accessory.price, originalPrice: accessory.originalPrice, image: accessory.image, genre: ['Accessory'] as string[], rating: 4.5, volumes: 1, status: 'completed' as const };
    const buyNowItems = JSON.stringify([{ product: item, quantity: 1 }]);
    sessionStorage.setItem('buy-now-items', buyNowItems);
    router.push('/checkout?mode=buynow');
  };

  return (
    <div className="bg-[var(--paper)] pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-6">
        <nav className="flex items-center gap-2 text-sm text-[var(--stone)]">
          <Link href="/" className="hover:text-[var(--ink)]">Home</Link><span>/</span>
          <Link href="/accessorys" className="hover:text-[var(--ink)]">Accessorys</Link><span>/</span>
          <span className="text-[var(--ink)]">{accessory.title}</span>
        </nav>
      </div>
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="relative">
              <div className="sticky top-32">
                <div className="relative aspect-[3/2] bg-[var(--mist)] overflow-hidden rounded-lg">
                  {imgError ? <div className="absolute inset-0 flex items-center justify-center"><span className="text-xl text-[var(--stone)]">{accessory.title}</span></div> : <Image src={accessory.image} alt={accessory.title} fill className="object-cover" sizes="50vw" priority onError={() => setImgError(true)} unoptimized />}
                </div>
                <div className="absolute top-4 left-4"><span className="px-3 py-1.5 text-xs tracking-widest uppercase bg-[var(--crimson)] text-white">Accessory</span></div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="lg:py-8">
              <h1 className="text-4xl md:text-5xl text-[var(--ink)] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>{accessory.title}</h1>
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-3xl font-medium text-[var(--ink)]">{formatPrice(accessory.price)}</span>
                <span className="text-lg text-[var(--stone)] line-through">{formatPrice(accessory.originalPrice)}</span>
                <span className="px-2 py-1 text-xs tracking-wider bg-[var(--crimson)] text-white">SAVE {Math.round((1 - accessory.price / accessory.originalPrice) * 100)}%</span>
              </div>
              {accessory.description && <p className="text-lg text-[var(--stone)] leading-relaxed mb-8">{accessory.description}</p>}
              <div className="border-t border-b border-[var(--mist)] py-6 mb-8 space-y-3">
                {accessory.bladeMaterial && <div className="flex justify-between text-sm"><span className="text-[var(--stone)]">Material</span><span className="text-[var(--ink)]">{accessory.bladeMaterial}</span></div>}
                {accessory.handleMaterial && <div className="flex justify-between text-sm"><span className="text-[var(--stone)]">Handle Material</span><span className="text-[var(--ink)]">{accessory.handleMaterial}</span></div>}
                {accessory.bladeLength && <div className="flex justify-between text-sm"><span className="text-[var(--stone)]">Size</span><span className="text-[var(--ink)]">{accessory.bladeLength}</span></div>}
                {accessory.totalLength && <div className="flex justify-between text-sm"><span className="text-[var(--stone)]">Total Length</span><span className="text-[var(--ink)]">{accessory.totalLength}</span></div>}
                {accessory.weight && <div className="flex justify-between text-sm"><span className="text-[var(--stone)]">Weight</span><span className="text-[var(--ink)]">{accessory.weight}</span></div>}
                {accessory.series && <div className="flex justify-between text-sm"><span className="text-[var(--stone)]">Series</span><span className="text-[var(--ink)]">{accessory.series}</span></div>}
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
