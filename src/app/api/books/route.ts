import { db, books as Books, insertBookSchema } from "~/lib/db";

const requestSchema = insertBookSchema.pick({
  name: true,
  description: true,
  isbn: true,
});

const createBook = async (book: ReturnType<requestSchema.parse>) => {
  const books = await db.insert(Books).values(book).returning();
};

// http://localhost:3000/api/books
export async function GET(request: Request) {
  const books = await db.select().from(Books);

  return Response.json({ data: books });
}

export async function POST(request: Request) {
  const body = await request.json();

  const book = requestSchema.parse(body);

  const books = await createBook(book);

  return Response.json({ data: books });
}
