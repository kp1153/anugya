import { turso } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  try {
    const { slug } = await params;
    
    const checkResult = await turso.execute({
      sql: 'SELECT views FROM page_views WHERE slug = ?',
      args: [slug]
    });

    if (checkResult.rows.length > 0) {
      await turso.execute({
        sql: 'UPDATE page_views SET views = views + 1 WHERE slug = ?',
        args: [slug]
      });
    } else {
      await turso.execute({
        sql: 'INSERT INTO page_views (slug, views) VALUES (?, 1)',
        args: [slug]
      });
    }

    const result = await turso.execute({
      sql: 'SELECT views FROM page_views WHERE slug = ?',
      args: [slug]
    });

    return NextResponse.json({ views: result.rows[0].views });
  } catch (error) {
    console.error('Views Error:', error);
    return NextResponse.json({ error: 'Views update failed' }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    
    const result = await turso.execute({
      sql: 'SELECT views FROM page_views WHERE slug = ?',
      args: [slug]
    });

    const views = result.rows.length > 0 ? result.rows[0].views : 0;
    return NextResponse.json({ views });
  } catch (error) {
    console.error('Views Error:', error);
    return NextResponse.json({ views: 0 });
  }
}
