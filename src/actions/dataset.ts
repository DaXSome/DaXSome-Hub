import connectDb from "@/lib/db";

export const getDatabases = async () => {
  "use server";

  const conn = await connectDb();

  if (!conn.db) throw new Error("Database connection failed");

  const res = await conn.db.admin().listDatabases();

  if (res) {
    const dbs = res.databases;

    return dbs.map(({ name }) => name);
  }
};

export const getCollections = async (db: string) => {
  "use server";

  const conn = await connectDb(db);

  if (!conn.db) throw new Error("Database connection failed");

  const cursor = conn.db.listCollections();
  const collections = await cursor.toArray();

  if (!collections.length) throw new Error("No collections found");

  return collections.map((collection) => collection.name);
};
