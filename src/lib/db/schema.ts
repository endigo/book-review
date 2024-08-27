import { relations } from "drizzle-orm";
import {
  PgColumnBuilderBase,
  pgTable,
  uuid,
  jsonb,
  text,
  timestamp,
  varchar,
  date,
  integer,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm/sql";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

const metadataField: Record<string, PgColumnBuilderBase> = {
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
};
const timestampFields: Record<string, PgColumnBuilderBase> = {
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
};
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  ...timestampFields,
  ...metadataField,
  name: text("name"),
  email: varchar("email", { length: 256 }),
  passwordHash: varchar("password_hash", { length: 256 }),
});

export const books = pgTable("books", {
  id: uuid("id").defaultRandom().primaryKey(),
  ...timestampFields,
  ...metadataField,
  name: text("name"),
  description: text("description"),
  publication_date: date("publication_date"),
  isbn: varchar("isbn", { length: 13 }),
  authors: text("authors"),
});

export const reviews = pgTable("reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  ...timestampFields,
  ...metadataField,
  bookId: uuid("book_id"),
  userId: uuid("user_id"),
  reviewText: text("review_text"),
  rating: integer("rating"), // Check CONSTRAINT is not implemented yet
});

export const usersRelations = relations(users, ({ many }) => ({
  reviews: many(reviews),
}));

export const reviewsRelation = relations(reviews, ({ one }) => ({
  book: one(books, {
    fields: [reviews.bookId],
    references: [books.id],
  }),
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
}));

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export const insertBookSchema = createInsertSchema(books, {
  name: z.string(),
  description: z.string(),
  isbn: (schema) => schema.isbn.length(13),
});
export const selectBookSchema = createSelectSchema(books);

export const insertReviewSchema = createInsertSchema(reviews, {
  bookId: z.string().uuid(),
  userId: z.string().uuid(),
  reviewText: z.string(),
  rating: z.number().min(1).max(5).default(5),
});

export const selectReviewSchema = createSelectSchema(reviews);
