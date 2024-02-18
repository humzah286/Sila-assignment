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
Object.defineProperty(exports, "__esModule", { value: true });
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    console.log("user from controller : ", user);
    return res.json({
        status: "Success",
        message: "You hit the get-user route",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            country: user.country
        }
    });
});
exports.default = getUser;
