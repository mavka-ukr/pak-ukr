import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("pak_versions", function (table) {
    table.bigIncrements("id").primary();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.bigInteger("pak_id");
    table.string("name");
    table.string("description").defaultTo("");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("pak_versions");
}
