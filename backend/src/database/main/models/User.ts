import { commonDb, Model } from "../../postgres.js";
import mainDb from "../index.js";

export interface User extends Model {
  mavka_id: number;
  name: string;
  avatar_url: string | null;
  posts_count: number;
  rating: number;
}

export const UserDb = {
  ...commonDb<User>(mainDb, "users"),
};
