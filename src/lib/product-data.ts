export interface Product {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  genre: string[];
  rating: number;
  stock: number;
  status: 'ongoing' | 'completed';
  featured?: boolean;
  new?: boolean;
}

export interface ProductInfo {
  productType: string;
  publisher: string;
  stock: number;
  material: string;
  usage: string;
  isbn: string;
  weight: string;
  dimensions: string;
  sizes?: string[];
}

export interface TShirt {
  id: string;
  productId: string;
  title: string;
  description: string;
  image: string;
  price: number;
  originalPrice: number;
  sizesAvailable: string;
  publisher: string;
  weight: string;
  dimensions: string;
}

// Product information for each manga
export const clothingProductInfo: Record<string, ProductInfo> = {};

// Box sets data - only for manga that have official box sets
export const tShirtsData: TShirt[] = [];

export const getTShirtByProductId = (productId: string): TShirt | undefined => {
  return tShirtsData.find(b => b.productId === productId);
};

export const getTShirtsByProductId = (productId: string): TShirt[] => {
  return tShirtsData.filter(b => b.productId === productId);
};

export const getTShirtById = (id: string): TShirt | undefined => {
  return tShirtsData.find(b => b.id === id);
};

export const getProductInfo = (id: string): ProductInfo => {
  const manga = getProductById(id);
  return clothingProductInfo[id] || {
    productType: 'Books',
    publisher: '-',
    stock: manga?.stock || 0,
    material: 'Paper',
    usage: 'Reading',
    isbn: '-',
    weight: '-',
    dimensions: '-'
  };
};

// Curated manga collection
// Price Swap: Current price is the lower one, originalPrice is the higher one
export const productCollection: Product[] = [];

export const genres = [];

export const getFeaturedProduct = () => productCollection.filter(m => m.featured);
export const getNewProduct = () => productCollection.filter(m => m.new);
export const getProductByGenre = (genre: string) => productCollection.filter(m => m.genre.includes(genre));
export const getProductById = (id: string) => productCollection.find(m => m.id === id);

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};
