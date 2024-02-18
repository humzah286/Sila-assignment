// SELECT brand, COUNT(*) as product_count
// FROM `Product`
// GROUP BY brand
// ORDER BY product_count DESC
// LIMIT 12;


import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";

const prisma = new PrismaClient();

const getTotalProductsbyBrands = async (req: Request, res: Response) => {

    let result = await prisma.$queryRaw`
        SELECT brand, COUNT(*) as product_count
        FROM \`Product\`
        GROUP BY brand
        ORDER BY product_count DESC
        LIMIT 12;
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

export default getTotalProductsbyBrands;
