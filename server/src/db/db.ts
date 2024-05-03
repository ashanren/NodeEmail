import * as path from 'path'
import { promises as fs } from 'fs'
import { Pool } from 'pg';
import {
  Kysely,
  Migrator,
  PostgresDialect,
  FileMigrationProvider,
  sql
} from 'kysely'
import { DB } from './../schemas/db';
import config from '../config/config';
const base_url = `postgres://${config.username}:${config.password}@${config.host}`;
const migration_url = `${base_url}/postgres`;
const url = `${base_url}/${config.database}`;

export default new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({connectionString: url})
  })
});

export const reset_migrations = async () => {
  const db = new Kysely<DB>({
    dialect: new PostgresDialect({
      pool: new Pool({connectionString: migration_url})
    })
  });
  await sql`DROP DATABASE IF EXISTS ${sql.raw(config.database)}`.execute(db);
  await sql`CREATE DATABASE ${sql.raw(config.database)}`.execute(db);
  await db.destroy();
}

export const run_migrations = async () => {
  const db = new Kysely<any>({
    dialect: new PostgresDialect({
      pool: new Pool({connectionString: url})
    })
  });
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, "/migrations")
    })
  });

  const { error, results } = await migrator.migrateToLatest();
  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`)
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`)
    }
  })

  if (error) {
    console.error('failed to migrate')
    console.error(error)
    process.exit(1)
  }
}
