import { MethodContext } from "../../../../application/index.js";
import { dbFindPakByName } from "../../../../database/main/repositories/paks.js";

async function findPakByNameMethodHandler(
  params: {
    name: string;
  },
  context: MethodContext,
) {
  return await dbFindPakByName(params.name);
}

export default findPakByNameMethodHandler;
