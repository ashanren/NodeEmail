import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import config from '../config/config';
import { Client, Pool } from 'pg';
import { sql } from 'drizzle-orm';

import { Kysely, PostgresDialect } from 'kysely';
import { DB } from 'kysely-codegen';
const base_url = `postgres://${config.username}:${config.password}@${config.host}`;
const migration_url = `${base_url}/postgres`;
const url = `${base_url}/${config.database}`;

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({connectionString: url})
  })
});

const client = new Pool({connectionString: url});
let connection;

export const run_migrations = async () => {
  const client = new Client({connectionString: url});
  await client.connect();
  await migrate(drizzle(client), {migrationsFolder: "./drizzle"});
  client.end();
};

export const reset_migrations = async () => {
  console.log(base_url);
  const client = new Client({connectionString: migration_url});
  await client.connect();
  const db = drizzle(client);
  await db.execute(sql.raw(`DROP DATABASE IF EXISTS ${config.database};`))
  await db.execute(sql.raw(`CREATE DATABASE ${config.database};`));
  client.end();
}

export const start_db_connection = async () => {
  await client.connect();
}

export default drizzle(client);
