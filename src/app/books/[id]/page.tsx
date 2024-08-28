import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";

import { getBook, insertBook } from "~/services/book-service";
import { Ratings } from "~/components/ui/rating";
import { getListByBookId, insertReview } from "~/services/review-service";
import { auth } from "~/lib/auth";
import { Review } from "~/components/ui/review";

export default async function BookReview({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const book = await getBook(params.id);

  if (!book) {
    return <div>Book not found!</div>;
  }

  const reviews = await getListByBookId(book.id);

  const handleSubmit = async (formData: FormData) => {
    "use server";
    const rating = formData.get("rating") as string;
    const review = formData.get("review") as string;

    if (!review.length) {
      return alert("Review cannot be empty!");
    }

    await insertReview({
      rating: parseInt(rating),
      reviewText: review,
      bookId: book?.id,
      userId: session?.user?.id,
    });
  };

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

      <Card className="min-w-[350px]">
        <form action={handleSubmit}>
          <CardHeader>
            <CardTitle>Add review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="rating">Rating</Label>
                <Select name="rating" defaultValue="5">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={<Ratings rating={5} />} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">
                      <Ratings rating={1} />
                    </SelectItem>
                    <SelectItem value="2">
                      <Ratings rating={2} />
                    </SelectItem>
                    <SelectItem value="3">
                      <Ratings rating={3} />
                    </SelectItem>
                    <SelectItem value="4">
                      <Ratings rating={4} />
                    </SelectItem>
                    <SelectItem value="5">
                      <Ratings rating={5} />
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="review">Your review</Label>
                <Textarea id="review" name="review" placeholder="Review text" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="reset" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
