import { expect, it, describe, beforeAll } from "vitest";
import { faker } from "@faker-js/faker";
import { books, users } from "../src/lib/db/schema";
import { insertBook } from "../src/services/book-service";
import { registerUser } from "../src/services/user-service";
import { insertReview } from "../src/services/review-service";

describe("ReviewService", () => {
  let user: Partial<typeof users.$inferInsert>;
  let book: typeof books.$inferInsert;
  beforeAll(async () => {
    user = await registerUser({
      email: faker.internet.email(),
      password: faker.string.alpha(8),
    });

    const data = {
      name: faker.string.alpha(),
      isbn: faker.string.numeric(13),
      description: faker.string.sample(),
    };

    const books = await insertBook(data);

    book = books[0];
  });
  it("store review successfully", async () => {
    const data = {
      rating: faker.number.int({ max: 5, min: 1 }),
      userId: user.id,
      bookId: book.id,
      reviewText: faker.string.sample(),
    };

    const reviews = await insertReview(data);
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
      await insertReview(data);
    } catch (error: any) {
      expect(error.message).toContain("peruesr");
    }
  });
});
