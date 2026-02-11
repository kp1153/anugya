 import { turso } from '../lib/db.js';

async function migrate() {
  try {
    console.log('🔄 Migration शुरू हो रही है...');

    // authors और translators कॉलम add करो
    await turso.execute(`
      ALTER TABLE books ADD COLUMN author_id INTEGER;
    `);
    console.log('✅ author_id कॉलम जोड़ा गया');

    await turso.execute(`
      ALTER TABLE books ADD COLUMN translator_id INTEGER;
    `);
    console.log('✅ translator_id कॉलम जोड़ा गया');

    console.log('✅ Migration पूरी हुई!');
  } catch (error) {
    console.error('❌ Migration Error:', error.message);
  }
}

migrate();