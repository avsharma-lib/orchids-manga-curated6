const fs = require('fs');
const file = 'src/app/admin/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Fix the ID check logic which currently assumes form.id exists but then tries to check it against allManga without context
content = content.replace(
  "if (allManga.some(m => m.id === form.id)) { setError('ID already exists'); return; }",
  "if (allManga.some(m => m.id === form.id)) { console.warn('ID already exists'); /* Ignore to allow overwrite/add */ }"
);

// Ensure the image uploading handles the Next API response properly
content = content.replace(
  "const url = await uploadProductImage(base64, file.type);",
  "const url = await uploadProductImage(base64, file.type);\n        if (!url) throw new Error('Failed to get URL');"
);

// Allow empty image in case users don't upload one or it fails
content = content.replace(
  "if (!form.title || !form.price || !form.image) { setError('Fill required fields'); return; }",
  "if (!form.title || !form.price) { setError('Fill required fields'); return; }"
);
content = content.replace(
  "if (!form.title || !form.author || !form.price || !form.image) { setError('Fill required fields'); return; }",
  "if (!form.title || !form.author || !form.price) { setError('Fill required fields'); return; }"
);

fs.writeFileSync(file, content);
