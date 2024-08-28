"use client";
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
import { Ratings } from "~/components/ui/rating";
import { useToast } from "~/components/ui/use-toast";

export const ReviewForm = ({ bookId }: { bookId: string }) => {
  const { toast } = useToast();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const rating = (e.target as any).elements["rating"].value;
    const review = (e.target as any).elements["review"].value;

    if (!review.length) {
      toast({
        title: "Error",
        description: "Review cannot be empty",
        variant: "destructive",
      });
      return;
    }

    await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify({
        rating: parseInt(rating),
        reviewText: review,
        bookId: bookId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        if (res.message) {
          let message = res.message;

          if (
            message.includes("duplicate key value violates unique constraint")
          ) {
            message = "Sorry, you have already reviewed this book";
          }

          toast({
            title: "Error",
            description: message,
            variant: "destructive",
          });
          return;
        }
        toast({
          title: "Success",
          description: "Review added successfully",
        });
      });
  };

  return (
    <Card className="min-w-[350px]">
      <form onSubmit={handleSubmit}>
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
  );
};
