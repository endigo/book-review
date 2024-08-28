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
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";

import { BookService } from "~/services/book-service";
import { auth } from "~/lib/auth";

export default async function BooksCreate() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const handleSubmit = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    const isbn = formData.get("isbn") as string;
    const description = formData.get("description") as string;

    const service = BookService.getInstance();

    await service.createBook({ name, isbn, description });

    redirect("/?message=Book added!");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card className="w-[350px]">
        <form action={handleSubmit}>
          <CardHeader>
            <CardTitle>Add a book</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Name of book" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="isbn">ISBN</Label>
                <Input
                  id="isbn"
                  name="isbn"
                  placeholder="Name of ISBN (13 digits)"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Description"
                />
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
