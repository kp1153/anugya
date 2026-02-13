import { turso } from '../lib/db.js';

async function testAPI() {
  const query = 'अभिषेक';
  const searchTerm = `%${query}%`;
  
  const sql = `
    SELECT DISTINCT
      books.id,
      books.title,
      books.author,
      books.price
    FROM books
    WHERE LOWER(books.author) LIKE LOWER(?)
    AND books.stock > 0
    LIMIT 5
  `;
  
  const result = await turso.execute({
    sql: sql,
    args: [searchTerm]
  });
  
  console.log('Total results:', result.rows.length);
  console.log('Results:', JSON.stringify(result.rows, null, 2));
  process.exit();
}

testAPI();