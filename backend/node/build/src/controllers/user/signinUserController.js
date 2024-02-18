"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ status: "error", 'message': 'Email and password are required.' });
        const user = yield prisma.user.findUnique({ where: { email } });
        if (user && (yield bcrypt_1.default.compare(password, user.password))) {
            const access_token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET || "access-token", { expiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME_STRING || "60s" });
            const refresh_token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.REFRESH_TOKEN_SECRET || "refresh-token", { expiresIn: process.env.REFRESH_TOKEN_EXPIRY_TIME_STRING || "7d" });
            res.cookie('access_token', access_token, {
                maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRY_TIME || "60000"),
                httpOnly: true
            });
            res.cookie('refresh_token', refresh_token, {
                maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRY_TIME || "604800000"),
                httpOnly: true
            });
            return res.status(200).json({
                status: "Success",
                message: "User successfully signed in",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    country: user.country
                }
            });
        }
        else {
            return res.status(400).json({ status: "Error", message: "Invalid email/password" });
        }
    }
    catch (err) {
        res.status(500).json({ status: "Error", message: "Something went wrong", error: err.message });
    }
});
exports.default = signInUser;
