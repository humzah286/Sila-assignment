import userRouter from './userRoutes';
import chartRoutes from './chartRoutes'
import dataRoutes from './dataRoutes'

import express from "express";
const router = express.Router();

router.use("/user", userRouter);
router.use("/charts", chartRoutes);
router.use('/data', dataRoutes)

export default router;
