const fs = require('fs');

let supabasePath = 'src/lib/supabase.ts';
let content = fs.readFileSync(supabasePath, 'utf8');

content = content.replace(
  /export const INIT_SQL = `[\s\S]*?`;/,
  `export const INIT_SQL = \`
-- Custom manga table
CREATE TABLE IF NOT EXISTS custom_manga (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  description TEXT DEFAULT '',
  price INTEGER NOT NULL,
  original_price INTEGER NOT NULL,
  image TEXT NOT NULL,
  genre JSONB DEFAULT '[]',
  rating NUMERIC(2,1) DEFAULT 4.5,
  volumes INTEGER DEFAULT 1,
  status TEXT DEFAULT 'completed',
  featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  product_info JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Custom box sets table
CREATE TABLE IF NOT EXISTS custom_boxsets (
  id TEXT PRIMARY KEY,
  manga_id TEXT,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  image TEXT NOT NULL,
  price INTEGER NOT NULL,
  original_price INTEGER NOT NULL,
  volumes_included TEXT DEFAULT '',
  publisher TEXT DEFAULT '',
  weight TEXT DEFAULT '',
  dimensions TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Action Figures table
CREATE TABLE IF NOT EXISTS custom_action_figures (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  price INTEGER NOT NULL,
  original_price INTEGER NOT NULL,
  image TEXT NOT NULL,
  brand TEXT DEFAULT '',
  character_name TEXT DEFAULT '',
  series TEXT DEFAULT '',
  material TEXT DEFAULT 'PVC',
  height TEXT DEFAULT '',
  weight TEXT DEFAULT '',
  dimensions TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Katanas table
CREATE TABLE IF NOT EXISTS custom_katanas (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  price INTEGER NOT NULL,
  original_price INTEGER NOT NULL,
  image TEXT NOT NULL,
  blade_material TEXT DEFAULT 'Stainless Steel',
  handle_material TEXT DEFAULT 'Wood',
  blade_length TEXT DEFAULT '',
  total_length TEXT DEFAULT '',
  weight TEXT DEFAULT '',
  series TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Product images storage
CREATE TABLE IF NOT EXISTS product_images (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  image_data TEXT NOT NULL,
  content_type TEXT DEFAULT 'image/jpeg',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS policies
ALTER TABLE custom_manga ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to custom_manga" ON custom_manga FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE custom_boxsets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to custom_boxsets" ON custom_boxsets FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE custom_action_figures ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to custom_action_figures" ON custom_action_figures FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE custom_katanas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to custom_katanas" ON custom_katanas FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to product_images" ON product_images FOR ALL USING (true) WITH CHECK (true);
\`;`
);

fs.writeFileSync(supabasePath, content);
