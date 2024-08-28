import { migrate } from "drizzle-orm/pglite/migrator";

import { db } from "~/lib/db";

async function applyMigrations() {
  await migrate(db, { migrationsFolder: "drizzle" });
}

export { applyMigrations };
