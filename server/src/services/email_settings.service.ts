import db from "./../db/db";
import { sql } from "kysely";
import { Settings, UpdateSettings } from "../schemas/settings";

const table = "email_settings";
export const get = async (filters: any = {}) => {
  let query = db.selectFrom(table).selectAll();
  let keys = Object.keys(filters);
  //console.log(filters);

  for (const key of keys) {
    let value = filters[key];
    if (Array.isArray(value) && value.length !== 0) {
      query = query.where(getColumn(key), 'in', value);
    } else if (typeof(value) === "string") {
      query = query.where(getColumn(key), sql`RLIKE`, value);
    } else {
      query = query.where(getColumn(key), '=', value);
    }
  }
  return await query.execute();
}

export const add = async (settings: Settings) => {
  return await db.insertInto(table).values(settings).returningAll().execute();
}

export const update = async (id: number, settings: UpdateSettings) => {
  return await db.updateTable(table).set(settings).where("id", "=", id).returningAll().execute();
}

export const del = async (ids: number[]) => {
  return await db.deleteFrom(table).where('id', 'in', ids).returningAll().execute();
}

const getColumn = (key: string): 'id'|'host'|"user" => {
  switch(key) {
    case "id":
      return "id";
    case "host":
      return "host";
    case "user":
      return "user";
    default:
      return "id";
  }
}