import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("pak_versions", function (table) {
    table.boolean("is_deleted").defaultTo(false);
    table.bigInteger("file_id").defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("pak_versions", function (table) {
    table.dropColumn("is_deleted");
    table.dropColumn("file_id");
  });
}
