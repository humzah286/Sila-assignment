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
exports.populateReviews = exports.populateProducts = exports.populateRatings = void 0;
const client_1 = require("@prisma/client");
const fs_1 = require("fs");
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_2 = __importDefault(require("fs"));
const stream_1 = require("stream");
const stream_json_1 = require("stream-json");
const StreamArray_1 = require("stream-json/streamers/StreamArray");
const prisma = new client_1.PrismaClient();
const batch_size = 3000;
const process_csv = (filePath, processData) => __awaiter(void 0, void 0, void 0, function* () {
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
            if (dataArray.length > 0) {
                processData(dataArray);
            }
            resolve();
        })
            .on('error', (error) => reject(error));
    });
});
const process_json = (filePath, processData) => {
    const readStream = fs_2.default.createReadStream(filePath.toString());
    const processingStream = (0, StreamArray_1.streamArray)();
    let index = 0;
    let dataArray = [];
    processingStream.on('data', ({ key, value }) => {
        index++;
        if (index < batch_size) {
            dataArray.push(value);
        }
        else {
            processData(dataArray);
            index = 0;
            dataArray = [];
        }
    });
    // Handling errors and the end of the stream
    processingStream.on('error', console.error);
    processingStream.on('end', () => {
        if (dataArray.length > 0) {
            processData(dataArray);
        }
        console.log('Done processing JSON');
    });
    // Setting up the pipeline
    (0, stream_1.pipeline)(readStream, (0, stream_json_1.parser)(), processingStream, (err) => {
        if (err) {
            console.error('Pipeline failed.', err);
        }
        else {
            console.log('Pipeline succeeded.');
        }
    });
};
const populateRatings = (filePath) => {
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
exports.populateRatings = populateRatings;
const populateProducts = (filePath) => {
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
exports.populateProducts = populateProducts;
const populateReviews = (filePath) => {
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
exports.populateReviews = populateReviews;
