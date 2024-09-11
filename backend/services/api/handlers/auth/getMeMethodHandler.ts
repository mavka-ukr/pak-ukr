import { AuthorizedMethodContext } from "../../../../application/index.js";
import { User } from "../../../../database/main/models/User.js";

async function getMeMethodHandler(
  params: {},
  context: AuthorizedMethodContext
): Promise<User> {
  return context.authorization.user;
}

export default getMeMethodHandler;
