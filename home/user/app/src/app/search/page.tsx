'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import { useProducts } from '@/lib/products-context';

type ResultItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  type: 'manga' | 'box-set' | 'action-figure' | 'katana';
  href: string;
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const { manga, boxSets, actionFigures, katanas } = useProducts();

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setQuery(q);
  }, [searchParams]);

  const allItems = useMemo<ResultItem[]>(() => {
    const items: ResultItem[] = [];
    manga.forEach((m: any) => items.push({
      id: m.id, title: m.title, price: m.price, image: m.image,
      type: 'manga', href: `/manga/${m.id}`
    }));
    boxSets.forEach((b: any) => items.push({
      id: b.id, title: b.title, price: b.price, image: b.image,
      type: 'box-set', href: `/box-sets/${b.id}`
    }));
    actionFigures.forEach((a: any) => items.push({
      id: a.id, title: a.title, price: a.price, image: a.image,
      type: 'action-figure', href: `/action-figures/${a.id}`
    }));
    katanas.forEach((k: any) => items.push({
      id: k.id, title: k.title, price: k.price, image: k.image,
      type: 'katana', href: `/katanas/${k.id}`
    }));
    return items;
  }, [manga, boxSets, actionFigures, katanas]);

  const filtered = useMemo(() => {
    if (!query.trim()) return allItems;
    const q = query.toLowerCase();
    return allItems.filter(item => item.title.toLowerCase().includes(q));
  }, [query, allItems]);

  const sections = [
    { key: 'manga', label: 'Manga', items: filtered.filter(i => i.type === 'manga') },
    { key: 'box-set', label: 'Box Sets', items: filtered.filter(i => i.type === 'box-set') },
    { key: 'action-figure', label: 'Action Figures', items: filtered.filter(i => i.type === 'action-figure') },
    { key: 'katana', label: 'Katanas', items: filtered.filter(i => i.type === 'katana') },
  ];

  const typeColors: Record<string, string> = {
    manga: 'bg-blue-100 text-blue-700',
    'box-set': 'bg-purple-100 text-purple-700',
    'action-figure': 'bg-green-100 text-green-700',
    katana: 'bg-red-100 text-red-700',
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--paper)] pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {/* Search Input */}
          <div className="mb-12">
            <div className="relative max-w-2xl mx-auto">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--stone)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search manga, box sets, action figures, katanas..."
                autoFocus
                className="w-full pl-12 pr-4 py-4 text-lg bg-white border border-[var(--mist)] rounded-xl focus:outline-none focus:border-[var(--crimson)] focus:ring-1 focus:ring-[var(--crimson)] transition-all"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--stone)] hover:text-[var(--ink)]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <p className="text-center text-sm text-[var(--stone)] mt-3">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''} {query ? `for "${query}"` : 'total'}
            </p>
          </div>

          {/* Category filters */}
          {!query && (
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {sections.filter(s => s.items.length > 0).map(section => (
                <button
                  key={section.key}
                  onClick={() => {
                    const el = document.getElementById(`search-${section.key}`);
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2 rounded-full border border-[var(--mist)] text-sm tracking-wider text-[var(--stone)] hover:border-[var(--crimson)] hover:text-[var(--crimson)] transition-all"
                >
                  {section.label} ({section.items.length})
                </button>
              ))}
            </div>
          )}

          {/* Results by section */}
          {sections.map(section => {
            if (section.items.length === 0) return null;
            return (
              <div key={section.key} id={`search-${section.key}`} className="mb-16">
                <h2 className="text-2xl font-light tracking-wider mb-6 pb-3 border-b border-[var(--mist)]" style={{ fontFamily: 'var(--font-heading)' }}>
                  {section.label}
                  <span className="text-sm text-[var(--stone)] ml-3">({section.items.length})</span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {section.items.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <Link href={item.href} className="group block">
                        <div className="relative aspect-[3/4] bg-[var(--silk)] rounded-lg overflow-hidden mb-2">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                          />
                          <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-medium ${typeColors[item.type]}`}>
                            {section.label}
                          </span>
                        </div>
                        <h3 className="text-sm font-medium line-clamp-2 group-hover:text-[var(--crimson)] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[var(--crimson)] mt-1">Rs. {item.price.toLocaleString()}</p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && query && (
            <div className="text-center py-20">
              <svg className="w-16 h-16 mx-auto text-[var(--mist)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-lg text-[var(--stone)]">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-sm text-[var(--stone)] mt-2">Try a different search term</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
