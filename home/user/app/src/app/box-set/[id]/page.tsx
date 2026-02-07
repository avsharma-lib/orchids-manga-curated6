'use client';

import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { use, useState } from 'react';
import { formatPrice } from '@/lib/manga-data';
import { useProducts } from '@/lib/products-context';
import { useCart } from '@/lib/cart-context';

export default function BoxSetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getBoxSetById, getMangaById, allBoxSets } = useProducts();
  const boxSet = getBoxSetById(id);
  const router = useRouter();
  const { addToCart } = useCart();
  const [imgError, setImgError] = useState(false);

  if (!boxSet) {
    notFound();
  }

  const relatedManga = getMangaById(boxSet.mangaId);

  const handleAddToCart = () => {
    addToCart({
      id: boxSet.id,
      title: boxSet.title,
      author: relatedManga?.author || 'Various',
      description: boxSet.description,
      price: boxSet.price,
      originalPrice: boxSet.originalPrice,
      image: boxSet.image,
      genre: relatedManga?.genre || ['Manga'],
      rating: relatedManga?.rating || 4.5,
      volumes: 1,
      status: 'completed',
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  // Get other box sets for related section
  const otherBoxSets = allBoxSets.filter(b => b.id !== boxSet.id).slice(0, 4);

  return (
    <div className="bg-[var(--paper)] pt-20">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-6">
        <nav className="flex items-center gap-2 text-sm text-[var(--stone)]">
          <Link href="/" className="hover:text-[var(--ink)] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[var(--ink)] transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-[var(--ink)]">{boxSet.title}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="sticky top-32">
                <div className="relative aspect-[4/3] bg-[var(--mist)] overflow-hidden rounded-lg">
                  {imgError ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-[var(--mist)]">
                      <span className="text-xl text-[var(--stone)] text-center px-4" style={{ fontFamily: 'var(--font-heading)' }}>
                        {boxSet.title}
                      </span>
                    </div>
                  ) : (
                    <Image
                      src={boxSet.image}
                      alt={boxSet.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                      onError={() => setImgError(true)}
                      unoptimized
                    />
                  )}
                </div>
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 text-xs tracking-widest uppercase bg-[var(--crimson)] text-white">
                    Box Set
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:py-8"
            >
              <p className="text-sm tracking-wider text-[var(--crimson)] mb-2">
                COMPLETE COLLECTION
              </p>
              <h1
                className="text-4xl md:text-5xl lg:text-5xl text-[var(--ink)] mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {boxSet.title}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-3xl font-medium text-[var(--ink)]">
                  {formatPrice(boxSet.price)}
                </span>
                <span className="text-lg text-[var(--stone)] line-through">
                  {formatPrice(boxSet.originalPrice)}
                </span>
                <span className="px-2 py-1 text-xs tracking-wider bg-[var(--crimson)] text-white">
                  SAVE {Math.round((1 - boxSet.price / boxSet.originalPrice) * 100)}%
                </span>
              </div>

              {/* Description */}
              <p className="text-lg text-[var(--stone)] leading-relaxed mb-8">
                {boxSet.description}
              </p>

              {/* Service Info Box */}
              <div className="border border-[var(--mist)] rounded-lg p-6 mb-8">
                <div className="grid grid-cols-3 gap-4">
                  {/* Cash on Delivery */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 mb-2 flex items-center justify-center">
                      <svg className="w-8 h-8 text-[var(--ink)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-[var(--ink)]">Cash on Delivery</span>
                  </div>
                  
                  {/* 3 Days Return */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 mb-2 flex items-center justify-center">
                      <svg className="w-8 h-8 text-[var(--ink)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-[var(--ink)]">3 days Return</span>
                    <span className="text-xs text-[var(--stone)]">(Wrong/damaged items only)</span>
                  </div>
                  
                  {/* Free Delivery */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 mb-2 flex items-center justify-center">
                      <svg className="w-8 h-8 text-[var(--ink)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-[var(--ink)]">Free Delivery</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-[var(--mist)] text-center">
                  <span className="text-sm text-[var(--stone)]">Get it delivered in 4-9 days</span>
                </div>
              </div>

              {/* Details List */}
              <div className="border-t border-b border-[var(--mist)] py-6 mb-8 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--stone)]">Volumes Included</span>
                  <span className="text-[var(--ink)]">{boxSet.volumesIncluded}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--stone)]">Publisher</span>
                  <span className="text-[var(--ink)]">{boxSet.publisher}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--stone)]">Weight</span>
                  <span className="text-[var(--ink)]">{boxSet.weight}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--stone)]">Dimensions</span>
                  <span className="text-[var(--ink)]">{boxSet.dimensions}</span>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="group w-full py-4 bg-[var(--ink)] text-[var(--paper)] text-sm tracking-widest uppercase hover:bg-[var(--charcoal)] transition-all duration-300 flex items-center justify-center gap-3 rounded-sm"
              >
                <svg 
                  className="w-6 h-6 transition-transform group-hover:scale-110" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                Add to Cart
              </button>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                className="w-full mt-3 py-4 bg-[var(--crimson)] text-white text-sm tracking-widest uppercase hover:bg-[var(--crimson)]/90 transition-colors duration-300"
              >
                Buy Now
              </button>

              {/* View Individual Manga */}
              {relatedManga && (
                <Link
                  href={`/manga/${relatedManga.id}`}
                  className="block w-full mt-4 p-4 border-2 border-[var(--mist)] rounded-lg hover:border-[var(--ink)] transition-colors group text-center"
                >
                  <span className="text-sm tracking-wider text-[var(--stone)] group-hover:text-[var(--ink)] transition-colors">
                    Or buy individual volumes of {relatedManga.title}
                  </span>
                </Link>
              )}

              {/* Product Information Table */}
              <div className="mt-10 border border-[var(--mist)] rounded-lg overflow-hidden">
                <h3 className="text-lg font-medium text-[var(--ink)] px-6 py-4 bg-[var(--paper-warm)]" style={{ fontFamily: 'var(--font-heading)' }}>
                  Product Information
                </h3>
                <div className="divide-y divide-[var(--mist)]">
                  <div className="flex px-6 py-3">
                    <span className="w-1/2 text-sm text-[var(--stone)]">Product Type</span>
                    <span className="w-1/2 text-sm text-[var(--ink)]">Box Set</span>
                  </div>
                  <div className="flex px-6 py-3">
                    <span className="w-1/2 text-sm text-[var(--stone)]">Series</span>
                    <span className="w-1/2 text-sm text-[var(--ink)]">{relatedManga?.title || 'Various'}</span>
                  </div>
                  <div className="flex px-6 py-3">
                    <span className="w-1/2 text-sm text-[var(--stone)]">Author</span>
                    <span className="w-1/2 text-sm text-[var(--ink)]">{relatedManga?.author || 'Various'}</span>
                  </div>
                  <div className="flex px-6 py-3">
                    <span className="w-1/2 text-sm text-[var(--stone)]">Publisher</span>
                    <span className="w-1/2 text-sm text-[var(--ink)]">{boxSet.publisher}</span>
                  </div>
                  <div className="flex px-6 py-3">
                    <span className="w-1/2 text-sm text-[var(--stone)]">Volumes Included</span>
                    <span className="w-1/2 text-sm text-[var(--ink)]">{boxSet.volumesIncluded}</span>
                  </div>
                  <div className="flex px-6 py-3">
                    <span className="w-1/2 text-sm text-[var(--stone)]">Material</span>
                    <span className="w-1/2 text-sm text-[var(--ink)]">Paper</span>
                  </div>
                  <div className="flex px-6 py-3">
                    <span className="w-1/2 text-sm text-[var(--stone)]">Weight</span>
                    <span className="w-1/2 text-sm text-[var(--ink)]">{boxSet.weight}</span>
                  </div>
                  <div className="flex px-6 py-3">
                    <span className="w-1/2 text-sm text-[var(--stone)]">Dimensions</span>
                    <span className="w-1/2 text-sm text-[var(--ink)]">{boxSet.dimensions}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Other Box Sets */}
      {otherBoxSets.length > 0 && (
        <section className="py-24 bg-[var(--paper-warm)]">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <h2
              className="text-3xl md:text-4xl text-[var(--ink)] mb-12"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Other Box Sets
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {otherBoxSets.map((bs, index) => (
                <motion.div
                  key={bs.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/box-set/${bs.id}`} className="group block">
                    <div className="relative aspect-[4/3] bg-[var(--mist)] overflow-hidden rounded-lg mb-4">
                      <Image
                        src={bs.image}
                        alt={bs.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        unoptimized
                      />
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 text-[10px] tracking-widest uppercase bg-[var(--crimson)] text-white">
                          Box Set
                        </span>
                      </div>
                    </div>
                    <h3 className="text-sm font-medium text-[var(--ink)] mb-1 group-hover:text-[var(--crimson)] transition-colors line-clamp-2">
                      {bs.title}
                    </h3>
                    <p className="text-xs text-[var(--stone)] mb-2">{bs.volumesIncluded}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-medium text-[var(--ink)]">{formatPrice(bs.price)}</span>
                      <span className="text-xs text-[var(--stone)] line-through">{formatPrice(bs.originalPrice)}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
