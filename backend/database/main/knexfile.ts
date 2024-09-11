import type { Knex } from "knex";
import { MAIN_DB_CONFIG } from "./config.js";

export const config: { [key: string]: Knex.Config } = {
  development: MAIN_DB_CONFIG,
  production: MAIN_DB_CONFIG,
};

export default config;
