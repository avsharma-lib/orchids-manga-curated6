const fs = require('fs');

let content = fs.readFileSync('src/app/about/page.tsx', 'utf8');

content = content.replace(
  /<span className="text-\[var\(--crimson\)\] italic">Serious Readers<\/span>/,
  '<span className="text-[var(--crimson)] italic">Modern Style</span>'
);

content = content.replace(
  /Inkai was born from a simple observation: the world of manga is vast, but true masterpieces are rare\./,
  'Inkai was born from a simple observation: the world of fast fashion is vast, but true quality pieces are rare.'
);

content = content.replace(
  /Our collection is hand-selected\. Each title in our library has been chosen for its exceptional storytelling, \n              groundbreaking art, and its contribution to the medium\. From the dark, visceral depths of <span className="text-\[var\(--ink\)\] font-medium">Berserk<\/span> to \n              the philosophical heights of <span className="text-\[var\(--ink\)\] font-medium">Vagabond<\/span>, we only carry works that demand to be read\./,
  'Our collection is hand-selected. Each piece in our catalog has been chosen for its exceptional quality, \n              groundbreaking design, and its contribution to modern style. From everyday essentials to \n              statement pieces, we only carry clothing that demands to be worn.'
);

content = content.replace(
  /The Medium as Art/,
  'Fashion as Art'
);

content = content.replace(
  /Manga is more than entertainment\. It is a sophisticated form of visual and literary expression\. We treat it with the respect it deserves\./,
  'Clothing is more than functional. It is a sophisticated form of visual and personal expression. We treat it with the respect it deserves.'
);

content = content.replace(
  /https:\/\/images\.unsplash\.com\/photo-1578632292335-df3abbb0d586\?q=80&w=2000&auto=format&fit=crop/,
  'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2000&auto=format&fit=crop'
);

content = content.replace(
  /alt="Ink and Paper"/,
  'alt="Modern Apparel"'
);

fs.writeFileSync('src/app/about/page.tsx', content);
