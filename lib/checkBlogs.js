import { turso } from './db.js';

async function checkBlogs() {
  try {
    const result = await turso.execute('SELECT id, title, slug, content FROM blogs');
    console.log('📝 सभी ब्लॉग:');
    result.rows.forEach(row => {
      console.log(`\nID: ${row.id}`);
      console.log(`Title: ${row.title}`);
      console.log(`Slug: ${row.slug}`);
      console.log(`Content length: ${row.content?.length || 0} characters`);
      console.log(`Content preview: ${row.content?.substring(0, 100)}...`);
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  process.exit(0);
}

checkBlogs();