import { eq } from "drizzle-orm";
import { db, books as Books } from "~/lib/db";

export const insertBook = async (book: Partial<typeof Books.$inferInsert>) => {
  return db.insert(Books).values(book).returning();
};

export const getList = async () => {
  return db.select().from(Books);
};

export const getBook = async (id: string) => {
  return db.select().from(Books).where(eq(Books.id, id));
};

export const deleteBook = async (id: string) => {
  return db
    .delete(Books)
    .where(eq(Books.id, id))
    .returning({ deletedId: Books.id });
};

export const updateBook = async (
  id: string,
  data: Partial<typeof Books.$inferInsert>
) => {
  return db.update(Books).set(data).where(eq(Books.id, id)).returning();
};
