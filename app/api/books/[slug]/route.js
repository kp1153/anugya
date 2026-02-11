import { turso } from '@/lib/db';
import { NextResponse } from 'next/server';

// Get single book details (GET)
export async function GET(request, context) {
  try {
    const params = await context.params;
    const slug = params.slug;

    const result = await turso.execute({
      sql: 'SELECT * FROM books WHERE id = ?',
      args: [slug]
    });

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching book:', error);
    return NextResponse.json({ error: 'Failed to load book' }, { status: 500 });
  }
}

// Update book (PUT)
export async function PUT(request, context) {
  try {
    const params = await context.params;
    const slug = params.slug;
    const data = await request.json();

    await turso.execute({
      sql: `UPDATE books SET
            title = ?, author = ?, translator = ?, category = ?, price = ?,
            description = ?, cover_image = ?, isbn = ?, pages = ?,
            publisher = ?, published_date = ?, stock = ?, featured = ?, 
            popular = ?, binding_type = ?, language = ?
            WHERE id = ?`,
      args: [
        data.title, data.author, data.translator || null, data.category, data.price,
        data.description || null, data.cover_image || null,
        data.isbn || null, data.pages || null,
        data.publisher || null, data.published_date || null,
        data.stock || 0, data.featured ? 1 : 0, 
        data.popular ? 1 : 0, data.binding_type || 'paperback', 
        data.language || 'Hindi', slug
      ]
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating book:', error);
    return NextResponse.json({ error: 'Failed to update book' }, { status: 500 });
  }
}

// Delete book (DELETE)
export async function DELETE(request, context) {
  try {
    const params = await context.params;
    const slug = params.slug;

    await turso.execute({
      sql: 'DELETE FROM books WHERE id = ?',
      args: [slug]
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting book:', error);
    return NextResponse.json({ error: 'Failed to delete book' }, { status: 500 });
  }
}