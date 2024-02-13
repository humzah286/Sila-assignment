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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, address, password } = req.body;
        console.log("name : ", name);
        console.log("email : ", email);
        console.log("phone : ", phone);
        console.log("address : ", address);
        console.log("password : ", password);
        // check for duplicate user
        const foundUser = yield prisma.user.findUnique({ where: { email } });
        if (foundUser) {
            return res.status(400).json({
                status: "Error",
                message: "User already exists"
            });
        }
        if (name === "" || email === "" || phone === "" || address === "") {
            return res.status(400).json({
                status: "Error",
                message: "Please fill out all fields"
            });
        }
        else if (!name || !email || !phone || !address || !password) {
            return res.status(400).json({
                status: "Error",
                message: "Please fill out all fields"
            });
        }
        else if (password.length < 8) {
            return res.status(400).json({
                status: "Error",
                message: "Password must be at least 8 characters"
            });
        }
        const hashedPwd = yield bcrypt_1.default.hash(password, 10);
        let user = yield prisma.user.create({ data: {
                name,
                email,
                phone,
                address,
                password: hashedPwd
            } });
        if (!user) {
            return res.status(500).json({
                status: "Error",
                message: "User not created"
            });
        }
        const access_token = jsonwebtoken_1.default.sign({ _id: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET || "access-token", { expiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME_STRING || "60s" });
        const refresh_token = jsonwebtoken_1.default.sign({ _id: user._id, email: user.email }, process.env.REFRESH_TOKEN_SECRET || "refresh-token", { expiresIn: process.env.REFRESH_TOKEN_EXPIRY_TIME_STRING || "7d" });
        res.cookie('access_token', access_token, {
            maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRY_TIME || "60000"),
            httpOnly: true
        });
        res.cookie('refresh_token', refresh_token, {
            maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRY_TIME || "604800000"),
            httpOnly: true
        });
        res.status(201).json({
            status: "Success",
            message: "User created"
        });
    }
    catch (err) {
        res.status(500).json({ status: "Error", message: "Something went wrong", error: err.message });
    }
});
exports.default = createUser;
