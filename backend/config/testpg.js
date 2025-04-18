// testpg.js
import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  }
});

client.connect()
  .then(() => console.log('✅ Connected using pg directly!'))
  .catch(err => console.error('❌ pg failed:', err));
