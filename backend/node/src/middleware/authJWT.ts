
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const verifyAccessJWT = (req: Request) => {
    if (!req.cookies.access_token) return false

    const decoded = jwt.verify(
        req.cookies.access_token,
        process.env.ACCESS_TOKEN_SECRET || "access-token"
    );

    if (!decoded) return false

    return decoded
}

const verifyRefreshJWT = (req: Request) => {
    if (!req.cookies.refresh_token) return false

    const decoded = jwt.verify(
        req.cookies.refresh_token,
        process.env.REFRESH_TOKEN_SECRET || "refresh-token"
    );

    if (!decoded) return false

    return decoded
}

const refreshJWT = (req: Request, res: Response) => {

    const decoded = jwt.verify(
        req.cookies.refresh_token,
        process.env.REFRESH_TOKEN_SECRET || "refresh-token"
    );

    if (!(typeof decoded === 'object' && '_id' in decoded)) {
        return false
    }

    const accessJWT = jwt.sign(
        { _id: decoded._id },
        process.env.ACCESS_TOKEN_SECRET || "access-token",
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME_STRING || "60s" }
    );

    const refreshJWT = jwt.sign(
        { _id: decoded._id},
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
    
    let user = verifyAccessJWT(req);

    if (!user) {

        user = verifyRefreshJWT(req);

        if (!user) {
            return res.status(400).json({ status: "Error", message: "invalid JWT tokens" });
        }
        else {
            let response = refreshJWT(req, res);

            if (!response) {
                return res.status(400).json({ status: "Error", message: "invalid JWT tokens" });
            }

            res = response.res;
            user = response.decoded;
        }
    }

    res.locals.user = user;

    next();
}

export default verifyJWT;
