import { turso } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (id) {
      const result = await turso.execute({
        sql: 'SELECT * FROM authors WHERE id = ?',
        args: [id]
      });
      
      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Author not found' }, { status: 404 });
      }
      
      return NextResponse.json(result.rows[0]);
    }
    
    const result = await turso.execute('SELECT * FROM authors ORDER BY name ASC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Failed to load authors' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    console.log('📝 Adding author:', data.name);

    const result = await turso.execute({
      sql: `INSERT INTO authors (name, photo, biography, birth_date, death_date)
            VALUES (?, ?, ?, ?, ?)`,
      args: [
        data.name,
        data.photo || null,
        data.biography || null,
        data.birth_date || null,
        data.death_date || null
      ]
    });

    console.log('✅ Author added:', result.lastInsertRowid);
    return NextResponse.json({ success: true, id: Number(result.lastInsertRowid) }, { status: 201 });
  } catch (error) {
    console.error('❌ POST Error:', error.message);
    return NextResponse.json({ error: error.message || 'Failed to add author' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json({ error: 'Author ID required' }, { status: 400 });
    }

    await turso.execute({
      sql: `UPDATE authors 
            SET name = ?, photo = ?, biography = ?, birth_date = ?, death_date = ?
            WHERE id = ?`,
      args: [
        updateData.name,
        updateData.photo || null,
        updateData.biography || null,
        updateData.birth_date || null,
        updateData.death_date || null,
        id
      ]
    });

    console.log('✅ Author updated:', id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ PUT Error:', error.message);
    return NextResponse.json({ error: 'Failed to update author' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Author ID required' }, { status: 400 });
    }

    await turso.execute({
      sql: 'DELETE FROM authors WHERE id = ?',
      args: [id]
    });

    console.log('✅ Author deleted:', id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ DELETE Error:', error.message);
    return NextResponse.json({ error: 'Failed to delete author' }, { status: 500 });
  }
}