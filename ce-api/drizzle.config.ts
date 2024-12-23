import { defineConfig } from 'npm:drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: Deno.env.get("POSTGRES_URL")!,
  },
});
