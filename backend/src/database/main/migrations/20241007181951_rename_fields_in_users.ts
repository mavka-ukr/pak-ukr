import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("users", function (table) {
    table.renameColumn("first_name", "name");
    table.dropColumn("family_name");
    table.dropColumn("father_name");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("users", function (table) {
    table.renameColumn("name", "first_name");
    table.string("family_name").defaultTo("");
    table.string("father_name").defaultTo("");
  });
}
