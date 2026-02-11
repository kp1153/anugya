// scripts/testConnection.js
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function test() {
  try {
    console.log('🔍 Connecting...');
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Connected:', result.rows[0]);
  } catch (error) {
    console.error('❌ Full Error:');
    console.error(error);
  } finally {
    await pool.end();
  }
}

test();