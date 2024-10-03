import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("paks", function (table) {
    table.bigInteger("pak_version_id").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("paks", function (table) {
    table.dropColumn("pak_version_id");
  });
}
