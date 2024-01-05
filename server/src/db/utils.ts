import { Knex } from "knex";

export const create_timestamp = async (knex: Knex, table: string) => {
  await knex.raw(`
  CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON ${table}
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp();
  `);
}