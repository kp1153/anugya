 // scripts/importAuthorsFromWordPress.js
import { config } from 'dotenv';
import { createClient } from '@libsql/client';

config({ path: '.env.local' });

const WP_URL = 'https://anuugyabooks.com';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
});

function createSlug(name) {
  return name.toLowerCase()
    .replace(/[^\u0900-\u097Fa-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

async function importAuthors() {
  try {
    let page = 1;
    let allAuthors = [];
    
    console.log('📚 Book authors fetch कर रहे हैं...\n');
    
    while (true) {
      const response = await fetch(`${WP_URL}/wp-json/wp/v2/bookauthor?per_page=100&page=${page}`);
      if (!response.ok) break;
      
      const authors = await response.json();
      if (authors.length === 0) break;
      
      allAuthors = [...allAuthors, ...authors];
      console.log(`📄 Page ${page}: ${authors.length} authors`);
      page++;
    }

    console.log(`\n📊 कुल ${allAuthors.length} book authors मिले\n`);

    for (const author of allAuthors) {
      const slug = author.slug || createSlug(author.name);
      
      await client.execute({
        sql: `INSERT OR REPLACE INTO authors (name, slug, link, description, profile_image, created_at) 
              VALUES (?, ?, ?, ?, ?, ?)`,
        args: [
          author.name,
          slug,
          author.link || '',
          author.description || '',
          '',
          Date.now()
        ]
      });
      
      console.log(`✅ ${author.name}`);
    }

    console.log(`\n🎉 सभी ${allAuthors.length} authors import हो गए!`);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

importAuthors();