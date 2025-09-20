import mysql from 'mysql2/promise';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from '@config/config';

let connection: mysql.Connection;

export const connectToDatabase = async () => {
  try {
    connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });
    console.log('✅ Connected to MySQL');
  } catch (error) {
    console.error('❌ MySQL connection failed:', error);
    process.exit(1);
  }
};

export const getConnection = () => {
  if (!connection) throw new Error('Database not connected!');
  return connection;
};

export const closeDatabaseConnection = async () => {
  if (connection) {
    await connection.end();
    console.log('Database disconnected');
  }
};
