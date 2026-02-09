import { turso } from './db.js';

async function markPopular() {
  try {
    await turso.execute('UPDATE books SET popular = 1 WHERE id IN (1, 2, 3)');
    console.log('✅ किताबें popular हो गईं!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  process.exit(0);
}

markPopular();