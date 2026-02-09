import { turso } from '@/lib/db';
import { NextResponse } from 'next/server';

// एक किताब की डिटेल्स लाने के लिए (GET)
export async function GET(request, context) {
  try {
    const params = await context.params;
    const slug = params.slug;
    
    const result = await turso.execute({
      sql: 'SELECT * FROM books WHERE id = ?',
      args: [slug]
    });

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'किताब नहीं मिली' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching book:', error);
    return NextResponse.json({ error: 'किताब लोड नहीं हो सकी' }, { status: 500 });
  }
}

// किताब अपडेट करने के लिए (PUT)
export async function PUT(request, context) {
  try {
    const params = await context.params;
    const slug = params.slug;
    const data = await request.json();

    await turso.execute({
      sql: `UPDATE books SET 
            title = ?, author = ?, category = ?, price = ?, 
            description = ?, cover_image = ?, isbn = ?, pages = ?, 
            publisher = ?, published_date = ?, stock = ?, featured = ?
            WHERE id = ?`,
      args: [
        data.title, data.author, data.category, data.price,
        data.description || null, data.cover_image || null,
        data.isbn || null, data.pages || null,
        data.publisher || null, data.published_date || null,
        data.stock || 0, data.featured || 0, slug
      ]
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating book:', error);
    return NextResponse.json({ error: 'किताब अपडेट नहीं हो सकी' }, { status: 500 });
  }
}

// किताब डिलीट करने के लिए (DELETE)
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
    return NextResponse.json({ error: 'किताब डिलीट नहीं हो सकी' }, { status: 500 });
  }
}