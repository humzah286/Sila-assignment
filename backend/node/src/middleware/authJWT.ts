
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const verifyAccessJWT = (req: Request) => {
    try {
        if (!req.cookies.access_token) return false

        const decoded = jwt.verify(
            req.cookies.access_token,
            process.env.ACCESS_TOKEN_SECRET || "access-token"
        );

        if (!decoded) return false

        return decoded
    } catch (err) {
        return false
    }
}

const verifyRefreshJWT = (req: Request) => {
    try {
        if (!req.cookies.refresh_token) return false

        const decoded = jwt.verify(
            req.cookies.refresh_token,
            process.env.REFRESH_TOKEN_SECRET || "refresh-token"
        );

        if (!decoded) return false

        return decoded
    }
    catch (err) {
        return false
    }
}

const refreshJWT = (req: Request, res: Response) => {

    const decoded = jwt.verify(
        req.cookies.refresh_token,
        process.env.REFRESH_TOKEN_SECRET || "refresh-token"
    );

    console.log("decoded : ", decoded)
    if (!(typeof decoded === 'object' && 'email' in decoded)) {
        console.log("returning false because of missing email in decoded object")
        return false
    }

    const accessJWT = jwt.sign(
        { id: decoded.id },
        process.env.ACCESS_TOKEN_SECRET || "access-token",
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME_STRING || "60s" }
    );

    const refreshJWT = jwt.sign(
        { id: decoded.id },
        process.env.REFRESH_TOKEN_SECRET || "refresh-token",
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY_TIME_STRING || "7d" }
    );

    res.cookie('access_token', accessJWT, {
        maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRY_TIME || "60000"),
        httpOnly: true
    });

    res.cookie('refresh_token', refreshJWT, {
        maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRY_TIME || "604800000"),
        httpOnly: true
    });

    return { res, decoded };
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {

    // console.log("req.cookies : ", req.cookies)
    // console.log("verifyJWT middleware : " + req.cookies.access_token + " : " + req.cookies.refresh_token )

    let user = verifyAccessJWT(req);

    // console.log("from verifyAccessToken : ", user)

    if (!user) {

        user = verifyRefreshJWT(req);

        console.log("from verifyRefreshToken : ", user)

        if (!user) {
            console.log("returning invalid JWT tokens")
            return res.status(400).json({ status: "Error", message: "invalid JWT tokens" });
        }
        else {
            let response = refreshJWT(req, res);

            console.log("from refreshJWT : ", response)

            if (!response) {
                return res.status(400).json({ status: "Error", message: "invalid JWT tokens" });
            }

            res = response.res;
            user = response.decoded;
        }
    }

    console.log("user after verfication : ", user)

    if (!user || !(typeof user === 'object' && 'email' in user)) {
        return res.status(400).json({ status: "Error", message: "invalid JWT tokens" });
    }

    prisma.user.findUnique({ where: { email: user.email } }).then((user: any) => {
        console.log("user from db : ", user)
        if (!user) {
            return res.status(400).json({ status: "Error", message: "invalid JWT tokens" });
        }

        res.locals.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            country: user.country
        };

        next();
    }).catch((err: any) => {
        return res.status(500).json({ status: "Error", message: "Something went wrong", error: err.message });
    });
}

export default verifyJWT;
