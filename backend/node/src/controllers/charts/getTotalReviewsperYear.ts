

import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";

const prisma = new PrismaClient();

const getTotalReviewsperYear = async (req: Request, res: Response) => {

    console.log("getTotalReviewsperYear")

    let result = await prisma.$queryRaw`
        SELECT 
            YEAR(FROM_UNIXTIME(timestamp)) AS rating_year,
            COUNT(*) AS total_ratings
        FROM 
            \`Rating\`
        GROUP BY 
            rating_year
        ORDER BY 
            rating_year;
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

export default getTotalReviewsperYear;
