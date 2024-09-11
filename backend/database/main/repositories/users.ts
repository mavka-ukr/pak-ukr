import { paginateQuery } from "../../postgres.js";
import { User, UserDb } from "../models/User.js";
import { Knex } from "knex";

export function dbGetRecentUsersForUser(
  user: User | undefined,
  limit: number,
  cursorId: number | null,
  trx?: Knex.Transaction,
) {
  return paginateQuery(UserDb.query(trx), limit, cursorId);
}

export function dbFindUserByMavkaId(mavkaId: number, trx?: Knex.Transaction) {
  return UserDb.query(trx).where("mavka_id", mavkaId).first();
}
