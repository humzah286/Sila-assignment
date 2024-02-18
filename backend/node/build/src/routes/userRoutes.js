"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createUserController_1 = __importDefault(require("../controllers/createUserController"));
const signinUserController_1 = __importDefault(require("../controllers/signinUserController"));
const getUserController_1 = __importDefault(require("../controllers/getUserController"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authJWT_1 = __importDefault(require("../middleware/authJWT"));
router.post("/create-account", createUserController_1.default);
router.post("/sign-in", signinUserController_1.default);
router.get("/get-user", authJWT_1.default, getUserController_1.default);
router.get("/test-jwt", authJWT_1.default, (req, res) => res.json({ message: "You hit the test-jwt route" }));
exports.default = router;
