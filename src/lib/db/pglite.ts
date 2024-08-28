import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import * as schema from "./schema";

let _client: PGlite;
const createDatabase = () => {
  if (!_client) {
    _client = new PGlite();
  }

  const db = drizzle(_client, {
    schema,
  });

  return { db, client: _client };
};

export default createDatabase;
