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

// Initialize custom product tables (safe to call multiple times)
export async function initCustomProductTables(): Promise<{ success: boolean; message: string }> {
  if (!supabase) return { success: false, message: 'Supabase not configured' };

  // Try to select from custom_manga - if it fails, tables don't exist
  const { error: testError } = await supabase.from('custom_manga').select('id').limit(1);
  if (!testError) {
    return { success: true, message: 'Tables already exist' };
  }

  // Tables don't exist - we need to create them via SQL
  // Since we can't run DDL through the Supabase JS client,
  // return instructions for the user
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

-- Disable RLS for simplicity
ALTER TABLE custom_manga ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to custom_manga" ON custom_manga FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE custom_boxsets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to custom_boxsets" ON custom_boxsets FOR ALL USING (true) WITH CHECK (true);
`;
