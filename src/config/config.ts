import dotenv from 'dotenv';
dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 5000;

// MySQL DB
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = parseInt(process.env.DB_PORT || '3306');
export const DB_USER = process.env.DB_USER || 'jps_user';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'Password@123!';
export const DB_NAME = process.env.DB_NAME || 'jps_backend';

export const LOG_FORMAT = process.env.LOG_FORMAT || 'dev';
export const ORIGIN = process.env.ORIGIN || '*';
export const CREDENTIALS = process.env.CREDENTIALS === 'true';
