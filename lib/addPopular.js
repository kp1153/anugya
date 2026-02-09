import { turso } from './db.js';

async function addColumn() {
  try {
    await turso.execute('ALTER TABLE books ADD COLUMN popular BOOLEAN DEFAULT 0');
    console.log('✅ popular column add हो गया!');
  } catch (error) {
    if (error.message.includes('duplicate')) {
      console.log('ℹ️ Column पहले से है');
    } else {
      console.error('❌ Error:', error.message);
    }
  }
  process.exit(0);
}

addColumn();