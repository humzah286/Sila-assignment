import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addRating = async (req: Request, res: Response) => {
    try {
        console.log("addRating")
        const { item, user, rating } = req.body;
        const result = await prisma.rating.create({
            data: {
                item: item,
                user: user,
                rating: rating,
                timestamp: Math.floor(Date.now() / 1000)
            }
        });

        res.status(200).json({
            status: "success",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
}

export default addRating;