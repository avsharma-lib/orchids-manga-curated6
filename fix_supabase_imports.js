const fs = require('fs');
let content = fs.readFileSync('src/lib/products-context.tsx', 'utf8');

// The original import might look like:
// import {
//   getCustomManga, getCustomBoxSets, getCustomActionFigures, getCustomKatanas,

content = content.replace(
  /import \{\n\s*getCustomManga, getCustomBoxSets, getCustomActionFigures, getCustomKatanas,/g,
  `import {\n  getCustomManga as getCustomProduct, getCustomBoxSets as getCustomTShirts, getCustomActionFigures as getCustomHoodies, getCustomKatanas as getCustomAccessorys,`
);

// If the previous replace already ruined it (which it did in patch_products_context.js):
content = content.replace(
  /getCustomManga/g, 'getCustomProduct'
);
content = content.replace(
  /getCustomBoxSets/g, 'getCustomTShirts'
);
content = content.replace(
  /getCustomActionFigures/g, 'getCustomHoodies'
);
content = content.replace(
  /getCustomKatanas/g, 'getCustomAccessorys'
);

// Now fix the import statement itself to alias them correctly from supabase.ts
content = content.replace(
  /import \{\n  getCustomProduct, getCustomTShirts, getCustomHoodies, getCustomAccessorys,/g,
  `import {\n  getCustomManga as getCustomProduct, getCustomBoxSets as getCustomTShirts, getCustomActionFigures as getCustomHoodies, getCustomKatanas as getCustomAccessorys,`
);

fs.writeFileSync('src/lib/products-context.tsx', content);
