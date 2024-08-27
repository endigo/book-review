import Link from "next/link";
import { redirect } from "next/navigation";

import { registerUser } from "~/services/user-service";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export const SignUp = () => {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await registerUser({ email, password });

    // TOOD: show success message
    redirect("/");
  };
  return (
    <Card className="w-full max-w-sm">
      <form action={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>Enter your email below to sign up.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <div className="grid gap-2">
            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            az
            <Link href="/" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </form>
    </Card>
  );
};
