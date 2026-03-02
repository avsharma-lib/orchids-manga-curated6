const fs = require('fs');
let content = fs.readFileSync('src/lib/products-context.tsx', 'utf8');

content = content.replace(
  /getCustomProduct as getCustomProduct, getCustomTShirts as getCustomTShirts, getCustomHoodies as getCustomHoodies, getCustomAccessorys as getCustomAccessorys,/g,
  `getCustomManga as getCustomProduct, getCustomBoxSets as getCustomTShirts, getCustomActionFigures as getCustomHoodies, getCustomKatanas as getCustomAccessorys,`
);
content = content.replace(
  /CustomProductRow/g, 'CustomMangaRow'
);
content = content.replace(
  /CustomTShirtRow/g, 'CustomBoxSetRow'
);
content = content.replace(
  /CustomHoodieRow/g, 'CustomActionFigureRow'
);
content = content.replace(
  /CustomAccessoryRow/g, 'CustomKatanaRow'
);

fs.writeFileSync('src/lib/products-context.tsx', content);
