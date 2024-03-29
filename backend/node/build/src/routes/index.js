"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRoutes_1 = __importDefault(require("./userRoutes"));
const chartRoutes_1 = __importDefault(require("./chartRoutes"));
const dataRoutes_1 = __importDefault(require("./dataRoutes"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.use("/user", userRoutes_1.default);
router.use("/charts", chartRoutes_1.default);
router.use('/data', dataRoutes_1.default);
exports.default = router;
