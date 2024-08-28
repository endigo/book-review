import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
export * from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export default () => {
  const client = postgres(process.env.DATABASE_URL);
  const db = drizzle(client, {
    logger: true,
    schema,
  });

  return {
    client,
    db,
  };
};
