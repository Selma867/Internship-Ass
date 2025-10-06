import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Create connection pool
export const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'registration_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  max: 20, // maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Function to get database connection
export const getDB = () => {
  return pool;
};

// Initialize database tables
export const initDB = async (): Promise<void> => {
  const client = await pool.connect();
  
  try {
    console.log('🔄 Initializing database...');
    
    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        personal_info JSONB NOT NULL,
        residential_address JSONB NOT NULL,
        postal_address JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes for better performance
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_users_email 
      ON users ((personal_info->>'email'))
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_users_created_at 
      ON users (created_at)
    `);

    console.log('✅ PostgreSQL database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  } finally {
    client.release();
  }
};