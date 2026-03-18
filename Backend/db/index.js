import { drizzle } from 'drizzle-orm/node-postgres';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing. Add it to your .env file.');
}

const db = drizzle(process.env.DATABASE_URL);

export { db };
