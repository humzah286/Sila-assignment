"use strict";
// SELECT brand, COUNT(*) as product_count
// FROM `Product`
// GROUP BY brand
// ORDER BY product_count DESC
// LIMIT 12;
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getTotalProductsbyBrands = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield prisma.$queryRaw `
        SELECT brand, COUNT(*) as product_count
        FROM \`Product\`
        GROUP BY brand
        ORDER BY product_count DESC
        LIMIT 12;
    `;
    console.log(result);
    const result_string = JSON.stringify(result, (key, value) => typeof value === 'bigint' ? value.toString() : value // Convert BigInt to a string
    );
    result = JSON.parse(result_string);
    res.json({
        status: "success",
        data: result
    });
});
exports.default = getTotalProductsbyBrands;
