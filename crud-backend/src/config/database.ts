import mongoose from "mongoose";
import { env } from "./env";

let cachedConnection: typeof mongoose | null = null;

export async function connectDatabase() {
  if (cachedConnection || mongoose.connection.readyState === 1) {
    return cachedConnection || mongoose;
  }

  if (mongoose.connection.readyState === 2) {
    return mongoose;
  }

  cachedConnection = await mongoose.connect(env.mongoUri, {
    serverSelectionTimeoutMS: 10000,
  });

  return cachedConnection;
}
