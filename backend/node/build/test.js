"use strict";
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
// import { PrismaClient } from '@prisma/client';
const promises_1 = require("fs/promises");
const fs_1 = require("fs");
const csvParser = require('csv-parser');
const basePath = "data/";
function readJsonFile(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, promises_1.readFile)(filePath, 'utf8');
        return JSON.parse(data);
    });
}
function readCsvFile(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = [];
        return new Promise((resolve, reject) => {
            (0, fs_1.createReadStream)(filePath)
                .pipe(csvParser())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                resolve(results);
            })
                .on('error', (error) => reject(error));
        });
    });
}
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield readJsonFile(basePath + "Appliances_5.json");
    const ratings = yield readCsvFile(basePath + "Appliances-reviews.csv");
    const products = yield readJsonFile(basePath + "meta_Appliances.json");
    console.log("reviews : ", reviews);
    console.log("ratings : ", ratings);
    console.log("products : ", products);
});
main();
