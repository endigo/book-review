import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUser } from "~/services/user-service";
import { hashPassword } from "./helpers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        if (!credentials.email) {
          throw new Error("username is missing!");
        }

        if (!credentials.password) {
          throw new Error("password is missing!");
        }

        user = await getUser(
          credentials.email as string,
          credentials.password as string
        );

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        // return user object with their profile data
        return user;
      },
    }),
  ],
});
