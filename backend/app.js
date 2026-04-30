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
app.use(cors({
  origin: /^http:\/\/localhost:\d+$/,  // ← يقبل أي localhost
  credentials: true
}));


// db
connectDB();

// use routes
app.use("/api", authrouter);
app.use(errorHandler);

//
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});



