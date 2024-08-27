import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
export * from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const queryClient = postgres(process.env.DATABASE_URL);
export const db = drizzle(queryClient, {
  logger: true,
  schema,
});

export default db;
