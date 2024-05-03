import {
  Kysely,
  sql
} from 'kysely'

export const create_timestamp = async (db: Kysely<any>, table: string) => {
  await sql`CREATE TRIGGER set_timestamp 
  BEFORE UPDATE ON ${sql.raw(table)} 
  FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();`.execute(db);
}

