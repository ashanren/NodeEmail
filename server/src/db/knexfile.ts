import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST || "database",
      port: Number(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME || 'email',
      user: process.env.DB_USER || 'email',
      password: process.env.DB_PASS || 'JcGWz584',
      dateStrings: true,
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

export default config;
//module.exports = config;
