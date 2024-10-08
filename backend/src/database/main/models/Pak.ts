import { commonDb, Model } from "../../postgres.js";
import mainDb from "../index.js";

export interface Pak extends Model {
  user_id: number;
  is_deleted: boolean;
  name: string;
  description: string;
  code_url: string;
  docs_url: string;
  pak_version_id: number | null;
}

export const PakDb = {
  ...commonDb<Pak>(mainDb, "paks"),
};
