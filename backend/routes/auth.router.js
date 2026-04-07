import express from "express";
import { signup,login } from "../controllers/auth.controller.js";
import { errorHandler } from "../middlewares/errorMiddleware.js";
import { fibonaccilimter } from "../middlewares/rateLimiter.js";
import { limiter } from "../middlewares/expressLimiter.js";

const router = express.Router();

//
router.post("/api/signup",signup)
router.post("/api/login",limiter,fibonaccilimter(),login)


//
router.use(errorHandler);
export default router;





