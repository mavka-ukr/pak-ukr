import { paginateQuery } from "../../postgres.js";
import { PakVersionDb } from "../models/PakVersion.js";

export async function dbGetPakVersions(
  pakId: number,
  limit: number,
  cursorId: number | null,
) {
  return await paginateQuery(
    PakVersionDb.query().where("pak_id", pakId),
    limit,
    cursorId,
  );
}

export async function dbFindPakVersionByPakIdAndName(
  pakId: number,
  name: string,
) {
  return (
    (await PakVersionDb.query()
      .where("pak_id", pakId)
      .whereRaw("lower(name) = ?", name.toLowerCase())
      .first()) || null
  );
}
