import { commonDb, Model } from "../../postgres.js";
import mainDb from "../index.js";
import { Pak } from "./Pak.js";

export interface PakVersion extends Model {
  pak_id: number;
  is_deleted: boolean;
  name: string;
  description: string;
}

export const PakVersionDb = {
  ...commonDb<Pak>(mainDb, "pak_versions"),
};
