import { PakDb } from "../models/Pak.js";
import { paginateQuery } from "../../postgres.js";

export async function dbGetRecentPaks(limit: number, cursorId: number | null) {
  return await paginateQuery(PakDb.query(), limit, cursorId);
}

export async function dbGetUserPaks(
  userId: number,
  limit: number,
  cursorId: number | null,
) {
  return await paginateQuery(
    PakDb.query().where("user_id", userId),
    limit,
    cursorId,
  );
}

export async function dbFindPakByName(name: string) {
  return (
    (await PakDb.query()
      .whereRaw("lower(name) = ?", name.toLowerCase())
      .first()) || null
  );
}
