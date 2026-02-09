import { turso } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await turso.execute('SELECT * FROM blogs ORDER BY created_at DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'ब्लॉग लोड नहीं हो सके' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    console.log('📦 Received blog data:', JSON.stringify(data, null, 2));
    
    const result = await turso.execute({
      sql: `INSERT INTO blogs (title, slug, content, featured_image, status) 
            VALUES (?, ?, ?, ?, ?)`,
      args: [
        data.title,
        data.slug,
        data.content,
        data.featured_image || null,
        data.status || 'draft'
      ]
    });

    const blogId = Number(result.lastInsertRowid);

    if (data.media && data.media.length > 0) {
      for (let i = 0; i < data.media.length; i++) {
        const media = data.media[i];
        await turso.execute({
          sql: `INSERT INTO blog_media (blog_id, media_type, media_url, caption, display_order) 
                VALUES (?, ?, ?, ?, ?)`,
          args: [blogId, media.media_type, media.media_url, media.caption || null, i]
        });
      }
    }

    console.log('✅ Blog added:', blogId);
    return NextResponse.json({ success: true, id: blogId }, { status: 201 });
  } catch (error) {
    console.error('❌ POST Error:', error.message);
    return NextResponse.json({ error: error.message || 'ब्लॉग जोड़ने में समस्या आई' }, { status: 500 });
  }
}