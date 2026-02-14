import { turso } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    await turso.execute(`
      DELETE FROM authors 
      WHERE id NOT IN (
        SELECT MIN(id) 
        FROM authors 
        GROUP BY name
      )
    `);
    
    return NextResponse.json({ success: true, message: 'Duplicates deleted' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}