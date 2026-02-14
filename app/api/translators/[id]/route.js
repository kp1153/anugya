import { turso } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, slug, biography, photo, birth_date, death_date } = body;

    const result = await turso.execute({
      sql: 'UPDATE translators SET name = ?, slug = ?, biography = ?, photo = ?, birth_date = ?, death_date = ? WHERE id = ?',
      args: [name, slug, biography, photo, birth_date, death_date, id]
    });

    if (result.rowsAffected === 0) {
      return NextResponse.json({ error: 'Translator not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Translator updated' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to update translator' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const result = await turso.execute({
      sql: 'DELETE FROM translators WHERE id = ?',
      args: [id]
    });

    if (result.rowsAffected === 0) {
      return NextResponse.json({ error: 'Translator not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Translator deleted' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to delete translator' }, { status: 500 });
  }
}