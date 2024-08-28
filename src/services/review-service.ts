import { eq } from "drizzle-orm";
import { DB, db, reviews as Reviews } from "~/lib/db";

let _instance: ReviewService;
export class ReviewService {
  constructor(private database: DB) {}
  static getInstance(database: DB = db) {
    if (!_instance) {
      _instance = new ReviewService(database);
    }

    return _instance;
  }

  async insertReview(data: Partial<typeof Reviews.$inferInsert>) {
    return this.database.insert(Reviews).values(data).returning();
  }

  async getListByBookId(bookId: string) {
    return this.database.query.reviews.findMany({
      where: eq(Reviews.bookId, bookId),
      with: {
        user: true,
      },
    });
  }

  async deleteReview(id: string) {
    return this.database.delete(Reviews).where(eq(Reviews.id, id)).returning();
  }
}

export default ReviewService;
