import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as unknown as ReturnType<typeof createClient>;

// Generate or retrieve device ID
export function getDeviceId(): string {
  if (typeof window === 'undefined') return '';
  
  let deviceId = localStorage.getItem('device-id');
  if (!deviceId) {
    deviceId = 'device_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    localStorage.setItem('device-id', deviceId);
  }
  return deviceId;
}

export interface OrderItem {
  mangaId: string;
  title: string;
  author: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id?: string;
  device_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  customer_address: string;
  items: OrderItem[];
  total_price: number;
  shipping_cost: number;
  status?: string;
  created_at?: string;
}

export async function createOrder(order: Omit<Order, 'id' | 'created_at' | 'status'>) {
  const { data, error } = await supabase
    .from('orders')
    .insert([order])
    .select()
    .single();

  if (error) {
    console.error('Supabase createOrder error:', error.message, error.details, error.hint);
    throw error;
  }
  return data;
}

export async function getAllOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase getAllOrders error:', error.message, error.details, error.hint);
    throw error;
  }
  return data;
}

export async function getOrdersByDeviceId(deviceId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('device_id', deviceId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase getOrdersByDeviceId error:', error.message, error.details, error.hint);
    throw error;
  }
  return data;
}

export async function updateOrderStatus(orderId: string, status: string) {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select()
    .single();

  if (error) {
    console.error('Supabase updateOrderStatus error:', error.message, error.details, error.hint);
    throw error;
  }
  return data;
}

// ── Custom Products CRUD ──

export interface CustomMangaRow {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  original_price: number;
  image: string;
  genre: string[];
  rating: number;
  volumes: number;
  status: string;
  featured: boolean;
  is_new: boolean;
  product_info: {
    productType: string;
    publisher: string;
    material: string;
    usage: string;
    isbn: string;
    weight: string;
    dimensions: string;
  };
  created_at?: string;
}

export interface CustomBoxSetRow {
  id: string;
  manga_id: string | null;
  title: string;
  description: string;
  image: string;
  price: number;
  original_price: number;
  volumes_included: string;
  publisher: string;
  weight: string;
  dimensions: string;
  created_at?: string;
}

export interface CustomActionFigureRow {
  id: string;
  title: string;
  description: string;
  price: number;
  original_price: number;
  image: string;
  brand: string;
  character_name: string;
  series: string;
  material: string;
  height: string;
  weight: string;
  dimensions: string;
  created_at?: string;
}

export interface CustomKatanaRow {
  id: string;
  title: string;
  description: string;
  price: number;
  original_price: number;
  image: string;
  blade_material: string;
  handle_material: string;
  blade_length: string;
  total_length: string;
  weight: string;
  series: string;
  created_at?: string;
}

export interface CustomCouponRow {
  id: string;
  code: string;
  discount_percent: number;
  created_at?: string;
}

export async function getCustomManga(): Promise<CustomMangaRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('custom_manga')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) {
    console.error('getCustomManga error:', error.message);
    return [];
  }
  return data || [];
}

export async function getCustomBoxSets(): Promise<CustomBoxSetRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('custom_boxsets')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) {
    console.error('getCustomBoxSets error:', error.message);
    return [];
  }
  return data || [];
}

export async function getCustomActionFigures(): Promise<CustomActionFigureRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('custom_action_figures')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) {
    console.error('getCustomActionFigures error:', error.message);
    return [];
  }
  return data || [];
}

export async function getCustomKatanas(): Promise<CustomKatanaRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('custom_katanas')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) {
    console.error('getCustomKatanas error:', error.message);
    return [];
  }
  return data || [];
}

export async function addCustomManga(manga: Omit<CustomMangaRow, 'created_at'>) {
  const { data, error } = await supabase
    .from('custom_manga')
    .insert([manga])
    .select()
    .single();
  if (error) {
    console.error('addCustomManga error:', error.message, error.details, error.hint);
    throw error;
  }
  return data;
}

export async function addCustomBoxSet(boxSet: Omit<CustomBoxSetRow, 'created_at'>) {
  const { data, error } = await supabase
    .from('custom_boxsets')
    .insert([boxSet])
    .select()
    .single();
  if (error) {
    console.error('addCustomBoxSet error:', error.message, error.details, error.hint);
    throw error;
  }
  return data;
}

export async function addCustomActionFigure(figure: Omit<CustomActionFigureRow, 'created_at'>) {
  const { data, error } = await supabase
    .from('custom_action_figures')
    .insert([figure])
    .select()
    .single();
  if (error) {
    console.error('addCustomActionFigure error:', error.message, error.details, error.hint);
    throw error;
  }
  return data;
}

export async function addCustomKatana(katana: Omit<CustomKatanaRow, 'created_at'>) {
  const { data, error } = await supabase
    .from('custom_katanas')
    .insert([katana])
    .select()
    .single();
  if (error) {
    console.error('addCustomKatana error:', error.message, error.details, error.hint);
    throw error;
  }
  return data;
}

export async function deleteCustomManga(id: string) {
  const { error } = await supabase
    .from('custom_manga')
    .delete()
    .eq('id', id);
  if (error) {
    console.error('deleteCustomManga error:', error.message);
    throw error;
  }
}

export async function deleteCustomBoxSet(id: string) {
  const { error } = await supabase
    .from('custom_boxsets')
    .delete()
    .eq('id', id);
  if (error) {
    console.error('deleteCustomBoxSet error:', error.message);
    throw error;
  }
}

export async function deleteCustomActionFigure(id: string) {
  const { error } = await supabase
    .from('custom_action_figures')
    .delete()
    .eq('id', id);
  if (error) {
    console.error('deleteCustomActionFigure error:', error.message);
    throw error;
  }
}

export async function deleteCustomKatana(id: string) {
  const { error } = await supabase
    .from('custom_katanas')
    .delete()
    .eq('id', id);
  if (error) {
    console.error('deleteCustomKatana error:', error.message);
    throw error;
  }
}

// ── Coupons CRUD ──

export async function getCoupons(): Promise<CustomCouponRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('custom_coupons')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('getCoupons error:', error.message);
    return [];
  }
  return data || [];
}

export async function createCoupon(code: string, discountPercent: number) {
  if (!supabase) throw new Error('Supabase not configured');

  // Check if coupon exists
  const { data: existing } = await supabase
    .from('custom_coupons')
    .select('id')
    .eq('code', code)
    .maybeSingle();

  if (existing) {
    throw new Error('Coupon code already exists');
  }

  const { data, error } = await supabase
    .from('custom_coupons')
    .insert([{ code, discount_percent: discountPercent }])
    .select()
    .single();

  if (error) {
    console.error('createCoupon error:', error.message);
    throw error;
  }
  return data;
}

export async function deleteCoupon(id: string) {
  if (!supabase) return;
  const { error } = await supabase
    .from('custom_coupons')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('deleteCoupon error:', error.message);
    throw error;
  }
}

export async function verifyCoupon(code: string): Promise<{ valid: boolean; discountPercent?: number; message?: string }> {
  if (!supabase) return { valid: false, message: 'System error' };

  const { data, error } = await supabase
    .from('custom_coupons')
    .select('*')
    .eq('code', code)
    .maybeSingle();

  if (error || !data) {
    return { valid: false, message: 'Invalid coupon code' };
  }

  return { valid: true, discountPercent: data.discount_percent };
}

// Upload image as base64 to product_images table
export async function uploadProductImage(base64Data: string, contentType: string): Promise<string> {
  if (!supabase) throw new Error('Supabase not configured');
  const id = crypto.randomUUID();
  const { error } = await supabase
    .from('product_images')
    .insert([{ id, image_data: base64Data, content_type: contentType }]);
  if (error) {
    console.error('uploadProductImage error:', error.message);
    throw error;
  }
  // Return a reference URL that the API route will serve
  return `/api/image/${id}`;
}

export async function getProductImage(id: string): Promise<{ image_data: string; content_type: string } | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('product_images')
    .select('image_data, content_type')
    .eq('id', id)
    .single();
  if (error) return null;
  return data;
}

// Initialize custom product tables (safe to call multiple times)
export async function initCustomProductTables(): Promise<{ success: boolean; message: string }> {
  if (!supabase) return { success: false, message: 'Supabase not configured' };

  const { error: testError } = await supabase.from('custom_manga').select('id').limit(1);
  if (!testError) {
    return { success: true, message: 'Tables already exist' };
  }

  return {
    success: false,
    message: 'Tables need to be created. Run the SQL from the admin panel.'
  };
}

export const INIT_SQL = `
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

-- Coupons table
CREATE TABLE IF NOT EXISTS custom_coupons (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  code TEXT NOT NULL UNIQUE,
  discount_percent INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS for Coupons
ALTER TABLE custom_coupons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to custom_coupons" ON custom_coupons FOR ALL USING (true) WITH CHECK (true);
`;
