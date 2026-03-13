'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  Manga, BoxSet, ProductInfo,
  mangaCollection, boxSetsData, mangaProductInfo, genres as staticGenres,
  formatPrice
} from '@/lib/manga-data';
import {
  getCustomManga, getCustomBoxSets, getCustomActionFigures, getCustomKatanas,
  CustomMangaRow, CustomBoxSetRow, CustomActionFigureRow, CustomKatanaRow
} from '@/lib/supabase';

export interface ActionFigure {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  brand: string;
  characterName: string;
  series: string;
  material: string;
  height: string;
  weight: string;
  dimensions: string;
}

export interface Katana {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  bladeMaterial: string;
  handleMaterial: string;
  bladeLength: string;
  totalLength: string;
  weight: string;
  series: string;
}

interface ProductsContextType {
  allManga: Manga[];
  allBoxSets: BoxSet[];
  allActionFigures: ActionFigure[];
  allKatanas: Katana[];
  allProductInfo: Record<string, ProductInfo>;
  allGenres: string[];
  getMangaById: (id: string) => Manga | undefined;
  getBoxSetById: (id: string) => BoxSet | undefined;
  getBoxSetsByMangaId: (mangaId: string) => BoxSet[];
  getProductInfo: (id: string) => ProductInfo;
  getFeaturedManga: () => Manga[];
  getNewManga: () => Manga[];
  getMangaByGenre: (genre: string) => Manga[];
  getActionFigureById: (id: string) => ActionFigure | undefined;
  getKatanaById: (id: string) => Katana | undefined;
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

function convertCustomActionFigure(row: CustomActionFigureRow): ActionFigure {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    price: row.price,
    originalPrice: row.original_price,
    image: row.image,
    brand: row.brand,
    characterName: row.character_name,
    series: row.series,
    material: row.material,
    height: row.height,
    weight: row.weight,
    dimensions: row.dimensions,
  };
}

function convertCustomKatana(row: CustomKatanaRow): Katana {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    price: row.price,
    originalPrice: row.original_price,
    image: row.image,
    bladeMaterial: row.blade_material,
    handleMaterial: row.handle_material,
    bladeLength: row.blade_length,
    totalLength: row.total_length,
    weight: row.weight,
    series: row.series,
  };
}

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [customManga, setCustomManga] = useState<Manga[]>([]);
  const [customBoxSets, setCustomBoxSets] = useState<BoxSet[]>([]);
  const [actionFigures, setActionFigures] = useState<ActionFigure[]>([]);
  const [katanas, setKatanas] = useState<Katana[]>([]);
  const [customProductInfo, setCustomProductInfo] = useState<Record<string, ProductInfo>>({});
  const [loaded, setLoaded] = useState(false);

  const refreshProducts = useCallback(async () => {
    try {
      const [mangaRows, boxSetRows, figureRows, katanaRows] = await Promise.all([
        getCustomManga(),
        getCustomBoxSets(),
        getCustomActionFigures(),
        getCustomKatanas(),
      ]);

      const convertedManga = mangaRows.map(convertCustomManga);
      setCustomManga(convertedManga);

      const convertedBoxSets = boxSetRows.map(convertCustomBoxSet);
      setCustomBoxSets(convertedBoxSets);

      setActionFigures(figureRows.map(convertCustomActionFigure));
      setKatanas(katanaRows.map(convertCustomKatana));

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

  const allManga = [...mangaCollection, ...customManga];
  const allBoxSets = [...boxSetsData, ...customBoxSets];
  const allProductInfo = { ...mangaProductInfo, ...customProductInfo };
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
  const getActionFigureByIdFn = (id: string) => actionFigures.find(f => f.id === id);
  const getKatanaByIdFn = (id: string) => katanas.find(k => k.id === id);

  return (
    <ProductsContext.Provider
      value={{
        allManga,
        allBoxSets,
        allActionFigures: actionFigures,
        allKatanas: katanas,
        allProductInfo,
        allGenres,
        getMangaById: getMangaByIdFn,
        getBoxSetById: getBoxSetByIdFn,
        getBoxSetsByMangaId: getBoxSetsByMangaIdFn,
        getProductInfo: getProductInfoFn,
        getFeaturedManga: getFeaturedMangaFn,
        getNewManga: getNewMangaFn,
        getMangaByGenre: getMangaByGenreFn,
        getActionFigureById: getActionFigureByIdFn,
        getKatanaById: getKatanaByIdFn,
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
