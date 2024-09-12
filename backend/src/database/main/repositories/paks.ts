import { PakDb } from "../models/Pak.js";
import { paginateQuery } from "../../postgres.js";

export function dbGetRecentPaks(limit: number, cursorId: number | null) {
  return paginateQuery(PakDb.query(), limit, cursorId);
}

export function dbGetUserPaks(
  userId: number,
  limit: number,
  cursorId: number | null,
) {
  return paginateQuery(PakDb.query().where("user_id", userId), limit, cursorId);
}
