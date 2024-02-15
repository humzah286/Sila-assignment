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
const path_1 = __importDefault(require("path"));
const client_1 = __importDefault(require("./client"));
const helper_1 = require("./helper");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Start seeding ...`);
    const productsFilePath = path_1.default.join(__dirname, '..', 'data', 'output.json');
    (0, helper_1.populateProducts)(productsFilePath);
    const reviewsfilePath = path_1.default.join(__dirname, '..', 'data', 'Appliances_5.json');
    (0, helper_1.populateReviews)(reviewsfilePath);
    const ratingsFilePath = path_1.default.join(__dirname, '..', 'data', 'Appliances-reviews.csv');
    (0, helper_1.populateRatings)(ratingsFilePath);
    console.log(`Seeding finished.`);
});
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield client_1.default.$disconnect();
}));
