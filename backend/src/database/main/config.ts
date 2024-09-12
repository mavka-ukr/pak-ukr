import { Knex } from "knex";
import { CONFIG } from "../../application/config.js";

export const MAIN_DB_CONFIG: Knex.Config = {
  client: "pg",
  connection: {
    host: CONFIG.DB_MAIN_HOST,
    port: CONFIG.DB_MAIN_PORT,
    user: CONFIG.DB_MAIN_USER,
    password: CONFIG.DB_MAIN_PASSWORD,
    database: CONFIG.DB_MAIN_DATABASE,
  },
};
