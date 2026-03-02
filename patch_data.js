const fs = require('fs');

let content = fs.readFileSync('src/lib/product-data.ts', 'utf8');

// Update Interfaces
content = content.replace(/export interface Manga/g, 'export interface Product');
content = content.replace(/export interface BoxSet/g, 'export interface TShirt');
content = content.replace(/mangaId/g, 'productId');
content = content.replace(/volumesIncluded/g, 'sizesAvailable');
content = content.replace(/volumes: number;/g, 'stock: number;');

// Update Variables
content = content.replace(/mangaCollection: Product\[\]/g, 'productCollection: Product[]');
content = content.replace(/mangaProductInfo/g, 'clothingProductInfo');
content = content.replace(/boxSetsData: TShirt\[\]/g, 'tShirtsData: TShirt[]');
content = content.replace(/mangaCollection =/g, 'productCollection: Product[] =');
content = content.replace(/boxSetsData =/g, 'tShirtsData: TShirt[] =');

// Update Mock Data text to clothing concepts (we'll just use sed for the generic parts below to change titles/descriptions safely)
content = content.replace(/volumes:/g, 'stock:');

// Change genres array
content = content.replace(/export const genres = \[[^\]]*\];/s, `export const genres = [
  'Streetwear',
  'Casual',
  'Formal',
  'Outerwear',
  'Activewear',
  'Essentials'
];`);

// Export functions
content = content.replace(/getFeaturedManga = \(\) => mangaCollection/g, 'getFeaturedProduct = () => productCollection');
content = content.replace(/getNewManga = \(\) => mangaCollection/g, 'getNewProduct = () => productCollection');
content = content.replace(/getMangaByGenre = \(genre: string\) => mangaCollection/g, 'getProductByGenre = (genre: string) => productCollection');
content = content.replace(/getMangaById = \(id: string\) => mangaCollection/g, 'getProductById = (id: string) => productCollection');

fs.writeFileSync('src/lib/product-data.ts', content);
