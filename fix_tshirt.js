const fs = require('fs');
let file = 'src/app/admin/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Fix AddBoxSetTab (T-Shirt) validation
content = content.replace(
  "if (!form.title || !form.price) { setError('Fill required fields'); return; }",
  "if (!form.title || !form.price) { setError('Fill required title and price'); return; }"
);
content = content.replace(
  "await addCustomBoxSet({ id: form.id || generateId(form.title), manga_id: form.mangaId || null, title: form.title, description: form.description, image: form.image, price: parseInt(form.price), original_price: parseInt(form.originalPrice) || parseInt(form.price) * 2, volumes_included: form.volumesIncluded, publisher: form.publisher, weight: form.weight, dimensions: form.dimensions });",
  "const price = parseInt(form.price) || 0;\n      const originalPrice = parseInt(form.originalPrice) || price * 2;\n      await addCustomBoxSet({ id: form.id || generateId(form.title), manga_id: form.mangaId || null, title: form.title, description: form.description || '', image: form.image || 'https://via.placeholder.com/400x600', price: price, original_price: originalPrice, volumes_included: form.volumesIncluded || '', publisher: form.publisher || '', weight: form.weight || '', dimensions: form.dimensions || '' });"
);

// Fix AddMangaTab (Product) validation
content = content.replace(
  "if (!form.title || !form.author || !form.price) { setError('Fill required fields'); return; }",
  "if (!form.title || !form.author || !form.price) { setError('Fill required title, brand, and price'); return; }"
);
content = content.replace(
  "price: parseInt(form.price), original_price: parseInt(form.originalPrice) || parseInt(form.price) * 2,",
  "price: parseInt(form.price) || 0, original_price: parseInt(form.originalPrice) || (parseInt(form.price) || 0) * 2,"
);
content = content.replace(
  "image: form.image, genre: form.genre, rating: parseFloat(form.rating) || 4.5,",
  "image: form.image || 'https://via.placeholder.com/400x600', genre: form.genre, rating: parseFloat(form.rating) || 4.5,"
);

// Fix AddActionFigureTab (Hoodie) validation
content = content.replace(
  "await addCustomActionFigure({ id: generateId(form.title), title: form.title, description: form.description, price: parseInt(form.price), original_price: parseInt(form.originalPrice) || parseInt(form.price) * 2, image: form.image, brand: form.brand, character_name: form.characterName, series: form.series, material: form.material, height: form.height, weight: form.weight, dimensions: form.dimensions });",
  "const price = parseInt(form.price) || 0;\n      const originalPrice = parseInt(form.originalPrice) || price * 2;\n      await addCustomActionFigure({ id: generateId(form.title), title: form.title, description: form.description || '', price: price, original_price: originalPrice, image: form.image || 'https://via.placeholder.com/400x600', brand: form.brand || '', character_name: form.characterName || '', series: form.series || '', material: form.material || '', height: form.height || '', weight: form.weight || '', dimensions: form.dimensions || '' });"
);

// Fix AddKatanaTab (Accessory) validation
content = content.replace(
  "await addCustomKatana({ id: generateId(form.title), title: form.title, description: form.description, price: parseInt(form.price), original_price: parseInt(form.originalPrice) || parseInt(form.price) * 2, image: form.image, blade_material: form.bladeMaterial, handle_material: form.handleMaterial, blade_length: form.bladeLength, total_length: form.totalLength, weight: form.weight, series: form.series });",
  "const price = parseInt(form.price) || 0;\n      const originalPrice = parseInt(form.originalPrice) || price * 2;\n      await addCustomKatana({ id: generateId(form.title), title: form.title, description: form.description || '', price: price, original_price: originalPrice, image: form.image || 'https://via.placeholder.com/400x600', blade_material: form.bladeMaterial || '', handle_material: form.handleMaterial || '', blade_length: form.bladeLength || '', total_length: form.totalLength || '', weight: form.weight || '', series: form.series || '' });"
);

fs.writeFileSync(file, content);
