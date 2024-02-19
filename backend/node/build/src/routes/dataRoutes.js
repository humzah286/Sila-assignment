"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addRating_1 = __importDefault(require("../controllers/rating/addRating"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authJWT_1 = __importDefault(require("../middleware/authJWT"));
router.post("/add-rating", authJWT_1.default, addRating_1.default);
exports.default = router;
