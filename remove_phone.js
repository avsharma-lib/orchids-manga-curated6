const fs = require('fs');

// Remove phone number from Footer.tsx
let footerPath = 'src/components/Footer.tsx';
let footerContent = fs.readFileSync(footerPath, 'utf8');
footerContent = footerContent.replace(/<li className="flex items-center gap-2">\s*<svg[^>]*>[\s\S]*?<\/svg>\s*<a href="tel:\+919109591879"[^>]*>\+91 91095 91879<\/a>\s*<\/li>/, '');
fs.writeFileSync(footerPath, footerContent);

// Remove phone number from Contact page
let contactPath = 'src/app/contact/page.tsx';
let contactContent = fs.readFileSync(contactPath, 'utf8');
contactContent = contactContent.replace(/<p className="flex items-center gap-4 text-lg text-\[var\(--stone\)\] group">\s*<span[^>]*\/>\s*<a href="tel:\+919109591879"[^>]*>\s*\+91 91095 91879\s*<\/a>\s*<\/p>/, '');
fs.writeFileSync(contactPath, contactContent);
