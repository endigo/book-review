import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import * as schema from "./schema";

let client: PGlite;
const createDatabase = () => {
  if (!client) {
    client = new PGlite();
  }

  const db = drizzle(client, {
    schema,
  });

  return { db, client };
};

export default createDatabase;
