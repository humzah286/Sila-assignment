import userRouter from './userRoutes';

import express from "express";
const router = express.Router();

router.use("/user", userRouter);

export default router;