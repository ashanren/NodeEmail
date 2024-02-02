import { Knex } from "knex";
import { create_timestamp } from "../utils";

const table_name = 'email_settings';
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(table_name, table => {
    table.increments('id').primary;
    //table.string("type");
    table.string("host");
    table.integer('port').unsigned().notNullable();
    table.string("user");
    table.string("pass");
    table.json("tls");
    table.tinyint("secure").notNullable().defaultTo(0);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    table.unique(['host', 'user'], 'unique_account');
  });
  await create_timestamp(knex, table_name);
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(table_name);
}

