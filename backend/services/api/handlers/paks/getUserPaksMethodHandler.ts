import { dbGetUserPaks } from "../../../../database/main/repositories/paks.js";
import { MethodContext } from "../../../../application/index.js";

async function getUserPaksMethodHandler(
  params: {
    userId: number;
    limit: number;
    cursorId: number | null;
  },
  context: MethodContext,
) {
  return await dbGetUserPaks(params.userId, params.limit, params.cursorId);
}

export default getUserPaksMethodHandler;
