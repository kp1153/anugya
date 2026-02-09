import { turso } from '@/lib/db';
import { NextResponse } from 'next/server';

// GET - single blog with media
export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    
    // Blog fetch करो
    const blogResult = await turso.execute({
      sql: 'SELECT * FROM blogs WHERE slug = ?',
      args: [slug]
    });

    if (blogResult.rows.length === 0) {
      return NextResponse.json({ error: 'ब्लॉग नहीं मिला' }, { status: 404 });
    }

    const blog = blogResult.rows[0];

    // Media fetch करो
    const mediaResult = await turso.execute({
      sql: 'SELECT * FROM blog_media WHERE blog_id = ? ORDER BY display_order',
      args: [blog.id]
    });

    return NextResponse.json({
      ...blog,
      media: mediaResult.rows
    });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'ब्लॉग लोड नहीं हो सका' }, { status: 500 });
  }
}

// PUT - blog update करो
export async function PUT(request, { params }) {
  try {
    const { slug } = await params;
    const data = await request.json();

    // Blog update करो
    await turso.execute({
      sql: `UPDATE blogs 
            SET title = ?, slug = ?, content = ?, excerpt = ?, 
                featured_image = ?, category = ?, status = ?, 
                author_name = ?, updated_at = CURRENT_TIMESTAMP 
            WHERE slug = ?`,
      args: [
        data.title,
        data.slug,
        data.content,
        data.excerpt || null,
        data.featured_image || null,
        data.category || null,
        data.status || 'draft',
        data.author_name || null,
        slug
      ]
    });

    // पुराने media delete करो
    const blogResult = await turso.execute({
      sql: 'SELECT id FROM blogs WHERE slug = ?',
      args: [data.slug]
    });
    
    if (blogResult.rows.length > 0) {
      const blogId = blogResult.rows[0].id;
      await turso.execute({
        sql: 'DELETE FROM blog_media WHERE blog_id = ?',
        args: [blogId]
      });

      // नए media insert करो
      if (data.media && data.media.length > 0) {
        for (let i = 0; i < data.media.length; i++) {
          const media = data.media[i];
          await turso.execute({
            sql: `INSERT INTO blog_media (blog_id, media_type, media_url, caption, display_order) 
                  VALUES (?, ?, ?, ?, ?)`,
            args: [blogId, media.media_type, media.media_url, media.caption || null, i]
          });
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json({ error: 'ब्लॉग अपडेट नहीं हो सका' }, { status: 500 });
  }
}

// DELETE - blog delete करो
export async function DELETE(request, { params }) {
  try {
    const { slug } = await params;
    
    await turso.execute({
      sql: 'DELETE FROM blogs WHERE slug = ?',
      args: [slug]
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json({ error: 'ब्लॉग डिलीट नहीं हो सका' }, { status: 500 });
  }
}