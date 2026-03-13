import type { Product, ProductInfo, TShirt } from '@/lib/product-data';

export type CatalogCollections = {
  allProducts: Array<Pick<Product, 'id'>>;
  allTShirts: Array<Pick<TShirt, 'id'>>;
  allHoodies: Array<{ id: string }>;
  allAccessories: Array<{ id: string }>;
};

const CART_VARIANT_PATTERNS = [/-size-[^-]+$/i, /-vols-\d+-\d+$/i, /-vol-\d+$/i];

function normalizeTextValue(value?: string | null) {
  return typeof value === 'string' ? value.trim() : '';
}

export function normalizeCatalogItemId(id?: string | null) {
  let normalizedId = normalizeTextValue(id);

  for (const pattern of CART_VARIANT_PATTERNS) {
    normalizedId = normalizedId.replace(pattern, '');
  }

  return normalizedId;
}

export function normalizePublisher(value?: string | null) {
  return normalizeTextValue(value) || 'Inkai';
}

export function normalizeMaterial(value?: string | null) {
  const material = normalizeTextValue(value);
  if (!material) return 'Cotton';

  switch (material.toLowerCase()) {
    case 'paper':
    case 'pvc':
      return 'Cotton';
    default:
      return material;
  }
}

export function buildProductInfo(productInfo?: Partial<ProductInfo>, stock = 0): ProductInfo {
  return {
    productType: productInfo?.productType || 'Apparel',
    publisher: normalizePublisher(productInfo?.publisher),
    stock,
    material: normalizeMaterial(productInfo?.material),
    usage: normalizeTextValue(productInfo?.usage) || 'Wear',
    isbn: normalizeTextValue(productInfo?.isbn) || '-',
    weight: normalizeTextValue(productInfo?.weight) || '-',
    dimensions: normalizeTextValue(productInfo?.dimensions) || '-',
    sizes: Array.isArray(productInfo?.sizes) ? productInfo.sizes : [],
    media: Array.isArray(productInfo?.media) ? productInfo.media : [],
  };
}

export function resolveCatalogPath(id: string, collections: CatalogCollections) {
  const normalizedId = normalizeCatalogItemId(id);

  if (collections.allProducts.some(product => product.id === normalizedId)) {
    return `/product/${normalizedId}`;
  }

  if (collections.allTShirts.some(tShirt => tShirt.id === normalizedId)) {
    return `/t-shirt/${normalizedId}`;
  }

  if (collections.allHoodies.some(hoodie => hoodie.id === normalizedId)) {
    return `/hoodies/${normalizedId}`;
  }

  if (collections.allAccessories.some(accessory => accessory.id === normalizedId)) {
    return `/accessories/${normalizedId}`;
  }

  return `/product/${normalizedId}`;
}
