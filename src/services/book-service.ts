import { eq, sql } from "drizzle-orm";
import { DB, db, books as Books, reviews } from "~/lib/db";

export let bookServiceInstance: BookService;
export class BookService {
  constructor(private database: DB) {}

  static create(database: DB = db) {
    if (!bookServiceInstance) {
      bookServiceInstance = new BookService(database);
    }

    return bookServiceInstance;
  }
  async getBook(id: string) {
    const books = await this.database
      .select({
        id: Books.id,
        name: Books.name,
        description: Books.description,
        rating: sql<number>`avg(${reviews.rating})`,
        reviewCount: sql<number>`count(${reviews.rating})`,
      })
      .from(Books)
      .leftJoin(reviews, eq(Books.id, reviews.bookId))
      .where(eq(Books.id, id))
      .groupBy(Books.id);
    if (books.length === 0) {
      throw new Error("Book not found");
    }
    return books[0];
  }

  async getBooks() {
    const books = await this.database
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
    if (books.length === 0) {
      throw new Error("Book not found");
    }
    return books;
  }

  async createBook(data: Partial<typeof Books.$inferInsert>) {
    return this.database.insert(Books).values(data).returning();
  }
  async updateBook(id: string, data: Partial<typeof Books.$inferInsert>) {
    return this.database
      .update(Books)
      .set(data)
      .where(eq(Books.id, id))
      .returning();
  }

  async deleteBook(id: string) {
    return this.database.delete(Books).where(eq(Books.id, id)).returning();
  }
}
