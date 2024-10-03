import { User } from "./models/User.js";
import { Session } from "./models/Session.js";
import { Pak } from "./models/Pak.js";
import { PakVersion } from "./models/PakVersion.js";

declare module "knex/types/tables" {
  interface Tables {
    paks: Pak;
    pak_versions: PakVersion;
    sessions: Session;
    users: User;
  }
}
