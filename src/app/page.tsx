import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Ratings } from "~/components/ui/rating";
import { BookService } from "~/services/book-service";

export default async function Home() {
  const service = BookService.getInstance();
  const data = await service.getBooks();

  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1 className="text-2xl font-bold mb-2">Books</h1>
      <h3 className="text-xl mb-2">
        What are you reading recently?. Give a review
      </h3>
      {data.map((book) => (
        <Card key={book.id} className="mb-2">
          <CardHeader>
            <CardTitle>{book.name}</CardTitle>
            <CardDescription>{book.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="my-2 flex items-center">
              <Ratings rating={book.rating ?? 0} />
              <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
              <div>{book.reviewCount} reviews</div>
            </div>
            <div className="my-4">
              <Button asChild>
                <Link href={`/books/${book.id}`}>See book reviews</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="my-4">
        <Button asChild>
          <Link href="/books/create">Add a book</Link>
        </Button>
      </div>
    </main>
  );
}
