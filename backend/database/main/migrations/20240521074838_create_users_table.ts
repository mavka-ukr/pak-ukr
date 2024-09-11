import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", function (table) {
    table.bigIncrements("id").primary();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.bigInteger("mavka_id").unique();
    table.string("family_name").defaultTo("");
    table.string("first_name").defaultTo("");
    table.string("father_name").defaultTo("");
    table.string("avatar_url").nullable();
    table.integer("posts_count").defaultTo(0);
    table.integer("rating").defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users");
}
