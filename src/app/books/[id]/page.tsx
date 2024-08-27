import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  Card,
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
import { insertReview } from "~/services/review-service";
import { auth } from "~/lib/auth";

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
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const rating = formData.get("rating") as string;
    const review = formData.get("review") as string;

    await insertReview({
      rating: parseInt(rating),
      reviewText: review,
      bookId: book?.id,
      userId: session?.user?.id,
    });

    redirect("/?message=Review added!");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card className="w-[350px]">
        <form action={handleSubmit}>
          <CardHeader>
            <CardTitle>Add review: {book?.name}</CardTitle>
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
            <Button asChild variant="outline">
              <Link href="/">Cancel</Link>
            </Button>
            <Button type="submit">Create</Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
