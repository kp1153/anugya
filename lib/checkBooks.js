import { turso } from './db.js';

async function checkBooks() {
  try {
    const result = await turso.execute('SELECT id, title, featured, popular FROM books');
    console.log('📚 सभी किताबें:');
    result.rows.forEach(row => {
      console.log(`ID: ${row.id}, Title: ${row.title}, Featured: ${row.featured}, Popular: ${row.popular}`);
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  process.exit(0);
}

checkBooks();