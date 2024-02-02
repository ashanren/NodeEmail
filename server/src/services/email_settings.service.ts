import db from "./../db/db";
import { Settings } from "./../schemas/settings";

const table = "email_settings";
export const get = async () => {
  return await db(table).select('*');
}

export const add = async (settings: Settings) => {
  return await db(table).insert(settings).returning('id');
}

export const update = async (id: number, settings: Settings) => {
  return await db(table).update(settings).where({id}).returning('id');
}

export const del = async (ids: number[]) => {
  return await db(table).whereIn('id', ids).del();
}