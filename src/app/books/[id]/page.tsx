import { redirect } from "next/navigation";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { getBook } from "~/services/book-service";
import { getListByBookId } from "~/services/review-service";
import { auth } from "~/lib/auth";
import { Review } from "~/components/ui/review";
import { ReviewForm } from "~/components/ui/review-form";

export default async function BookReview({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  const book = await getBook(params.id);

  if (!book) {
    return <div>Book not found!</div>;
  }

  const reviews = await getListByBookId(book.id);

  console.log(JSON.stringify(reviews));

  return (
    <main className="flex min-h-screen flex-col p-24">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{book?.name}</CardTitle>
          <CardDescription>{book.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {reviews.map((review) => (
            <Review key={review.id} review={review} />
          ))}
        </CardContent>
      </Card>
      <ReviewForm bookId={book.id} />
    </main>
  );
}
