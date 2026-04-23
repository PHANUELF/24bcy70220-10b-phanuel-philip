import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI missing");
  }

  const conn = await mongoose.connect(process.env.MONGO_URI);
  isConnected = !!conn.connections[0].readyState;

  console.log("DB CONNECTED");
}