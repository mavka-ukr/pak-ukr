import { AuthorizedMethodContext } from "../../../../application/index.js";
import { PakDb } from "../../../../database/main/models/Pak.js";

async function createPakMethodHandler(
  params: {
    name: string;
    description: string;
  },
  context: AuthorizedMethodContext,
) {
  const pak = await PakDb.save({
    user_id: context.authorization.user.id,
    is_deleted: false,
    name: params.name,
    description: params.description,
    code_url: "",
    docs_url: "",
  });
  return pak;
}

export default createPakMethodHandler;
