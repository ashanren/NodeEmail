import knex, { Knex } from "knex";
import config from "./knexfile";

const connection: Knex = knex(config[`${process.env.NODE_ENV || "development"}`]);;

export default connection;