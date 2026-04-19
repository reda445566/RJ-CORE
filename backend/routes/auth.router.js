import express from "express";
import { signup,login, deleteAcc } from "../controllers/auth.controller.js";
import { errorHandler } from "../middlewares/errorMiddleware.js";
import { fibonaccilimter } from "../middlewares/rateLimiter.js";
import { limiter } from "../middlewares/expressLimiter.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

//
router.post("/api/signup",signup)
router.post("/api/login",limiter,fibonaccilimter(),login)
router.delete("/api/delete",protect,deleteAcc)

//
router.use(errorHandler);
export default router;




