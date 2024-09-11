import { MethodContext } from "../../../../application/index.js";
import { dbGetRecentUsersForUser } from "../../../../database/main/repositories/users.js";

async function getRecentUsersMethodHandler(
  params: {
    limit: number;
    cursorId: number | null;
  },
  context: MethodContext
) {
  return await dbGetRecentUsersForUser(
    context.authorization?.user,
    params.limit,
    params.cursorId
  );
}

export default getRecentUsersMethodHandler;
