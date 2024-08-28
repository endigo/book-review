import { expect, it, describe, beforeAll, afterAll } from "vitest";
import { faker } from "@faker-js/faker";
import { insertBook } from "../src/services/book-service";

describe("BooksService", () => {
  it("creates a book", async () => {
    const data = {
      name: faker.string.alpha(),
      isbn: faker.string.numeric(13),
      description: faker.string.sample(),
    };

    const books = await insertBook(data);
    expect(books).toHaveLength(1);
    expect(books[0]).toBeDefined();
    expect(books[0].name).toBe(data.name);
  });
  it("will fail when isbn is longer than 13", async () => {
    const data = {
      name: faker.string.alpha(),
      isbn: faker.string.numeric(15),
      description: faker.string.sample(),
    };
    try {
      await insertBook(data);
    } catch (error: any) {
      expect(error.message).toContain(
        "value too long for type character varying(13)"
      );
    }
  });
});
