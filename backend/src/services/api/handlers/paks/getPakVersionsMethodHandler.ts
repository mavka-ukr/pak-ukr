import { MethodContext } from "../../../../application/index.js";
import { dbGetPakVersions } from "../../../../database/main/repositories/pakVersions.js";

async function getPakVersionsMethodHandler(
  params: {
    pakId: number;
    limit: number;
    cursorId: number | null;
  },
  context: MethodContext,
) {
  return await dbGetPakVersions(params.pakId, params.limit, params.cursorId);
}

export default getPakVersionsMethodHandler;
