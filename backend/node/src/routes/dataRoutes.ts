

import addRating from "../controllers/rating/addRating";

import express from "express";
const router = express.Router();

import verifyJWT from "../middleware/authJWT";


router.post("/add-rating", verifyJWT, addRating);

export default router;
