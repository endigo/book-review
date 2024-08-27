import { getBook, deleteBook, updateBook } from "~/app/api/books/service";
import { insertBookSchema } from "~/lib/db";

const requestSchema = insertBookSchema.pick({
  name: true,
  description: true,
  isbn: true,
});

// GET http://localhost:3000/api/books/[id]
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const book = await getBook(params.id);

  return Response.json({ data: book });
}

// DELETE http://localhost:3000/api/books/[id]
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const deletedBookIds = await deleteBook(params.id);

  return Response.json({ data: deletedBookIds });
}

// PUT http://localhost:3000/api/books/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const data = requestSchema.parse(body);

  const book = await updateBook(params.id, data);

  return Response.json({ data: book });
}
