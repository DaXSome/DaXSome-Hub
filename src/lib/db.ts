import mongoose from "mongoose";

class DatabaseConnection {
  private static instances: Map<string, mongoose.Connection> = new Map();

  static async getConnection(
    dbName = "datasets",
  ): Promise<mongoose.Connection> {
    // Check if we already have a connection for this database
    if (DatabaseConnection.instances.has(dbName)) {
      const existingConnection = DatabaseConnection.instances.get(dbName)!;

      // If the connection is ready, return it
      if (existingConnection.readyState === 1) {
        return existingConnection;
      }

      // If the connection is down, remove it from instances
      DatabaseConnection.instances.delete(dbName);
    }

    const DB_URI = process.env.DB_URI as string;
    if (!DB_URI) throw new Error("Missing database uri");

    const connection = mongoose.createConnection(DB_URI, {
      dbName,
      appName: dbName,
    });

    return new Promise<mongoose.Connection>((resolve, reject) => {
      connection.on("connecting", () => {
        console.log(`Connecting to database ${dbName}...`);
      });

      connection.on("connected", () => {
        console.log(`Connected to database ${dbName}`);
        DatabaseConnection.instances.set(dbName, connection);
        resolve(connection);
      });

      connection.on("error", (err) => {
        console.error(`Error in database connection to ${dbName}:`, err);
        DatabaseConnection.instances.delete(dbName);
        reject(err);
      });

      connection.on("disconnected", () => {
        console.log(`Disconnected from database ${dbName}`);
        DatabaseConnection.instances.delete(dbName);
        reject(new Error("disconnected"));
      });
    });
  }
}

const connectToDb = DatabaseConnection.getConnection;

export default connectToDb; 
