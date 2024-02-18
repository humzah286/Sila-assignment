


import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";

const prisma = new PrismaClient();

const getAverageRatings = async (req: Request, res: Response) => {

    console.log("getTotalReviewsperYear")

    let result = await prisma.$queryRaw`
        SELECT p.brand, AVG(r.rating) AS average_rating
        FROM \`Product\` p
        JOIN \`Rating\` r ON p.asin = r.item
        GROUP BY p.brand
        HAVING COUNT(r.rating) >= 100;
    `;

    console.log(result);
    const result_string = JSON.stringify(result, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value // Convert BigInt to a string
    );

    result = JSON.parse(result_string)

    res.json({
        status: "success",
        data: result
    });
}

export default getAverageRatings;
