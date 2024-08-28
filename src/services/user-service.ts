import { eq } from "drizzle-orm";
import { db, users as Users } from "~/lib/db";
import { hashPassword, compareHash } from "~/lib/helpers";

export const registerUser = (
  data: Pick<typeof Users.$inferInsert, "email"> & { password: string }
) => {
  // validate data
  const passwordHash = hashPassword(data.password);

  return insertUser({
    email: data.email,
    name: data.email?.split("@")[0],
    passwordHash,
  });
};

export const insertUser = async (data: Partial<typeof Users.$inferInsert>) => {
  const [user] = await db.insert(Users).values(data).returning();
  return user;
};

export const getUser = async (email: string, plainPassword: string) => {
  const user = await db.query.users.findFirst({
    where: eq(Users.email, email),
  });

  if (!user) {
    return null;
  }

  if (!compareHash(plainPassword, user.passwordHash!)) {
    return null;
  }

  const { passwordHash, ...rest } = user;

  return rest;
};
