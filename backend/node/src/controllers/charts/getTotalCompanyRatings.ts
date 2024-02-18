
import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";

const prisma = new PrismaClient();

const getTopBrandsWithMostRatedProducts = async (req: Request, res: Response) => {

    let result = await prisma.$queryRaw`SELECT
      p.brand,
      COUNT(DISTINCT p.asin) AS rated_products_count
    FROM
      \`Product\` p
    INNER JOIN \`Rating\` r ON
      p.asin = r.item
    GROUP BY
      p.brand
    ORDER BY
      rated_products_count DESC
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

export default getTopBrandsWithMostRatedProducts;
