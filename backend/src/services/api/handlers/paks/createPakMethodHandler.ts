import { AuthorizedMethodContext } from "../../../../application/index.js";
import { PakDb } from "../../../../database/main/models/Pak.js";
import {
  PAK_ERROR_INVALID_PAK_NAME,
  PAK_ERROR_PAK_NAME_NOT_AVAILABLE,
} from "../../../../application/errors.js";

function isPakNameValid(name: string): boolean {
  return /[а-яґіїєʼ]/giu.test(name);
}

async function isPakNameAvailable(name: string): Promise<boolean> {
  const pakByName = await PakDb.query()
    .whereRaw("lower(name) = ?", name.toLowerCase())
    .first();
  if (pakByName) {
    return false;
  }
  return true;
}

async function createPakMethodHandler(
  params: {
    name: string;
    description: string;
    docsUrl: string;
    sourceUrl: string;
  },
  context: AuthorizedMethodContext,
) {
  if (!isPakNameValid(params.name)) {
    throw PAK_ERROR_INVALID_PAK_NAME;
  }
  if (!(await isPakNameAvailable(params.name))) {
    throw PAK_ERROR_PAK_NAME_NOT_AVAILABLE;
  }
  const pak = await PakDb.save({
    user_id: context.authorization.user.id,
    is_deleted: false,
    name: params.name,
    description: params.description,
    code_url: params.sourceUrl,
    docs_url: params.docsUrl,
    pak_version_id: null,
  });
  return pak;
}

export default createPakMethodHandler;
