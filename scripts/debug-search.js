import { turso } from '../lib/db.js';

async function debugSearch() {
  const query = 'अभिषेक';
  const searchTerm = `%${query}%`;
  
  console.log('Search term:', searchTerm);
  
  // Test 1: Simple query
  const result1 = await turso.execute({
    sql: "SELECT id, title, author FROM books WHERE author LIKE ? LIMIT 3",
    args: [searchTerm]
  });
  console.log('\nTest 1 - Simple LIKE:', result1.rows.length, 'results');
  console.log(result1.rows);
  
  // Test 2: With stock condition
  const result2 = await turso.execute({
    sql: "SELECT id, title, author FROM books WHERE books.stock > 0 AND books.author LIKE ? LIMIT 3",
    args: [searchTerm]
  });
  console.log('\nTest 2 - With stock:', result2.rows.length, 'results');
  console.log(result2.rows);
  
  // Test 3: Check stock values
  const result3 = await turso.execute({
    sql: "SELECT id, title, author, stock FROM books WHERE author LIKE ? LIMIT 3",
    args: [searchTerm]
  });
  console.log('\nTest 3 - Stock values:');
  console.log(result3.rows);
  
  process.exit();
}

debugSearch();