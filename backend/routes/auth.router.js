import express from "express";
import { signup } from "../controllers/auth.controller";

const router = express.router;

//
router.post("/api/signup",signup)

//
router.use(errorHandler);


export default router;