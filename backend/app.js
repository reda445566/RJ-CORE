import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import authrouter from "./routes/auth.router.js"
import http from "http";
import { Server } from "socket.io";
import initStudyRoomSocket from "./sockets/studyRoom.socket.js";
//
const app = express();
const server = http.createServer(app);
//
dotenv.config();
app.use(express.json());
app.use(cors({
  origin: /^http:\/\/localhost:\d+$/,  // ← يقبل أي localhost
  credentials: true
}));

const io = new Server(server, {
  cors: {
    origin: /^http:\/\/localhost:\d+$/,
    credentials: true,
  },
});

initStudyRoomSocket(io);
// db
connectDB();

// use routes
app.use("/api", authrouter);
app.use(errorHandler);

//
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`server is running on ${port}`);
});
