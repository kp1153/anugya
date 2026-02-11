import { addNewBookColumns, turso } from '../lib/db.js';

async function runMigration() {
  console.log('Starting migration...');
  await addNewBookColumns();
  console.log('Migration completed!');
  process.exit(0);
}

runMigration().catch(console.error);