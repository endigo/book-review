import { eq, sql } from "drizzle-orm";
import { db, books as Books, reviews } from "~/lib/db";

export const insertBook = async (data: Partial<typeof Books.$inferInsert>) => {
  return db.insert(Books).values(data).returning();
};

export const getList = async () => {
  return db
    .select({
      id: Books.id,
      name: Books.name,
      description: Books.description,
      rating: sql<number>`avg(${reviews.rating})`,
      reviewCount: sql<number>`count(${reviews.rating})`,
    })
    .from(Books)
    .leftJoin(reviews, eq(Books.id, reviews.bookId))
    .groupBy(Books.id);
};

export const getBook = async (id: string) => {
  const books = await db
    .select({
      id: Books.id,
      name: Books.name,
      description: Books.description,
      rating: sql<number>`avg(${reviews.rating})`,
      reviewCount: sql<number>`count(${reviews.rating})`,
    })
    .from(Books)
    .leftJoin(reviews, eq(Books.id, reviews.bookId))
    .groupBy(Books.id)
    .where(eq(Books.id, id))
    .limit(1);

  if (books.length === 0) {
    return null;
  }

  return books[0];
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
