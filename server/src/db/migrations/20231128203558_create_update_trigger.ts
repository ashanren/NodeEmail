import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
  CREATE OR REPLACE FUNCTION trigger_set_timestamp()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;
  `);
}


export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
  DROP FUNCTION trigger_set_timestamp;
  `);
}

