const { Client } = require('pg');
require('dotenv').config();

async function testConnection() {
    console.log('Testing Database Connection...');
    console.log('URL:', process.env.DATABASE_URL.replace(/:[^:@]+@/, ':****@')); // Hide password

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();
        console.log('✅ Success: Database connected successfully.');
        const res = await client.query('SELECT current_database(), version();');
        console.log('Database Info:', res.rows[0]);
        await client.end();
    } catch (err) {
        console.error('❌ Error: Database connection failed.');
        console.error(err.message);
        process.exit(1);
    }
}

testConnection();
