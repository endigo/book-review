import { expect, it, describe, beforeAll } from "vitest";
import { faker } from "@faker-js/faker";
import { books, users } from "../src/lib/db/schema";
import { BookService } from "../src/services/book-service";
import { UserService } from "../src/services/user-service";
import { ReviewService } from "../src/services/review-service";
import getPgLiteClient from "../src/lib/db/pglite";

describe("ReviewService", () => {
  let user: Partial<typeof users.$inferInsert>;
  let book: typeof books.$inferInsert;

  let bookService: BookService;
  let reviewService: ReviewService;
  let userService: UserService;
  beforeAll(async () => {
    const { db } = getPgLiteClient();
    bookService = BookService.getInstance(db);
    reviewService = ReviewService.getInstance(db);
    userService = UserService.getInstance(db);

    user = await userService.registerUser({
      email: faker.internet.email(),
      password: faker.string.alpha(8),
    });

    const data = {
      name: faker.string.alpha(),
      isbn: faker.string.numeric(13),
      description: faker.string.sample(),
    };

    const books = await bookService.createBook(data);

    book = books[0];
  });

  it("store review successfully", async () => {
    const data = {
      rating: faker.number.int({ max: 5, min: 1 }),
      userId: user.id,
      bookId: book.id,
      reviewText: faker.string.sample(),
    };

    const reviews = await reviewService.insertReview(data);
    expect(reviews).toHaveLength(1);
    expect(reviews[0]).toBeDefined();
    expect(reviews[0].reviewText).toBe(data.reviewText);
    expect(reviews[0].rating).toBe(data.rating);
  });

  it("throws error when user already left review", async () => {
    const data = {
      rating: faker.number.int({ max: 5, min: 1 }),
      userId: user.id,
      bookId: book.id,
      reviewText: faker.string.sample(),
    };
    try {
      await reviewService.insertReview(data);
    } catch (error: any) {
      expect(error.message).toContain("peruesr");
    }
  });
});
