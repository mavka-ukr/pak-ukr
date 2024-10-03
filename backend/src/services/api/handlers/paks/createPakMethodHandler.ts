import { AuthorizedMethodContext } from "../../../../application/index.js";
import { PakDb } from "../../../../database/main/models/Pak.js";
import { PAK_ERROR_INVALID_PAK_NAME } from "../../../../application/errors.js";

function isPakNameValid(name: string): boolean {
  return /[а-яґіїєʼ]/giu.test(name);
}

async function createPakMethodHandler(
  params: {
    name: string;
    description: string;
  },
  context: AuthorizedMethodContext,
) {
  if (!isPakNameValid(params.name)) {
    throw PAK_ERROR_INVALID_PAK_NAME;
  }
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
