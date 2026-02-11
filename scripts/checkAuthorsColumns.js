// scripts/checkAuthorsColumns.js
import { config } from 'dotenv';
import { createClient } from '@libsql/client';

config({ path: '.env.local' });

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
});

async function check() {
  try {
    const result = await client.execute('PRAGMA table_info(authors)');
    console.log('📋 Authors Table Columns:');
    result.rows.forEach(row => {
      console.log(`- ${row.name} (${row.type})`);
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

check();