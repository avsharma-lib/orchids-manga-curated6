const fs = require('fs');

let content = fs.readFileSync('src/app/page.tsx', 'utf8');

content = content.replace(
  /Curated Manga for<br \/>\s*<span className="italic text-\[var\(--crimson\)\]">Serious<\/span> Readers/,
  'Premium Apparel for<br />\n              <span className="italic text-[var(--crimson)]">Modern</span> Style'
);

content = content.replace(
  /A carefully selected collection of the finest manga titles\. No filler\. No compromise\. Only the works that define the medium\./g,
  'A carefully selected collection of the finest clothing. No filler. No compromise. Only the pieces that define modern style.'
);

content = content.replace(
  /We curate ruthlessly\. Every title in our collection has been read, evaluated, and chosen for its artistic merit, narrative depth, and cultural significance\. This is manga for readers who refuse to settle\./g,
  'We curate ruthlessly. Every piece in our collection has been evaluated and chosen for its design merit, quality material, and cultural significance. This is clothing for individuals who refuse to settle.'
);

content = content.replace(/id="box-sets"/g, 'id="t-shirts"');
content = content.replace(/Premium Collections/g, 'Essentials');
content = content.replace(/<h2[^>]*>Box Sets<\/h2>/g, '<h2 className="text-4xl md:text-5xl text-[var(--ink)]" style={{ fontFamily: \'var(--font-heading)\' }}>T-Shirts</h2>');
content = content.replace(/<p className="text-\[var\(--stone\)\] text-lg">Coming Soon<\/p>\s*<p className="text-sm text-\[var\(--stone\)\] mt-2">Box sets will be available shortly<\/p>/g, '<p className="text-[var(--stone)] text-lg">Coming Soon</p>\n              <p className="text-sm text-[var(--stone)] mt-2">T-Shirts will be available shortly</p>');
content = content.replace(/Box Set/g, 'T-Shirt');
content = content.replace(/href="\/box-sets"/g, 'href="/t-shirts"');
content = content.replace(/href={`\/box-set\/\${bs\.id}`}/g, 'href={`/t-shirt/${bs.id}`}');
content = content.replace(/View All Box Sets/g, 'View All T-Shirts');


content = content.replace(/id="action-figures"/g, 'id="hoodies"');
content = content.replace(/Collectibles/g, 'Outerwear');
content = content.replace(/<h2[^>]*>Action Figures<\/h2>/g, '<h2 className="text-4xl md:text-5xl text-[var(--ink)]" style={{ fontFamily: \'var(--font-heading)\' }}>Hoodies</h2>');
content = content.replace(/<p className="text-\[var\(--stone\)\] text-lg">Coming Soon<\/p>\s*<p className="text-sm text-\[var\(--stone\)\] mt-2">Action figures will be available shortly<\/p>/g, '<p className="text-[var(--stone)] text-lg">Coming Soon</p>\n              <p className="text-sm text-[var(--stone)] mt-2">Hoodies will be available shortly</p>');
content = content.replace(/>Figure</g, '>Hoodie<');
content = content.replace(/href="\/action-figures"/g, 'href="/hoodies"');
content = content.replace(/href={`\/action-figures\/\${figure\.id}`}/g, 'href={`/hoodies/${figure.id}`}');
content = content.replace(/View All Action Figures/g, 'View All Hoodies');


content = content.replace(/id="katanas"/g, 'id="accessories"');
content = content.replace(/Replica Weapons/g, 'Finishing Touches');
content = content.replace(/<h2[^>]*>Katanas<\/h2>/g, '<h2 className="text-4xl md:text-5xl text-\[var\(--paper\)\]" style={{ fontFamily: \'var\(--font-heading\)\' }}>Accessories<\/h2>');
content = content.replace(/<p className="text-\[var\(--mist\)\] text-lg">Coming Soon<\/p>\s*<p className="text-sm text-\[var\(--stone\)\] mt-2">Katanas will be available shortly<\/p>/g, '<p className="text-[var(--mist)] text-lg">Coming Soon</p>\n              <p className="text-sm text-[var(--stone)] mt-2">Accessories will be available shortly</p>');
content = content.replace(/>Katana</g, '>Accessory<');
content = content.replace(/href="\/katanas"/g, 'href="/accessories"');
content = content.replace(/href={`\/katanas\/\${katana\.id}`}/g, 'href={`/accessories/${katana.id}`}');
content = content.replace(/View All Katanas/g, 'View All Accessories');


content = content.replace(/id="genre"/g, 'id="categories"');
content = content.replace(/Explore by Genre/g, 'Explore by Category');
content = content.replace(/Curated Collections/g, 'Curated Styles');
content = content.replace(/Dark Fantasy/g, 'Streetwear');
content = content.replace(/Horror/g, 'Casual');

content = content.replace(/Browse by Genre/g, 'Browse by Category');

content = content.replace(/Join the Collection/g, 'Join the Club');
content = content.replace(/new titles to our curated collection\. No spam, just manga\./g, 'new pieces to our curated collection. No spam, just style.');

fs.writeFileSync('src/app/page.tsx', content);
