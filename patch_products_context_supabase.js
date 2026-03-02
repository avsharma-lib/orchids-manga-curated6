const fs = require('fs');

let content = fs.readFileSync('src/lib/products-context.tsx', 'utf8');

// Undo the supabase function name changes in products-context to match supabase.ts which we did not change to avoid DB schema mismatches.
content = content.replace(/import {\n  getCustomProduct, getCustomTShirts, getCustomHoodies, getCustomAccessorys,/g, `import {\n  getCustomManga as getCustomProduct, getCustomBoxSets as getCustomTShirts, getCustomActionFigures as getCustomHoodies, getCustomKatanas as getCustomAccessorys,`);
content = content.replace(/getCustomProduct\(\)/g, 'getCustomProduct()'); // these are local aliases now
content = content.replace(/getCustomTShirts\(\)/g, 'getCustomTShirts()');
content = content.replace(/getCustomHoodies\(\)/g, 'getCustomHoodies()');
content = content.replace(/getCustomAccessorys\(\)/g, 'getCustomAccessorys()');

// Also fix productCollection in product-data.ts which might not have exported properly.
fs.writeFileSync('src/lib/products-context.tsx', content);
