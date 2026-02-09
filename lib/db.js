import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createClient } from '@libsql/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '..', '.env.local') });

export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function initDatabase() {
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT,
      cover_image TEXT,
      isbn TEXT,
      pages INTEGER,
      publisher TEXT,
      published_date TEXT,
      stock INTEGER DEFAULT 0,
      featured BOOLEAN DEFAULT 0,
      popular BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await turso.execute(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_name TEXT NOT NULL,
      user_email TEXT NOT NULL,
      user_phone TEXT NOT NULL,
      total_amount REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await turso.execute(`
    CREATE TABLE IF NOT EXISTS blogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      content TEXT NOT NULL,
      featured_image TEXT,
      status TEXT DEFAULT 'draft',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await turso.execute(`
    CREATE TABLE IF NOT EXISTS blog_media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      blog_id INTEGER NOT NULL,
      media_type TEXT NOT NULL,
      media_url TEXT NOT NULL,
      caption TEXT,
      display_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE
    )
  `);

  await turso.execute(`
    CREATE TABLE IF NOT EXISTS page_views (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      views INTEGER DEFAULT 0,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export async function addPopularColumn() {
  try {
    await turso.execute(`ALTER TABLE books ADD COLUMN popular BOOLEAN DEFAULT 0`);
    console.log('✅ popular column add हो गया!');
  } catch (error) {
    if (error.message.includes('duplicate column')) {
      console.log('ℹ️ popular column पहले से मौजूद है');
    } else {
      console.error('❌ Error:', error);
    }
  }
}

export async function addAddressColumns() {
  try {
    await turso.execute(`ALTER TABLE orders ADD COLUMN shipping_address TEXT`);
    await turso.execute(`ALTER TABLE orders ADD COLUMN city TEXT`);
    await turso.execute(`ALTER TABLE orders ADD COLUMN state TEXT`);
    await turso.execute(`ALTER TABLE orders ADD COLUMN pincode TEXT`);
    console.log('✅ Address columns जुड़ गए!');
  } catch (error) {
    if (error.message.includes('duplicate column')) {
      console.log('ℹ️ Columns पहले से मौजूद हैं');
    } else {
      console.error('❌ Error:', error);
    }
  }
}