import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@codemasters/db"

const connectionString = Deno.env.get('POSTGRES_URL')!;
export const db = drizzle(connectionString, {schema});
