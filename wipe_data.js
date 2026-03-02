const fs = require('fs');
const file = 'src/lib/product-data.ts';
let content = fs.readFileSync(file, 'utf8');

// Replace clothingProductInfo object with an empty one
content = content.replace(/export const clothingProductInfo: Record<string, ProductInfo> = \{[\s\S]*?\n\};/g, 'export const clothingProductInfo: Record<string, ProductInfo> = {};');

// Replace tShirtsData array with an empty one
content = content.replace(/export const tShirtsData: TShirt\[\] = \[[\s\S]*?\n\];/g, 'export const tShirtsData: TShirt[] = [];');

// Replace productCollection array with an empty one
content = content.replace(/export const productCollection: Product\[\] = \[[\s\S]*?\n\];/g, 'export const productCollection: Product[] = [];');

// Replace genres array with an empty one
content = content.replace(/export const genres = \[[\s\S]*?\n\];/g, 'export const genres = [];');

fs.writeFileSync(file, content);
