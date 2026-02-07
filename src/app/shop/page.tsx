'use client';

export const dynamic = 'force-dynamic';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { formatPrice } from '@/lib/manga-data';
import { useProducts } from '@/lib/products-context';
import MangaCard from '@/components/MangaCard';

type SortOption = 'popular' | 'price-low' | 'price-high' | 'title' | 'newest';

export default function ShopPage() {
  const searchParams = useSearchParams();
  const { allManga, allGenres } = useProducts();
  const initialGenre = searchParams.get('genre') || '';
  const initialFilter = searchParams.get('filter') || '';

  const [selectedGenre, setSelectedGenre] = useState(initialGenre);
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);
  const [specialFilter, setSpecialFilter] = useState(initialFilter);

  useEffect(() => {
    setSelectedGenre(searchParams.get('genre') || '');
    setSpecialFilter(searchParams.get('filter') || '');
  }, [searchParams]);

  const filteredManga = useMemo(() => {
    let result = [...allManga];

    // Special filters
    if (specialFilter === 'featured') {
      result = result.filter(m => m.featured);
    } else if (specialFilter === 'new') {
      result = result.filter(m => m.new);
    }

    // Genre filter
    if (selectedGenre) {
      result = result.filter(m => m.genre.includes(selectedGenre));
    }

    // Price filter
    result = result.filter(m => m.price >= priceRange[0] && m.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'newest':
        result = result.filter(m => m.new).concat(result.filter(m => !m.new));
        break;
      case 'popular':
      default:
        result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedGenre, sortBy, priceRange, specialFilter, allManga]);

  const clearFilters = () => {
    setSelectedGenre('');
    setSortBy('popular');
    setPriceRange([0, 5000]);
    setSpecialFilter('');
  };

  const hasActiveFilters = selectedGenre || sortBy !== 'popular' || priceRange[0] > 0 || priceRange[1] < 5000 || specialFilter;

  return (
    <div className="bg-[var(--paper)] pt-20">
      {/* Header */}
      <section className="py-16 border-b border-[var(--mist)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-[var(--crimson)] mb-3">
              The Collection
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl text-[var(--ink)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {specialFilter === 'featured' ? 'Featured Titles' : 
               specialFilter === 'new' ? 'New Arrivals' :
               selectedGenre ? selectedGenre : 'All Manga'}
            </h1>
            <p className="mt-4 text-[var(--stone)]">
              {filteredManga.length} {filteredManga.length === 1 ? 'title' : 'titles'} available
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-[var(--mist)] text-sm tracking-wider text-[var(--stone)] hover:border-[var(--ink)] hover:text-[var(--ink)] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </button>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-[var(--crimson)] hover:text-[var(--crimson-muted)] transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-[var(--stone)]">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 bg-transparent border border-[var(--mist)] text-sm text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none cursor-pointer"
              >
                <option value="popular">Popular</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>
          </div>

          {/* Expandable Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-12"
              >
                <div className="p-8 bg-[var(--paper-warm)] border border-[var(--mist)]">
                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Genre */}
                    <div>
                      <h3 className="text-sm tracking-widest uppercase text-[var(--stone)] mb-4">
                        Genre
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedGenre('')}
                          className={`px-3 py-1.5 text-xs tracking-wider transition-colors ${
                            selectedGenre === ''
                              ? 'bg-[var(--ink)] text-[var(--paper)]'
                              : 'bg-white border border-[var(--mist)] text-[var(--stone)] hover:border-[var(--ink)]'
                          }`}
                        >
                          All
                        </button>
                        {allGenres.map(genre => (
                          <button
                            key={genre}
                            onClick={() => setSelectedGenre(selectedGenre === genre ? '' : genre)}
                            className={`px-3 py-1.5 text-xs tracking-wider transition-colors ${
                              selectedGenre === genre
                                ? 'bg-[var(--ink)] text-[var(--paper)]'
                                : 'bg-white border border-[var(--mist)] text-[var(--stone)] hover:border-[var(--ink)]'
                            }`}
                          >
                            {genre}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <h3 className="text-sm tracking-widest uppercase text-[var(--stone)] mb-4">
                        Price Range
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                            className="w-24 px-3 py-2 bg-white border border-[var(--mist)] text-sm focus:border-[var(--ink)] focus:outline-none"
                            placeholder="Min"
                          />
                          <span className="text-[var(--stone)]">to</span>
                          <input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                            className="w-24 px-3 py-2 bg-white border border-[var(--mist)] text-sm focus:border-[var(--ink)] focus:outline-none"
                            placeholder="Max"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Special */}
                    <div>
                      <h3 className="text-sm tracking-widest uppercase text-[var(--stone)] mb-4">
                        Collection
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSpecialFilter('')}
                          className={`px-3 py-1.5 text-xs tracking-wider transition-colors ${
                            specialFilter === ''
                              ? 'bg-[var(--ink)] text-[var(--paper)]'
                              : 'bg-white border border-[var(--mist)] text-[var(--stone)] hover:border-[var(--ink)]'
                          }`}
                        >
                          All
                        </button>
                        <button
                          onClick={() => setSpecialFilter(specialFilter === 'featured' ? '' : 'featured')}
                          className={`px-3 py-1.5 text-xs tracking-wider transition-colors ${
                            specialFilter === 'featured'
                              ? 'bg-[var(--ink)] text-[var(--paper)]'
                              : 'bg-white border border-[var(--mist)] text-[var(--stone)] hover:border-[var(--ink)]'
                          }`}
                        >
                          Featured
                        </button>
                        <button
                          onClick={() => setSpecialFilter(specialFilter === 'new' ? '' : 'new')}
                          className={`px-3 py-1.5 text-xs tracking-wider transition-colors ${
                            specialFilter === 'new'
                              ? 'bg-[var(--ink)] text-[var(--paper)]'
                              : 'bg-white border border-[var(--mist)] text-[var(--stone)] hover:border-[var(--ink)]'
                          }`}
                        >
                          New Arrivals
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Filters Pills */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-8">
              {selectedGenre && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--ink)] text-[var(--paper)] text-xs tracking-wider">
                  {selectedGenre}
                  <button onClick={() => setSelectedGenre('')} className="hover:text-[var(--crimson-muted)]">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              {specialFilter && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--ink)] text-[var(--paper)] text-xs tracking-wider">
                  {specialFilter === 'featured' ? 'Featured' : 'New'}
                  <button onClick={() => setSpecialFilter('')} className="hover:text-[var(--crimson-muted)]">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Grid */}
          {filteredManga.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {filteredManga.map((manga, index) => (
                <MangaCard key={manga.id} manga={manga} index={index} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-[var(--stone)]">No manga found matching your filters.</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-sm text-[var(--crimson)] hover:text-[var(--crimson-muted)] underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
