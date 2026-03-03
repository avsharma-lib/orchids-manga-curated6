const fs = require('fs');
let file = 'src/app/admin/page.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "if (!form.title || !form.price || !form.image) { setError('Fill required fields'); return; }",
  "if (!form.title || !form.price) { setError('Fill required title and price'); return; }"
);

fs.writeFileSync(file, content);
