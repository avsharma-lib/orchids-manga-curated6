import { NextRequest, NextResponse } from 'next/server';
import { getProductImage } from '@/lib/supabase';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const image = await getProductImage(id);
  
  if (!image) {
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }

  const base64 = image.image_data;
  const buffer = Buffer.from(base64, 'base64');
  
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': image.content_type || 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
