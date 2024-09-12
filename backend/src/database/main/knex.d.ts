import { User } from "./models/User.js";
import { Session } from "./models/Session.js";
import { Pak } from "./models/Pak.js";

declare module "knex/types/tables" {
  interface Tables {
    paks: Pak;
    sessions: Session;
    users: User;
  }
}
