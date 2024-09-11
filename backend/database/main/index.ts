import knex from "knex";
import { MAIN_DB_CONFIG } from "./config.js";

const mainDb = knex(MAIN_DB_CONFIG);

export default mainDb;
