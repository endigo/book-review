import { eq } from "drizzle-orm";
import { db, books as Books } from "~/lib/db";

export const insertBook = async (data: Partial<typeof Books.$inferInsert>) => {
  return db.insert(Books).values(data).returning();
};

export const getList = async () => {
  // TODO: add computed avg_rating field
  return db.query.books.findMany();
};

export const getBook = async (id: string) => {
  return db.query.books.findFirst({
    where: eq(Books.id, id),
    with: {
      reviews: true,
    },
  });
};

export const deleteBook = async (id: string) => {
  return db.delete(Books).where(eq(Books.id, id)).returning();
};

export const updateBook = async (
  id: string,
  data: Partial<typeof Books.$inferInsert>
) => {
  return db.update(Books).set(data).where(eq(Books.id, id)).returning();
};
