import { hashSync, compareSync } from "bcrypt";

export const hashPassword = (plain: string) => {
  return hashSync(plain, 10);
};

export const compareHash = (plain: string, hash: string) => {
  return compareSync(plain, hash);
};
