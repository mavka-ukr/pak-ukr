import { MethodContext } from "../../../../application/index.js";
import {
  dbFindUserById,
  dbFindUserByUsername,
} from "../../../../database/main/repositories/users.js";

async function findUserByUsernameMethodHandler(
  params: {
    username: string;
  },
  context: MethodContext,
) {
  if (/[аА][0-9]+/.test(params.username)) {
    const id = Number(params.username.slice(1));
    return await dbFindUserById(id);
  }
  return await dbFindUserByUsername(params.username);
}

export default findUserByUsernameMethodHandler;
