import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  const uri = process.env.DB_URL || process.env.MONGO_URI;

  if (!uri) {
    console.error(
      "MongoDB connection string is missing. Set DB_URL or MONGO_URI in your environment."
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};


