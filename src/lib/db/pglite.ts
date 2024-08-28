import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import * as schema from "./schema";

export default () => {
  const client = new PGlite();
  const db = drizzle(client, {
    schema,
  });

  return { db, client };
};
