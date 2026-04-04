import express from "express";
import { signup } from "../controllers/auth.controller.js";
import { errorHandler } from "../middlewares/errorMiddleware.js";

const router = express.Router();

//
router.post("/api/signup",signup)

//
router.use(errorHandler);
export default router;





