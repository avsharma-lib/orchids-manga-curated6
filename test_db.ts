import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  console.log('Testing uploadProductImage equivalent');
  const base64Data = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
  const id = crypto.randomUUID();
  const { error } = await supabase
    .from('product_images')
    .insert([{ id, image_data: base64Data, content_type: 'image/png' }]);

  if (error) {
    console.error('Insert image error:', error);
  } else {
    console.log('Insert image success, id:', id);
  }

  const { error: error2 } = await supabase
    .from('custom_boxsets')
    .insert([{
        id: 'test-tshirt-2',
        manga_id: null,
        title: 'Test T-Shirt 2',
        description: 'Testing T-Shirt Add',
        image: `/api/image/${id}`,
        price: 100,
        original_price: 200,
        volumes_included: 'L, XL',
        publisher: 'Test Publisher',
        weight: '100g',
        dimensions: '10x10x10'
    }])
    .select()
    .single();

  if (error2) {
    console.error('Insert tshirt error:', error2);
  } else {
    console.log('Insert tshirt success');
  }
}
testInsert();
