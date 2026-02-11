// scripts/removeDuplicateAuthors.js
import { config } from 'dotenv';
import { createClient } from '@libsql/client';

config({ path: '.env.local' });

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
});

async function removeDuplicates() {
  try {
    console.log('🔍 Duplicates check कर रहे हैं...\n');
    
    // पहले total count
    const before = await client.execute('SELECT COUNT(*) as total FROM authors');
    console.log(`📊 पहले: ${before.rows[0].total} authors\n`);
    
    // Duplicates हटाओ - सबसे latest वाला रखो
    await client.execute(`
      DELETE FROM authors 
      WHERE id NOT IN (
        SELECT MAX(id) 
        FROM authors 
        GROUP BY slug
      )
    `);
    
    // अब total count
    const after = await client.execute('SELECT COUNT(*) as total FROM authors');
    console.log(`📊 अब: ${after.rows[0].total} authors\n`);
    
    const removed = before.rows[0].total - after.rows[0].total;
    console.log(`✅ ${removed} duplicate authors हटा दिए!`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

removeDuplicates();