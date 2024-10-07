import { commonDb, Model } from "../../postgres.js";
import mainDb from "../index.js";

export interface PakVersion extends Model {
  pak_id: number;
  is_deleted: boolean;
  name: string;
  description: string;
  file_id: number;
}

export const PakVersionDb = {
  ...commonDb<PakVersion>(mainDb, "pak_versions"),
};
