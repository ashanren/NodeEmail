import { Knex } from "knex";
import { create_timestamp } from "../utils";

const table_name = 'emails';
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(table_name, table => {
    table.increments('id').primary;
    //table.string("from").notNullable();
    table.integer('email_settings_id').unsigned().notNullable();
    table.foreign('email_settings_id').references('email_settings.id').onDelete('CASCADE');
    table.string("to").notNullable();
    table.string("cc");
    table.string("bcc");
    table.string("subject").notNullable();
    table.string("text");
    table.string("html");
    table.tinyint("success");
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });
  await create_timestamp(knex, table_name);
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(table_name);
}

