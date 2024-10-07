import { MethodContext } from "../../../../application/index.js";
import { dbFindPakVersionByPakIdAndName } from "../../../../database/main/repositories/pakVersions.js";

async function findPakVersionByPakIdAndNameMethodHandler(
  params: {
    pakId: number;
    name: string;
  },
  context: MethodContext,
) {
  return await dbFindPakVersionByPakIdAndName(params.pakId, params.name);
}

export default findPakVersionByPakIdAndNameMethodHandler;
