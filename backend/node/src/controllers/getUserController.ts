
import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const getUser = async (req: Request, res: Response) => {

    const user = res.locals.user;

    console.log("user from controller : ", user)

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
}

export default getUser;