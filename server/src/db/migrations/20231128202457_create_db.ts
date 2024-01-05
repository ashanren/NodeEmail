import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw("SELECT 'CREATE DATABASE email' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'email')");
}


export async function down(knex: Knex): Promise<void> {
  //await knex.raw("DROP DATABASE email");
}

