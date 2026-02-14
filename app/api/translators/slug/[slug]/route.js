import { turso } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    
    const result = await turso.execute({
      sql: 'SELECT * FROM translators WHERE slug = ?',
      args: [slug]
    });

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Translator not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to load translator' }, { status: 500 });
  }
}