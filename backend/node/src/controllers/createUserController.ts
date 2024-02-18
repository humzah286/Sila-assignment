

import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (req: Request, res: Response) => {
    try {

        const { name, email, country, password } = req.body;

        // check for duplicate user
        const foundUser = await prisma.user.findUnique({ where: { email } });

        if (foundUser) {
            return res.status(400).json({
                status: "Error",
                message: "User already exists" })
        }
        
        if (name === "" || email === "" || country === "") {
            return res.status(400).json({
                status: "Error",
                message: "Please fill out all fields" 
            })
        } else if (!name || !email || !country || !password) {
            return res.status(400).json({ 
                status: "Error",
                message: "Please fill out all fields" 
            })
        } else if (password.length < 8) {
            return res.status(400).json({ 
                status: "Error",
                message: "Password must be at least 8 characters" 
            })
        }

        const hashedPwd = await bcrypt.hash(password, 10);

        let user = await prisma.user.create({ data: {
            name,
            email,
            country, 
            password: hashedPwd
        }})

        if (!user) {
            return res.status(500).json({ 
                status: "Error",
                message: "User not created" 
            })
        }

        const access_token = jwt.sign(
            { _id: user._id, email: user.email },
            process.env.ACCESS_TOKEN_SECRET || "access-token",
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME_STRING || "60s"}
        )

        const refresh_token = jwt.sign(
            { _id: user._id, email: user.email },
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

        res.status(201).json({
            status: "Success",
            message: "User created" ,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                country: user.country
            }
        })

    } catch(err: any) {
        res.status(500).json({ status: "Error", message: "Something went wrong", error: err.message })
    }
};

export default createUser;
