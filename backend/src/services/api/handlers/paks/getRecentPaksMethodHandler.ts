import { dbGetRecentPaks } from "../../../../database/main/repositories/paks.js";
import { MethodContext } from "../../../../application/index.js";

async function getRecentPaksMethodHandler(
  params: {
    limit: number;
    cursorId: number | null;
  },
  context: MethodContext
) {
  return await dbGetRecentPaks(
    params.limit,
    params.cursorId
  );
}

export default getRecentPaksMethodHandler;
