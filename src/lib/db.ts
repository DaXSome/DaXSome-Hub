import mongoose from "mongoose";

export const connectDb = async () => {
  const conn = await mongoose.connect(process.env.DB_URI!);

  return conn;
};
