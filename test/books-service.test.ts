import { expect, it, describe, beforeAll, afterAll } from "vitest";
import { faker } from "@faker-js/faker";
import { BookService } from "../src/services/book-service";
import getPgLiteClient from "../src/lib/db/pglite";

describe("BooksService", () => {
  let service: BookService;
  beforeAll(async () => {
    const { db } = getPgLiteClient();
    service = BookService.create(db);
  });

  it("creates a book", async () => {
    const data = {
      name: faker.string.alpha(),
      isbn: faker.string.numeric(13),
      description: faker.string.sample(),
    };

    const books = await service.createBook(data);
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
      await service.createBook(data);
    } catch (error: any) {
      expect(error.message).toContain(
        "value too long for type character varying(13)"
      );
    }
  });
});
