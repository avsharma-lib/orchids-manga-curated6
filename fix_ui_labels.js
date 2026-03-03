const fs = require('fs');
let file = 'src/app/admin/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// T-Shirts: AddBoxSetTab
content = content.replace("Add New Box Set", "Add New T-Shirt");

// Hoodies: AddActionFigureTab
content = content.replace("Add Action Figure", "Add Hoodie");
content = content.replace("Add Action Figure", "Add Hoodie"); // In button
content = content.replace("Add Action Figure", "Add Hoodie"); // Second hit for tab label
content = content.replace("Add New Action Figure", "Add New Hoodie");

// Change labels for Hoodies
content = content.replace("Character Name", "Color / Wash");
content = content.replace("Series", "Fit");
content = content.replace("Material", "Fabric Blend");
content = content.replace("Brand", "Collection");
content = content.replace("Height", "Sizes Available");

// Bottoms: AddKatanaTab (repurposed from Add Accessory)
content = content.replace("Add Accessory", "Add Bottoms");
content = content.replace("Add Accessory", "Add Bottoms"); // In button
content = content.replace("Add Accessory", "Add Bottoms"); // Second hit for tab label

// Change labels for Bottoms
content = content.replace("Blade Material", "Primary Fabric");
content = content.replace("Secondary Material", "Secondary Fabric / Detail");
content = content.replace("Size", "Inseam Length");
content = content.replace("Series / Anime", "Fit Style (e.g. Relaxed)");
content = content.replace("Dimensions", "Waist Sizes");

// Tab Labels
content = content.replace("['add-hoodie', 'Add Action Figure'],", "['add-hoodie', 'Add Hoodie'],");
content = content.replace("['add-accessory', 'Add Accessory'],", "['add-accessory', 'Add Bottoms'],");

fs.writeFileSync(file, content);
