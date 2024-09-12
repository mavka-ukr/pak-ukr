import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("paks", function (table) {
    table.bigIncrements("id").primary();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.bigInteger("user_id");
    table.boolean("is_deleted").defaultTo(false);
    table.string("name");
    table.string("description").defaultTo("");
    table.string("code_url").defaultTo("");
    table.string("docs_url").defaultTo("");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("paks");
}
