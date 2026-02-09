import { initDatabase } from './db.js';

async function init() {
  console.log('🚀 Database tables बना रहे हैं...');
  await initDatabase();
  console.log('✅ Database ready!');
  process.exit(0);
}

init().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});