// scripts/migrateTurso.js
import { config } from 'dotenv';
import { createClient } from '@libsql/client';
import fs from 'fs';

config({ path: '.env.local' });

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
});

async function migrate() {
  try {
    // पुरानी टेबल डिलीट करो
    await client.execute('DROP TABLE IF EXISTS authors');
    console.log('🗑️ Old table dropped');
    
    // नई टेबल बनाओ
    await client.execute(`
      CREATE TABLE authors (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT,
        link TEXT,
        description TEXT,
        created_at INTEGER DEFAULT (unixepoch())
      )
    `);
    console.log('✅ New table created');

    const data = JSON.parse(fs.readFileSync('authors-data.json', 'utf-8'));
    
    let success = 0;
    
    for (const author of data) {
      await client.execute({
        sql: 'INSERT INTO authors (id, name, slug, link, description) VALUES (?, ?, ?, ?, ?)',
        args: [
          author.id,
          author.name || '',
          author.slug || '',
          author.link || '',
          author.description || ''
        ]
      });
      success++;
    }
    
    console.log(`✅ ${success} authors inserted successfully`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

migrate();