export default {
  host: process.env.DB_HOST || "database",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'app',
  password: process.env.DB_PASS || 'secret',
  database: process.env.DB_NAME || 'email',

};
