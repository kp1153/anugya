import { turso } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    const subcategory = searchParams.get('subcategory') || '';
    const minPrice = searchParams.get('minPrice') || 0;
    const maxPrice = searchParams.get('maxPrice') || 999999;
    const year = searchParams.get('year') || '';
    const language = searchParams.get('language') || '';
    const sortBy = searchParams.get('sortBy') || 'relevance';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 20;
    const offset = (page - 1) * limit;

    let sql = `
      SELECT DISTINCT
        books.id,
        books.title,
        books.author,
        books.translator,
        books.isbn,
        books.category,
        books.subcategory,
        books.language,
        books.pages,
        books.publication_year,
        books.price,
        books.cover_image,
        books.description,
        books.stock,
        books.featured,
        books.popular,
        books.binding_type
      FROM books
      WHERE 1=1
    `;

    const params = [];

    if (query) {
      sql += ` AND (
        books.title LIKE ? OR
        books.isbn LIKE ? OR
        books.description LIKE ? OR
        books.author LIKE ? OR
        books.translator LIKE ?
      )`;
      const searchTerm = `%${query}%`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
    }

    if (category) {
      sql += ` AND books.category = ?`;
      params.push(category);
    }

    if (subcategory) {
      sql += ` AND books.subcategory = ?`;
      params.push(subcategory);
    }

    sql += ` AND books.price >= ? AND books.price <= ?`;
    params.push(minPrice, maxPrice);

    if (year) {
      sql += ` AND books.publication_year = ?`;
      params.push(parseInt(year));
    }

    if (language) {
      sql += ` AND books.language = ?`;
      params.push(language);
    }

    switch (sortBy) {
      case 'popular':
        sql += ` ORDER BY books.popular DESC, books.featured DESC`;
        break;
      case 'price_low':
        sql += ` ORDER BY books.price ASC`;
        break;
      case 'price_high':
        sql += ` ORDER BY books.price DESC`;
        break;
      case 'latest':
        sql += ` ORDER BY books.publication_year DESC, books.id DESC`;
        break;
      case 'title':
        sql += ` ORDER BY books.title ASC`;
        break;
      default:
        sql += ` ORDER BY books.featured DESC, books.popular DESC`;
    }

    const countSql = `SELECT COUNT(DISTINCT books.id) as total FROM books WHERE 1=1` + 
      (query ? ` AND (books.title LIKE ? OR books.isbn LIKE ? OR books.description LIKE ? OR books.author LIKE ? OR books.translator LIKE ?)` : '') +
      (category ? ` AND books.category = ?` : '') +
      (subcategory ? ` AND books.subcategory = ?` : '') +
      ` AND books.price >= ? AND books.price <= ?` +
      (year ? ` AND books.publication_year = ?` : '') +
      (language ? ` AND books.language = ?` : '');
    
    const countResult = await turso.execute({
      sql: countSql,
      args: params
    });
    
    const total = countResult.rows[0]?.total || 0;

    sql += ` LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const result = await turso.execute({
      sql: sql,
      args: params
    });

    return NextResponse.json({
      success: true,
      books: result.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { success: false, error: 'Search failed' },
      { status: 500 }
    );
  }
}