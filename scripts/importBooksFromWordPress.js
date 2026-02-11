import { config } from 'dotenv';
import { createClient } from '@libsql/client';

config({ path: '.env.local' });

const WP_URL = 'https://anuugyabooks.com';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
});

async function getAuthorName(authorId) {
  try {
    const response = await fetch(`${WP_URL}/wp-json/wp/v2/bookauthor/${authorId}`);
    if (!response.ok) return null;
    const data = await response.json();
    return data.name;
  } catch (error) {
    return null;
  }
}

async function getCategoryName(catId) {
  try {
    const response = await fetch(`${WP_URL}/wp-json/wp/v2/product_cat/${catId}`);
    if (!response.ok) return null;
    const data = await response.json();
    return data.name;
  } catch (error) {
    return null;
  }
}

async function importBooks() {
  try {
    let page = 1;
    let totalBooks = 0;
    
    console.log('Books import शुरू...\n');
    
    while (true) {
      const response = await fetch(`${WP_URL}/wp-json/wp/v2/product?per_page=100&page=${page}`);
      if (!response.ok) break;
      
      const books = await response.json();
      if (books.length === 0) break;
      
      console.log(`Page ${page}: ${books.length} books`);
      
      for (const book of books) {
        let authorNames = [];
        if (book.bookauthor && book.bookauthor.length > 0) {
          for (const authorId of book.bookauthor) {
            const name = await getAuthorName(authorId);
            if (name) authorNames.push(name);
          }
        }
        
        const authorString = authorNames.join(', ') || 'Unknown Author';
        
        let categoryNames = [];
        if (book.product_cat && book.product_cat.length > 0) {
          for (const catId of book.product_cat) {
            const name = await getCategoryName(catId);
            if (name) categoryNames.push(name);
          }
        }
        
        const categoryString = categoryNames.join(', ') || 'Uncategorized';
        
        let coverImage = '';
        if (book.featured_media) {
          try {
            const mediaResponse = await fetch(`${WP_URL}/wp-json/wp/v2/media/${book.featured_media}`);
            if (mediaResponse.ok) {
              const mediaData = await mediaResponse.json();
              coverImage = mediaData.source_url || '';
            }
          } catch (e) {}
        }
        
        await client.execute({
          sql: `INSERT INTO books (
            title, author, category, price, description, cover_image
          ) VALUES (?, ?, ?, ?, ?, ?)`,
          args: [
            book.title.rendered,
            authorString,
            categoryString,
            0,
            book.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 500),
            coverImage
          ]
        });
        
        console.log(`✅ ${book.title.rendered.substring(0, 50)}...`);
        totalBooks++;
      }
      
      page++;
    }
    
    console.log(`\n🎉 कुल ${totalBooks} books import हो गईं!`);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

importBooks();