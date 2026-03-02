import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  const { data, error } = await supabase
    .from('custom_boxsets')
    .insert([{
        id: 'test-tshirt-1',
        manga_id: null,
        title: 'Test T-Shirt',
        description: 'Testing T-Shirt Add',
        image: 'https://example.com/test.jpg',
        price: 100,
        original_price: 200,
        volumes_included: 'L, XL',
        publisher: 'Test Publisher',
        weight: '100g',
        dimensions: '10x10x10'
    }])
    .select()
    .single();

  if (error) {
    console.error('Insert error:', error);
  } else {
    console.log('Insert success:', data);
  }
}

testInsert();
