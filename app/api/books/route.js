import { turso } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const language = url.searchParams.get('language');
    const author = url.searchParams.get('author');
    const popular = url.searchParams.get('popular');
    const latest = url.searchParams.get('latest');
    const limit = url.searchParams.get('limit');

    let sql = `SELECT * FROM books WHERE 1=1`;
    const args = [];

    if (category) {
      sql += ' AND category = ?';
      args.push(category);
    }

    if (language) {
      sql += ' AND language = ?';
      args.push(language);
    }

    if (author) {
      sql += ' AND author LIKE ?';
      args.push(`%${author}%`);
    }

    if (popular === 'true') {
      sql += ' AND popular = 1';
    }

    if (latest === 'true') {
      sql += ' ORDER BY id DESC LIMIT 20';
    } else {
      sql += ' ORDER BY id DESC';
    }

    if (limit) {
      sql += ` LIMIT ${parseInt(limit)}`;
    }

    const result = await turso.execute({ sql, args });
    return NextResponse.json(Array.isArray(result.rows) ? result.rows : []);    
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Failed to load books' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('📦 Received data:', JSON.stringify(data, null, 2));

    const result = await turso.execute({
      sql: `INSERT INTO books (
        isbn, title, author_id, translator_id, category, language,
        pages, length, width, height, weight,
        is_multi_volume, number_of_volumes,
        paperback_single_price, hardbound_single_price,
        paperback_set_price, hardbound_set_price,
        cover_image, description, stock
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        data.isbn || null,
        data.title,
        data.author_id || null,
        data.translator_id || null,
        data.category,
        data.language || 'Hindi',
        data.pages || null,
        data.length || null,
        data.width || null,
        data.height || null,
        data.weight || null,
        data.is_multi_volume ? 1 : 0,
        data.number_of_volumes || 1,
        data.paperback_single_price || null,
        data.hardbound_single_price || null,
        data.paperback_set_price || null,
        data.hardbound_set_price || null,
        data.cover_image || null,
        data.description || null,
        data.stock || 0
      ]
    });

    console.log('✅ Book added:', result.lastInsertRowid);
    return NextResponse.json({ success: true, id: Number(result.lastInsertRowid) }, { status: 201 });
  } catch (error) {
    console.error('❌ POST Error:', error.message);
    console.error('Full error:', error);
    return NextResponse.json({ error: error.message || 'Failed to add book' }, { status: 500 });
  }
}