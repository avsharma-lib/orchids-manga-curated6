'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  Product, TShirt, ProductInfo,
  productCollection, tShirtsData, clothingProductInfo, genres as staticGenres,
  formatPrice
} from '@/lib/product-data';
import { buildProductInfo, normalizeCatalogItemId, normalizeMaterial, normalizePublisher } from '@/lib/catalog-utils';
import {
  getCustomManga as getCustomProduct, getCustomBoxSets as getCustomTShirts, getCustomActionFigures as getCustomHoodies, getCustomKatanas as getCustomAccessorys,
  CustomMangaRow, CustomBoxSetRow, CustomActionFigureRow, CustomKatanaRow
} from '@/lib/supabase';

export interface Hoodie {
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

export interface Accessory {
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
  allProducts: Product[];
  allTShirts: TShirt[];
  allHoodies: Hoodie[];
  allAccessories: Accessory[];
  allProductInfo: Record<string, ProductInfo>;
  allGenres: string[];
  getProductById: (id: string) => Product | undefined;
  getTShirtById: (id: string) => TShirt | undefined;
  getTShirtsByProductId: (productId: string) => TShirt[];
  getProductInfo: (id: string) => ProductInfo;
  getFeaturedProduct: () => Product[];
  getNewProduct: () => Product[];
  getProductByGenre: (genre: string) => Product[];
  getHoodieById: (id: string) => Hoodie | undefined;
  getAccessoryById: (id: string) => Accessory | undefined;
  refreshProducts: () => Promise<void>;
  loaded: boolean;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

function convertCustomProduct(row: CustomMangaRow): Product {
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
    stock: row.volumes,
    status: row.status as 'ongoing' | 'completed',
    featured: row.featured,
    new: row.is_new,
  };
}

function convertCustomTShirt(row: CustomBoxSetRow): TShirt {
  return {
    id: row.id,
    productId: row.manga_id || '',
    title: row.title,
    description: row.description,
    image: row.image,
    price: row.price,
    originalPrice: row.original_price,
    sizesAvailable: row.volumes_included,
    publisher: normalizePublisher(row.publisher),
    weight: row.weight,
    dimensions: row.dimensions,
  };
}

function convertCustomHoodie(row: CustomActionFigureRow): Hoodie {
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
    material: normalizeMaterial(row.material),
    height: row.height,
    weight: row.weight,
    dimensions: row.dimensions,
  };
}

function convertCustomAccessory(row: CustomKatanaRow): Accessory {
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
  const [customProduct, setCustomProduct] = useState<Product[]>([]);
  const [customTShirts, setCustomTShirts] = useState<TShirt[]>([]);
  const [hoodies, setHoodies] = useState<Hoodie[]>([]);
  const [accessories, setAccessorys] = useState<Accessory[]>([]);
  const [customProductInfo, setCustomProductInfo] = useState<Record<string, ProductInfo>>({});
  const [loaded, setLoaded] = useState(false);

  const refreshProducts = useCallback(async () => {
    try {
      const [mangaRows, boxSetRows, figureRows, katanaRows] = await Promise.all([
        getCustomProduct(),
        getCustomTShirts(),
        getCustomHoodies(),
        getCustomAccessorys(),
      ]);

      const convertedProduct = mangaRows.map(convertCustomProduct);
      setCustomProduct(convertedProduct);

      const convertedTShirts = boxSetRows.map(convertCustomTShirt);
      setCustomTShirts(convertedTShirts);

      setHoodies(figureRows.map(convertCustomHoodie));
      setAccessorys(katanaRows.map(convertCustomAccessory));

      const info: Record<string, ProductInfo> = {};
      for (const row of mangaRows) {
        let productInfoObj = row.product_info as any;
        if (typeof row.product_info === 'string') {
          try {
            productInfoObj = JSON.parse(row.product_info);
          } catch (e) {
            console.error('Failed to parse product_info for row', row.id);
            productInfoObj = {};
          }
        }

        if (productInfoObj) {
          info[row.id] = buildProductInfo(productInfoObj, row.volumes);
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

  const allProducts = [...productCollection, ...customProduct];
  const allTShirts = [...tShirtsData, ...customTShirts];
  const allProductInfo = { ...clothingProductInfo, ...customProductInfo };
  const allGenres = Array.from(
    new Set([...staticGenres, ...customProduct.flatMap(m => m.genre)])
  ).sort();

  const getProductByIdFn = (id: string) => allProducts.find(m => m.id === normalizeCatalogItemId(id));
  const getTShirtByIdFn = (id: string) => allTShirts.find(b => b.id === normalizeCatalogItemId(id));
  const getTShirtsByProductIdFn = (productId: string) => allTShirts.filter(b => b.productId === normalizeCatalogItemId(productId));
  const getProductInfoFn = (id: string): ProductInfo => {
    const normalizedId = normalizeCatalogItemId(id);
    const manga = getProductByIdFn(normalizedId);
    return buildProductInfo(allProductInfo[normalizedId], manga?.stock || 0);
  };
  const getFeaturedProductFn = () => allProducts.filter(m => m.featured);
  const getNewProductFn = () => allProducts.filter(m => m.new);
  const getProductByGenreFn = (genre: string) => allProducts.filter(m => m.genre.includes(genre));
  const getHoodieByIdFn = (id: string) => hoodies.find(f => f.id === normalizeCatalogItemId(id));
  const getAccessoryByIdFn = (id: string) => accessories.find(k => k.id === normalizeCatalogItemId(id));

  return (
    <ProductsContext.Provider
      value={{
        allProducts,
        allTShirts,
        allHoodies: hoodies,
        allAccessories: accessories,
        allProductInfo,
        allGenres,
        getProductById: getProductByIdFn,
        getTShirtById: getTShirtByIdFn,
        getTShirtsByProductId: getTShirtsByProductIdFn,
        getProductInfo: getProductInfoFn,
        getFeaturedProduct: getFeaturedProductFn,
        getNewProduct: getNewProductFn,
        getProductByGenre: getProductByGenreFn,
        getHoodieById: getHoodieByIdFn,
        getAccessoryById: getAccessoryByIdFn,
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
