import getPgLiteClient from "./pglite";
import getPgClient from "./postgres";
export * from "./schema";

export const { db, client } =
  process.env.NODE_ENV === "test" ? getPgLiteClient() : getPgClient();

export default db;
