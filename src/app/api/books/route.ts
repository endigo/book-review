import { insertBookSchema } from "~/lib/db";
import { BookService } from "~/services/book-service";

const requestSchema = insertBookSchema.pick({
  name: true,
  description: true,
  isbn: true,
});

// http://localhost:3000/api/books
export async function GET(request: Request) {
  const service = BookService.getInstance();
  const books = await service.getBooks();

  return Response.json({ data: books });
}

export async function POST(request: Request) {
  const body = await request.json();

  const book = requestSchema.parse(body);
  const service = BookService.getInstance();
  const books = await service.createBook(book);

  return Response.json({ data: books });
}
