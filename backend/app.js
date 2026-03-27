import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
//
const app = express();
//
dotenv.config();
app.use(express.json());
app.use(cors());

// db
connectDB();

//
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});






