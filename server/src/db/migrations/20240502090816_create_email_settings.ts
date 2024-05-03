import { Kysely, sql } from 'kysely'
import { create_timestamp } from "../utils";

const table = 'email_settings';
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable(table)
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('host', 'varchar', (col) => col.notNull())
    .addColumn('port', 'integer', (col) => col.notNull())
    .addColumn('user', 'varchar', (col) => col.notNull())
    .addColumn('pass', 'varchar', (col) => col.notNull())
    .addColumn('tls', 'json')
    .addColumn('secure', 'smallint', (col) => col.notNull().defaultTo(0))
    .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`NOW()`))
    .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`NOW()`))
    .addUniqueConstraint('unique_account', ['user', 'host'])
    .execute();
  await create_timestamp(db, table);
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable(table).execute()
}
