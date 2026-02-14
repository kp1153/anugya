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
    CREATE TABLE IF NOT EXISTS authors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      photo TEXT,
      biography TEXT,
      birth_date TEXT,
      death_date TEXT,
      view_count INTEGER DEFAULT 0
    )
  `);

  await turso.execute(`
    CREATE TABLE IF NOT EXISTS translators (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      photo TEXT,
      biography TEXT,
      birth_date TEXT,
      death_date TEXT,
      view_count INTEGER DEFAULT 0
    )
  `);

  await turso.execute(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      isbn TEXT,
      title TEXT NOT NULL,
      author_id INTEGER,
      translator_id INTEGER,
      category TEXT NOT NULL,
      subcategory TEXT,
      language TEXT DEFAULT 'Hindi',
      pages INTEGER,
      length REAL,
      width REAL,
      height REAL,
      weight REAL,
      publication_year INTEGER,
      is_multi_volume BOOLEAN DEFAULT 0,
      number_of_volumes INTEGER DEFAULT 1,
      paperback_single_price REAL,
      hardbound_single_price REAL,
      paperback_set_price REAL,
      hardbound_set_price REAL,
      cover_image TEXT,
      description TEXT,
      stock INTEGER DEFAULT 0,
      featured BOOLEAN DEFAULT 0,
      popular BOOLEAN DEFAULT 0,
      view_count INTEGER DEFAULT 0,
      FOREIGN KEY (author_id) REFERENCES authors(id),
      FOREIGN KEY (translator_id) REFERENCES translators(id)
    )
  `);

  await turso.execute(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_name TEXT NOT NULL,
      user_email TEXT NOT NULL,
      user_phone TEXT NOT NULL,
      shipping_address TEXT,
      city TEXT,
      state TEXT,
      pincode TEXT,
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

export async function updateSchema() {
  try {
    await turso.execute(`ALTER TABLE books ADD COLUMN publication_year INTEGER`);
    await turso.execute(`ALTER TABLE books ADD COLUMN subcategory TEXT`);
    await turso.execute(`ALTER TABLE books ADD COLUMN view_count INTEGER DEFAULT 0`);
    await turso.execute(`ALTER TABLE authors ADD COLUMN view_count INTEGER DEFAULT 0`);
    await turso.execute(`ALTER TABLE translators ADD COLUMN view_count INTEGER DEFAULT 0`);
    await turso.execute(`ALTER TABLE books ADD COLUMN slug TEXT UNIQUE`);
    await turso.execute(`ALTER TABLE books ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP`);
    await turso.execute(`ALTER TABLE books ADD COLUMN is_new_release BOOLEAN DEFAULT 0`);
    console.log('Schema updated successfully!');
  } catch (error) {
    console.log('Some columns may already exist:', error.message);
  }
}