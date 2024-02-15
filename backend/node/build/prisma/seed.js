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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_1 = require("fs");
const csv_parser_1 = __importDefault(require("csv-parser"));
const path = require('path');
const fs = require('fs');
const { pipeline } = require('stream');
const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/StreamArray');
const prisma = new client_1.PrismaClient();
const basePath = "/data/";
const batch_size = 1000;
// async function readJsonFile(filePath: string): Promise<any[]> {
//   const data = await readFile(filePath, 'utf8');
//   return JSON.parse(data);
// }
function process_csv(filePath, processData) {
    return __awaiter(this, void 0, void 0, function* () {
        let index = 0;
        let dataArray = [];
        return new Promise((resolve, reject) => {
            (0, fs_1.createReadStream)(filePath)
                .pipe((0, csv_parser_1.default)())
                .on('data', (data) => {
                index++;
                if (index < batch_size)
                    dataArray.push(data);
                else {
                    processData(dataArray);
                    index = 0;
                    dataArray = [];
                }
            })
                .on('end', () => {
                resolve();
            })
                .on('error', (error) => reject(error));
        });
    });
}
const process_json = (filePath, processing_function) => {
    const readStream = fs.createReadStream(filePath.toString());
    const processingStream = streamArray();
    processingStream.on('data', ({ key, value }) => {
        let index = 0;
        let dataArray = [];
        if (index < batch_size) {
            dataArray.push(value);
        }
        else {
            processing_function(dataArray);
            index = 0;
            dataArray = [];
        }
    });
    // Handling errors and the end of the stream
    processingStream.on('error', console.error);
    processingStream.on('end', () => console.log('Done processing JSON'));
    // Setting up the pipeline
    pipeline(readStream, parser(), processingStream, (err) => {
        if (err) {
            console.error('Pipeline failed.', err);
        }
        else {
            console.log('Pipeline succeeded.');
        }
    });
};
const populateRatings = (filePath) => {
    const add_rating_data = (data) => __awaiter(void 0, void 0, void 0, function* () {
        prisma.rating.create({
            data: {
                item: data.item,
                user: data.user,
                rating: parseFloat(data.rating),
                timestamp: parseInt(data.timestamp)
            }
        }).then((rating) => {
            console.log(`Created rating with ID: ${rating.id}`);
        }).catch((e) => {
            console.error(e);
        });
    });
    const add_rating_data_batch = (data) => __awaiter(void 0, void 0, void 0, function* () {
        let ratings = data.map((d) => {
            return {
                item: d.item,
                user: d.user,
                rating: parseFloat(d.rating),
                timestamp: parseInt(d.timestamp)
            };
        });
        prisma.rating.createMany({
            data: ratings
        }).then((ratings) => {
            console.log(`Created ${ratings.count} ratings`);
        }).catch((e) => {
            console.error(e);
        });
    });
    process_csv(filePath, add_rating_data_batch);
};
const populateProducts = (filePath) => {
    const add_meta_data = (data) => __awaiter(void 0, void 0, void 0, function* () {
        let maxLengthAllowed = 300;
        if (data.price && data.price.length > maxLengthAllowed) {
            // Truncate the price or handle accordingly
            console.log("THIS PRICE IS TOO LONG: ", data.price.length, data.price);
            return;
        }
        // check length for product as well
        if (data.title && data.title.length > maxLengthAllowed) {
            console.log("THIS TITLE IS TOO LONG: ", data.title.length, data.title);
            return;
        }
        if (!data.date || data.date.length > 20) {
            console.log("THIS DATE IS TOO LONG: ", data.date.length, data.date);
            return;
        }
        if (typeof data.rank === 'string') {
            data.rank = [data.rank];
        }
        try {
            let found = yield prisma.product.findUnique({
                where: {
                    asin: data.asin
                }
            });
            if (found) {
                console.log(`Product with ASIN: ${data.asin} already exists`);
                return;
            }
            prisma.product.create({
                data: {
                    asin: data.asin,
                    title: data.title,
                    price: data.price,
                    brand: data.brand,
                    description: data.description,
                    main_cat: data.main_cat,
                    rank: data.rank,
                    feature: data.feature,
                    date: data.date
                }
            }).then((product) => {
                console.log(`Created product with ASIN: ${product.asin}`);
            }).catch((e) => {
                console.error(e);
            });
        }
        catch (e) {
            console.error(e);
        }
    });
    const validateValue = (value) => {
        if (value.price && value.price.length > 300) {
            return false;
        }
        if (value.title && value.title.length > 300) {
            return false;
        }
        if (!value.date || value.date.length > 20) {
            return false;
        }
        if (typeof value.rank === 'string') {
            value.rank = [value.rank];
        }
        return true;
    };
    const add_meta_data_batch = (data) => __awaiter(void 0, void 0, void 0, function* () {
        let temp = data.filter((d) => {
            return validateValue(d);
        });
        let products = temp.map((d) => {
            return {
                asin: d.asin,
                title: d.title,
                price: d.price,
                brand: d.brand,
                description: d.description,
                main_cat: d.main_cat,
                rank: d.rank,
                feature: d.feature,
                date: d.date
            };
        });
        prisma.product.createMany({
            data: products
        }).then((products) => {
            console.log(`Created ${products.count} products`);
        }).catch((e) => {
            console.error(e);
        });
    });
    process_json(filePath, add_meta_data_batch);
};
const populateReviews = (filePath) => {
    const add_review_data = (data) => __awaiter(void 0, void 0, void 0, function* () {
        prisma.review.create({
            data: {
                id: data.id,
                overall: data.overall,
                verified: data.verified,
                reviewTime: data.reviewTime,
                reviewerID: data.reviewerID,
                asin: data.asin,
                style: data.style,
                reviewerName: data.reviewerName,
                reviewText: data.reviewText,
                summary: data.summary,
                unixReviewTime: data.unixReviewTime
            }
        }).then((review) => {
            console.log(`Created review with ID: ${review.id}`);
        }).catch((e) => {
            console.error(e);
        });
    });
    const validateValue = (value) => {
        if (value.id && value.id.length > 100) {
            return false;
        }
        return true;
    };
    const add_review_data_batch = (data) => __awaiter(void 0, void 0, void 0, function* () {
        let temp = data.filter((d) => {
            return validateValue(d);
        });
        let reviews = temp.map((d) => {
            return {
                id: d.id,
                overall: d.overall,
                verified: d.verified,
                reviewTime: d.reviewTime,
                reviewerID: d.reviewerID,
                asin: d.asin,
                style: d.style,
                reviewerName: d.reviewerName,
                reviewText: d.reviewText,
                summary: d.summary,
                unixReviewTime: parseInt(d.unixReviewTime)
            };
        });
        prisma.review.createMany({
            data: reviews
        }).then((reviews) => {
            console.log(`Created ${reviews.count} reviews`);
        }).catch((e) => {
            console.error(e);
        });
    });
    process_json(filePath, add_review_data_batch);
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Start seeding ...`);
        let productsFilePath = path.join(__dirname, '..', 'data', 'output.json');
        populateProducts(productsFilePath);
        let reviewsfilePath = path.join(__dirname, '..', 'data', 'Appliances_5.json');
        populateReviews(reviewsfilePath);
        let ratingsFilePath = path.join(__dirname, '..', 'data', 'Appliances-reviews.csv');
        populateRatings(ratingsFilePath);
        console.log(`Seeding finished.`);
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
