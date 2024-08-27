import { eq, sql } from "drizzle-orm";
import { db, books as Books, reviews } from "~/lib/db";

export const insertBook = async (data: Partial<typeof Books.$inferInsert>) => {
  return db.insert(Books).values(data).returning();
};

export const getList = async () => {
  // TODO: add computed avg_rating field
  // return db.query.books.findMany();
  return db
    .select({
      id: Books.id,
      name: Books.name,
      description: Books.description,
      rating: sql<number>`avg(${reviews.rating})`,
    })
    .from(Books)
    .leftJoin(reviews, eq(Books.id, reviews.bookId))
    .groupBy(Books.id);
};

export const getBook = async (id: string) => {
  return db.query.books.findFirst({
    where: eq(Books.id, id),
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
