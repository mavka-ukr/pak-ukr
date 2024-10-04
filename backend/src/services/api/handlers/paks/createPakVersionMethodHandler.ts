import { AuthorizedMethodContext } from "../../../../application/index.js";
import {
  PAK_ERROR_FORBIDDEN,
  PAK_ERROR_INVALID_PAK_VERSION_NAME,
  PAK_ERROR_PAK_VERSION_NAME_NOT_AVAILABLE,
} from "../../../../application/errors.js";
import { PakVersionDb } from "../../../../database/main/models/PakVersion.js";
import { PakDb } from "../../../../database/main/models/Pak.js";

function isPakVersionNameValid(name: string): boolean {
  return /([0-9]+).([0-9]+).([0-9]+)/g.test(name);
}

async function isPakVersionNameAvailable(
  pakId: number,
  name: string,
): Promise<boolean> {
  const pakByName = await PakVersionDb.query()
    .where("pak_id", pakId)
    .whereRaw("lower(name) = ?", name.toLowerCase())
    .first();
  if (pakByName) {
    return false;
  }
  return true;
}

async function createPakVersionMethodHandler(
  params: {
    pakId: number;
    name: string;
    description: string;
  },
  context: AuthorizedMethodContext,
) {
  const pak = await PakDb.findByIdOrFail(params.pakId);
  if (pak.user_id !== context.authorization.user.id) {
    throw PAK_ERROR_FORBIDDEN;
  }
  if (!isPakVersionNameValid(params.name)) {
    throw PAK_ERROR_INVALID_PAK_VERSION_NAME;
  }
  const nameParts = params.name.split(".");
  const name = [
    Number(nameParts[0]),
    Number(nameParts[1]),
    Number(nameParts[2]),
  ].join(".");
  if (!(await isPakVersionNameAvailable(params.pakId, name))) {
    throw PAK_ERROR_PAK_VERSION_NAME_NOT_AVAILABLE;
  }
  const pakVersion = await PakVersionDb.save({
    is_deleted: false,
    pak_id: params.pakId,
    name: params.name,
    description: params.description,
  });
  return pakVersion;
}

export default createPakVersionMethodHandler;
