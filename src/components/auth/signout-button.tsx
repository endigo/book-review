import { signOut } from "~/lib/auth";
import { Button } from "~/components/ui/button";

export function LogOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit">Log Out</Button>
    </form>
  );
}
