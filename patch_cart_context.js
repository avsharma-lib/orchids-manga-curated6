const fs = require('fs');

let content = fs.readFileSync('src/lib/cart-context.tsx', 'utf8');

content = content.replace(/manga-data/g, 'product-data');
content = content.replace(/Manga/g, 'Product');
content = content.replace(/mangaId/g, 'productId');
content = content.replace(/manga:/g, 'product:');
content = content.replace(/manga\./g, 'product.');
content = content.replace(/addToCart: \(product: Product\) => void;/g, 'addToCart: (product: Product) => void;');
content = content.replace(/removeFromCart: \(productId: string\) => void;/g, 'removeFromCart: (productId: string) => void;');
content = content.replace(/updateQuantity: \(productId: string, quantity: number\) => void;/g, 'updateQuantity: (productId: string, quantity: number) => void;');

content = content.replace(/const addToCart = \(product: Product\) => {/g, 'const addToCart = (product: Product) => {');
content = content.replace(/const removeFromCart = \(productId: string\) => {/g, 'const removeFromCart = (productId: string) => {');
content = content.replace(/const updateQuantity = \(productId: string, quantity: number\) => {/g, 'const updateQuantity = (productId: string, quantity: number) => {');

content = content.replace(/i\.product\.id === product\.id/g, 'i.product.id === product.id');
content = content.replace(/i\.product\.id !== productId/g, 'i.product.id !== productId');
content = content.replace(/i\.product\.id === productId/g, 'i.product.id === productId');


fs.writeFileSync('src/lib/cart-context.tsx', content);
