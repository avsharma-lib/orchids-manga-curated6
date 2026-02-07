'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  Manga, BoxSet, ProductInfo,
  mangaCollection, boxSetsData, mangaProductInfo, genres as staticGenres,
  formatPrice
} from '@/lib/manga-data';
import {
  getCustomManga, getCustomBoxSets,
  CustomMangaRow, CustomBoxSetRow
} from '@/lib/supabase';

interface ProductsContextType {
  allManga: Manga[];
  allBoxSets: BoxSet[];
  allProductInfo: Record<string, ProductInfo>;
  allGenres: string[];
  getMangaById: (id: string) => Manga | undefined;
  getBoxSetById: (id: string) => BoxSet | undefined;
  getBoxSetsByMangaId: (mangaId: string) => BoxSet[];
  getProductInfo: (id: string) => ProductInfo;
  getFeaturedManga: () => Manga[];
  getNewManga: () => Manga[];
  getMangaByGenre: (genre: string) => Manga[];
  refreshProducts: () => Promise<void>;
  loaded: boolean;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

function convertCustomManga(row: CustomMangaRow): Manga {
  return {
    id: row.id,
    title: row.title,
    author: row.author,
    description: row.description,
    price: row.price,
    originalPrice: row.original_price,
    image: row.image,
    genre: row.genre || [],
    rating: row.rating,
    volumes: row.volumes,
    status: row.status as 'ongoing' | 'completed',
    featured: row.featured,
    new: row.is_new,
  };
}

function convertCustomBoxSet(row: CustomBoxSetRow): BoxSet {
  return {
    id: row.id,
    mangaId: row.manga_id || '',
    title: row.title,
    description: row.description,
    image: row.image,
    price: row.price,
    originalPrice: row.original_price,
    volumesIncluded: row.volumes_included,
    publisher: row.publisher,
    weight: row.weight,
    dimensions: row.dimensions,
  };
}

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [customManga, setCustomManga] = useState<Manga[]>([]);
  const [customBoxSets, setCustomBoxSets] = useState<BoxSet[]>([]);
  const [customProductInfo, setCustomProductInfo] = useState<Record<string, ProductInfo>>({});
  const [loaded, setLoaded] = useState(false);

  const refreshProducts = useCallback(async () => {
    try {
      const [mangaRows, boxSetRows] = await Promise.all([
        getCustomManga(),
        getCustomBoxSets(),
      ]);

      const convertedManga = mangaRows.map(convertCustomManga);
      setCustomManga(convertedManga);

      const convertedBoxSets = boxSetRows.map(convertCustomBoxSet);
      setCustomBoxSets(convertedBoxSets);

      const info: Record<string, ProductInfo> = {};
      for (const row of mangaRows) {
        if (row.product_info) {
          info[row.id] = {
            productType: row.product_info.productType || 'Books',
            publisher: row.product_info.publisher || '-',
            volumes: row.volumes,
            material: row.product_info.material || 'Paper',
            usage: row.product_info.usage || 'Reading',
            isbn: row.product_info.isbn || '-',
            weight: row.product_info.weight || '-',
            dimensions: row.product_info.dimensions || '-',
          };
        }
      }
      setCustomProductInfo(info);
    } catch (err) {
      console.error('Failed to load custom products:', err);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  // Merge static + custom (custom appended at the end)
  const allManga = [...mangaCollection, ...customManga];
  const allBoxSets = [...boxSetsData, ...customBoxSets];
  const allProductInfo = { ...mangaProductInfo, ...customProductInfo };

  // Build genre list from all manga
  const allGenres = Array.from(
    new Set([...staticGenres, ...customManga.flatMap(m => m.genre)])
  ).sort();

  const getMangaByIdFn = (id: string) => allManga.find(m => m.id === id);
  const getBoxSetByIdFn = (id: string) => allBoxSets.find(b => b.id === id);
  const getBoxSetsByMangaIdFn = (mangaId: string) => allBoxSets.filter(b => b.mangaId === mangaId);
  const getProductInfoFn = (id: string): ProductInfo => {
    const manga = getMangaByIdFn(id);
    return allProductInfo[id] || {
      productType: 'Books',
      publisher: '-',
      volumes: manga?.volumes || 0,
      material: 'Paper',
      usage: 'Reading',
      isbn: '-',
      weight: '-',
      dimensions: '-',
    };
  };
  const getFeaturedMangaFn = () => allManga.filter(m => m.featured);
  const getNewMangaFn = () => allManga.filter(m => m.new);
  const getMangaByGenreFn = (genre: string) => allManga.filter(m => m.genre.includes(genre));

  return (
    <ProductsContext.Provider
      value={{
        allManga,
        allBoxSets,
        allProductInfo,
        allGenres,
        getMangaById: getMangaByIdFn,
        getBoxSetById: getBoxSetByIdFn,
        getBoxSetsByMangaId: getBoxSetsByMangaIdFn,
        getProductInfo: getProductInfoFn,
        getFeaturedManga: getFeaturedMangaFn,
        getNewManga: getNewMangaFn,
        getMangaByGenre: getMangaByGenreFn,
        refreshProducts,
        loaded,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}
