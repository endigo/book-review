import { sql } from "drizzle-orm";
import { afterAll, beforeAll } from "vitest";

import { db, client } from "../src/lib/db";
import { applyMigrations } from "../src/lib/db/migrate";

// Apply migrations before each test
beforeAll(async () => {
  console.log("Applying migrations...");
  await applyMigrations();
  console.log("Applying migrations ends");
});

// Free up resources after all tests are done
afterAll(async () => {
  await db.execute(sql`drop schema if exists public cascade`);
  await db.execute(sql`create schema public`);
  await db.execute(sql`drop schema if exists drizzle cascade`);

  client.close();
});
