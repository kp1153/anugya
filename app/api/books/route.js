import { turso } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    
    let result;
    
    if (category) {
      result = await turso.execute({
        sql: 'SELECT * FROM books WHERE category = ? ORDER BY created_at DESC',
        args: [category]
      });
    } else {
      result = await turso.execute('SELECT * FROM books ORDER BY created_at DESC');
    }
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'किताबें लोड नहीं हो सकीं' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    console.log('📦 Received data:', JSON.stringify(data, null, 2));
    
    const result = await turso.execute({
      sql: `INSERT INTO books (title, author, category, price, description, cover_image, isbn, pages, publisher, published_date, stock, featured, popular) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        data.title,
        data.author,
        data.category,
        data.price,
        data.description || null,
        data.cover_image || null,
        data.isbn || null,
        data.pages || null,
        data.publisher || null,
        data.published_date || null,
        data.stock || 0,
        data.featured ? 1 : 0,
        data.popular ? 1 : 0
      ]
    });

    console.log('✅ Book added:', result.lastInsertRowid);
    return NextResponse.json({ success: true, id: Number(result.lastInsertRowid) }, { status: 201 });
  } catch (error) {
    console.error('❌ POST Error:', error.message);
    console.error('Full error:', error);
    return NextResponse.json({ error: error.message || 'किताब जोड़ने में समस्या आई' }, { status: 500 });
  }
}