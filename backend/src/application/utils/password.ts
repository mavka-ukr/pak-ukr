import bcrypt from "bcrypt";

export function checkPassword(
  password: string,
  hashedPassword: string,
): boolean {
  hashedPassword = hashedPassword.replace(/^\$2y(.+)$/i, "$2a$1");
  return bcrypt.compareSync(password, hashedPassword);
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}
