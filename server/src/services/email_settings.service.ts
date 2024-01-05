import db from "./../db/db";

export const get = async () => {
  return await db("email_settings").select('*');
}

export const add = async () => {

}

export const update = async () => {

}

export const del = async () => {

}