// scripts/verifyAuthors.js
import { config } from 'dotenv';
import { createClient } from '@libsql/client';

config({ path: '.env.local' });

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
});

async function verify() {
  try {
    const result = await client.execute('SELECT COUNT(*) as total FROM authors');
    console.log(`📊 Total Authors: ${result.rows[0].total}`);
    
    const sample = await client.execute('SELECT * FROM authors LIMIT 5');
    console.log('\n📝 Sample Data:');
    sample.rows.forEach(row => {
      console.log(`- ${row.name} (ID: ${row.id})`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

verify();