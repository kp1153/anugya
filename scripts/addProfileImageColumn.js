// scripts/addProfileImageColumn.js
import { config } from 'dotenv';
import { createClient } from '@libsql/client';

config({ path: '.env.local' });

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
});

async function addColumn() {
  try {
    await client.execute('ALTER TABLE authors ADD COLUMN profile_image TEXT');
    console.log('✅ profile_image column added');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

addColumn();