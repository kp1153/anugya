import { addAddressColumns } from './db.js';

async function update() {
  console.log('🔧 Columns add कर रहे हैं...');
  await addAddressColumns();
  process.exit(0);
}

update().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});