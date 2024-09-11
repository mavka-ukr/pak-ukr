import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("sessions", function (table) {
    table.bigIncrements("id").primary();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.bigInteger("user_id");
    table.string("token").unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("sessions");
}
