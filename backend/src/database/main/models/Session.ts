import { commonDb, Model } from "../../postgres.js";
import mainDb from "../index.js";

export interface Session extends Model {
  user_id: number;
  token: string;
}

export const SessionDb = {
  ...commonDb<Session>(mainDb, "sessions"),
  findByToken(token: string): Promise<Session | undefined> {
    return SessionDb.query().where("token", token).first();
  },
};
