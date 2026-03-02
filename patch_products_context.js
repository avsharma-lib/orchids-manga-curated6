const fs = require('fs');

let content = fs.readFileSync('src/lib/products-context.tsx', 'utf8');

content = content.replace(/manga-data/g, 'product-data');
content = content.replace(/import {\n  Manga, BoxSet, ProductInfo,\n  mangaCollection, boxSetsData, mangaProductInfo, genres as staticGenres,\n  formatPrice\n} from '@\/lib\/product-data';/g, `import {
  Product, TShirt, ProductInfo,
  productCollection, tShirtsData, clothingProductInfo, genres as staticGenres,
  formatPrice
} from '@/lib/product-data';`);

content = content.replace(/Manga/g, 'Product');
content = content.replace(/BoxSet/g, 'TShirt');

content = content.replace(/mangaCollection/g, 'productCollection');
content = content.replace(/boxSetsData/g, 'tShirtsData');
content = content.replace(/mangaProductInfo/g, 'clothingProductInfo');

content = content.replace(/allManga/g, 'allProducts');
content = content.replace(/allBoxSets/g, 'allTShirts');
content = content.replace(/allActionFigures/g, 'allHoodies');
content = content.replace(/allKatanas/g, 'allAccessories');

content = content.replace(/getMangaById/g, 'getProductById');
content = content.replace(/getBoxSetById/g, 'getTShirtById');
content = content.replace(/getBoxSetsByMangaId/g, 'getTShirtsByProductId');
content = content.replace(/getFeaturedManga/g, 'getFeaturedProduct');
content = content.replace(/getNewManga/g, 'getNewProduct');
content = content.replace(/getMangaByGenre/g, 'getProductByGenre');
content = content.replace(/getActionFigureById/g, 'getHoodieById');
content = content.replace(/getKatanaById/g, 'getAccessoryById');

content = content.replace(/customManga/g, 'customProducts');
content = content.replace(/customBoxSets/g, 'customTShirts');
content = content.replace(/actionFigures/g, 'hoodies');
content = content.replace(/katanas/g, 'accessories');

content = content.replace(/convertCustomManga/g, 'convertCustomProduct');
content = content.replace(/convertCustomBoxSet/g, 'convertCustomTShirt');
content = content.replace(/convertCustomActionFigure/g, 'convertCustomHoodie');
content = content.replace(/convertCustomKatana/g, 'convertCustomAccessory');

content = content.replace(/ActionFigure/g, 'Hoodie');
content = content.replace(/Katana/g, 'Accessory');

content = content.replace(/mangaId/g, 'productId');
content = content.replace(/volumesIncluded/g, 'sizesAvailable');

content = content.replace(/volumes/g, 'stock'); // volumes -> stock

fs.writeFileSync('src/lib/products-context.tsx', content);
