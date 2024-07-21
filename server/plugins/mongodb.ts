import mongoose from 'mongoose';
import type { Nitro } from 'nitropack';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB connection established.");
  } catch (err) {
    console.error("MongoDB connection failed.", err);
    // process.exit(1);
  }
};

export default async (_nitroApp: Nitro) => {
  await connectDB();
}