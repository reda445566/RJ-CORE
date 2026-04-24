import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import authrouter from "./routes/auth.router.js"
//
const app = express();
//
dotenv.config();
app.use(express.json());
app.use(cors());

// db
connectDB();

// use routes
app.use(errorHandler);
app.use(authrouter)
//
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});





