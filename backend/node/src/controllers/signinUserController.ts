
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const signInUser = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) 
            return res.status(400).json({ status: "error", 'message': 'Email and password are required.' });

        const user = await prisma.user.findUnique({ where: { email } });

        if (user && (await bcrypt.compare(password, user.password))) {
            const access_token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.ACCESS_TOKEN_SECRET || "access-token",
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME_STRING || "60s"}
            )

            const refresh_token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.REFRESH_TOKEN_SECRET || "refresh-token",
                { expiresIn: process.env.REFRESH_TOKEN_EXPIRY_TIME_STRING || "7d" }
            )

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
                }});

        } else {
            return res.status(400).json({ status: "Error", message: "Invalid email/password" });
        }

    } catch(err: any) {
        res.status(500).json({ status: "Error", message: "Something went wrong", error: err.message })
    }
};

export default signInUser;
