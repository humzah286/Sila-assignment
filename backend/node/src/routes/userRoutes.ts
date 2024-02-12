
import  createUser  from "../controllers/createUserController";
import signInUser from "../controllers/signinUserController";


import express from "express";
const router = express.Router();

import verifyJWT from "../middleware/authJWT";

router.post("/create-account", createUser);
router.post("/sign-in", signInUser);

router.get("/test-jwt", verifyJWT, (req, res) => res.json({ message: "You hit the test-jwt route" }))

export default router;
