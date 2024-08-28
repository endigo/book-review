import { eq } from "drizzle-orm";
import { DB, db, users as Users } from "~/lib/db";
import { hashPassword, compareHash } from "~/lib/helpers";

let _instance: UserService;
export class UserService {
  constructor(private database: DB) {}
  static getInstance(database: DB = db) {
    if (!_instance) {
      _instance = new UserService(database);
    }

    return _instance;
  }

  registerUser = (
    data: Pick<typeof Users.$inferInsert, "email"> & { password: string }
  ) => {
    // validate data
    const passwordHash = hashPassword(data.password);

    return this.insertUser({
      email: data.email,
      name: data.email?.split("@")[0],
      passwordHash,
    });
  };

  private async insertUser(data: Partial<typeof Users.$inferInsert>) {
    const [user] = await this.database.insert(Users).values(data).returning();
    return user;
  }

  getUser = async (email: string, plainPassword: string) => {
    const user = await this.database.query.users.findFirst({
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
}
