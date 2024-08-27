import { eq, and } from "drizzle-orm";
import { db, reviews as Reviews } from "~/lib/db";

export const insertReview = async (
  data: Partial<typeof Reviews.$inferInsert>
) => {
  return db.insert(Reviews).values(data).returning();
};

export const getListByBookId = async (bookId: string) => {
  return db.query.reviews.findMany({
    where: eq(Reviews.bookId, bookId),
  });
};

export const deleteReview = async (id: string) => {
  return db.delete(Reviews).where(eq(Reviews.id, id)).returning();
};
