import { connectDb } from "@/lib/db";

export const getDatabases = async () => {
  "use server";

  const conn = await connectDb();

  const res = await conn.connection.db?.admin().listDatabases();

  if (res) {
    const dbs = res.databases;

    return dbs.map(({ name }) => name);
  }
};
