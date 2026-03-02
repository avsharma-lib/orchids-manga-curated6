const fs = require('fs');

let content = fs.readFileSync('src/components/Header.tsx', 'utf8');

content = content.replace(
  /const browseLinks = \[\s*\{ href: '\/box-sets', label: 'All Box Sets' \},\s*\{ href: '\/action-figures', label: 'Action Figures' \},\s*\{ href: '\/katanas', label: 'Katanas' \},\s*\];/g,
  `const browseLinks = [\n    { href: '/t-shirts', label: 'All T-Shirts' },\n    { href: '/hoodies', label: 'Hoodies' },\n    { href: '/accessories', label: 'Accessories' },\n  ];`
);

content = content.replace(
  /const quickNavLinks = \[\s*\{ href: '\/#featured', label: 'Featured Titles' \},\s*\{ href: '\/shop\?filter=new', label: 'New Arrivals' \},\s*\{ href: '\/#box-sets', label: 'Box Sets' \},\s*\{ href: '\/#action-figures', label: 'Action Figures' \},\s*\{ href: '\/#katanas', label: 'Katanas' \},\s*\{ href: '\/#genre', label: 'Genre' \},\s*\];/g,
  `const quickNavLinks = [\n    { href: '/#featured', label: 'Featured Collections' },\n    { href: '/shop?filter=new', label: 'New Arrivals' },\n    { href: '/#t-shirts', label: 'T-Shirts' },\n    { href: '/#hoodies', label: 'Hoodies' },\n    { href: '/#accessories', label: 'Accessories' },\n    { href: '/#categories', label: 'Categories' },\n  ];`
);

fs.writeFileSync('src/components/Header.tsx', content);
