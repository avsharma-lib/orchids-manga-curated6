'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Manga, formatPrice } from '@/lib/manga-data';
import { useCart } from '@/lib/cart-context';
import { useState } from 'react';

interface MangaCardProps {
  manga: Manga;
  index?: number;
}

export default function MangaCard({ manga, index = 0 }: MangaCardProps) {
  const { addToCart } = useCart();
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
  className="group relative"
>
>
  <div className="relative">
    <Link href={`/manga/${manga.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[2/3] overflow-hidden bg-[var(--mist)]">
          {imgError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--mist)]">
              <span className="text-sm text-[var(--stone)] text-center px-4" style={{ fontFamily: 'var(--font-heading)' }}>
                {manga.title}
              </span>
            </div>
          ) : (
            <Image
              src={manga.image}
              alt={manga.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              onError={() => setImgError(true)}
              unoptimized
            />
          )}
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-[var(--ink)]/0 group-hover:bg-[var(--ink)]/20 transition-colors duration-500" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {manga.new && (
              <span className="px-2 py-1 text-[10px] tracking-widest uppercase bg-[var(--crimson)] text-white">
                New
              </span>
            )}
            {manga.featured && (
              <span className="px-2 py-1 text-[10px] tracking-widest uppercase bg-[var(--ink)] text-white">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="mt-4 space-y-1">
          <p className="text-xs text-[var(--stone)] tracking-wide">
            {manga.author}
          </p>
          <h3
            className="text-base text-[var(--ink)] line-clamp-1 group-hover:text-[var(--crimson)] transition-colors duration-300"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {manga.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[var(--ink)]">
              {formatPrice(manga.price)}
            </span>
            <span className="text-xs text-[var(--stone)] line-through">
              {formatPrice(manga.originalPrice)}
            </span>
          </div>
        </div>
      </Link>

      {/* Quick Add Button OUTSIDE LINK */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ scale: 1.02 }}
        className="absolute bottom-4 left-4 right-4 py-3 bg-[var(--paper)] text-[var(--ink)] text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addToCart(manga);
        }}
      >
        Add to Cart
      </motion.button>
    </div>
  </motion.article>
  );
}
