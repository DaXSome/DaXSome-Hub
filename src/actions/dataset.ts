"use server";

import connectDb from "@/lib/db";

export const getDatabases = async () => {
  const conn = await connectDb();

  if (!conn.db) throw new Error("Database connection failed");

  const res = await conn.db.admin().listDatabases();

  if (res) {
    const dbs = res.databases;

    return dbs.map(({ name }) => name);
  }
};

export const getCollections = async (db: string) => {
  const conn = await connectDb(db);

  if (!conn.db) throw new Error("Database connection failed");

  const cursor = conn.db.listCollections();
  const collections = await cursor.toArray();

  return collections.map((collection) => collection.name);
};

export const getData = async (db: string, collection: string) => {
  const conn = await connectDb(db);

  if (!conn.db) throw new Error("Database connection failed");

  const cursor = conn.db.collection(collection).find().limit(10);

  try {
    const data = await cursor.toArray();

    return data.map((data) => ({ ...data, _id: data._id.toString() }));
  } catch (e) {
    console.log(e)
    return [];
  }
};

export const saveData = async (db: string, collection: string, data: any[]) => {
  const conn = await connectDb(db);

  if (!conn.db) throw new Error("Database connection failed");

  await conn.db.collection(collection).insertMany(data);
};
