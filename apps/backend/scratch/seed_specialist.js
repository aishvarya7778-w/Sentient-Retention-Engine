const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function seed() {
    const username = 'satyam001';
    const password = process.env.SPECIALIST_PASSWORD || 'sentient2024';
    const email = 'satyam@sentient.ai';
    const companyName = 'Sentient AI';
    
    console.log(`Seeding specialist: ${username}`);
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            'INSERT INTO specialists (username, password, email, company_name, role) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (username) DO UPDATE SET password = $2',
            [username, hashedPassword, email, companyName, 'admin']
        );
        console.log('✅ Success: Specialist seeded successfully.');
    } catch (err) {
        console.error('❌ Error seeding specialist:', err.message);
    } finally {
        await pool.end();
    }
}

seed();
