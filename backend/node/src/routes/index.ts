import userRouter from './userRoutes';
import chartRoutes from './chartRoutes'

import express from "express";
const router = express.Router();

router.use("/user", userRouter);
router.use("/charts", chartRoutes);

export default router;