import { DB_HOST, DB_PORT, DB_USER, DB_NAME } from '@config/config';

/**
 * Validates essential environment variables before starting the app.
 */
const validateEnv = () => {
  if (!DB_HOST) throw new Error('DB_HOST is not defined in .env');
  if (!DB_PORT) throw new Error('DB_PORT is not defined in .env');
  if (!DB_USER) throw new Error('DB_USER is not defined in .env');
  if (!DB_NAME) throw new Error('DB_NAME is not defined in .env');
};

export default validateEnv;
