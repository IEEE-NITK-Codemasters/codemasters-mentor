import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema.ts';

const connectionString = Deno.env.get('POSTGRES_URL')!;
export const db = drizzle(connectionString , { schema });
