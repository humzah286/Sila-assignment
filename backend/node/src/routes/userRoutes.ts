
import  createUser  from "../controllers/user/createUserController";
import signInUser from "../controllers/user/signinUserController";
import getUser from "../controllers/user/getUserController";


import express from "express";
const router = express.Router();

import verifyJWT from "../middleware/authJWT";

router.post("/create-account", createUser);
router.post("/sign-in", signInUser);
router.get("/get-user", verifyJWT, getUser);

router.get("/test-jwt", verifyJWT, (req, res) => res.json({ message: "You hit the test-jwt route" }))

export default router;
