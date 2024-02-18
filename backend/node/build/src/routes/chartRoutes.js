"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getTotalCompanyRatings_1 = __importDefault(require("../controllers/charts/getTotalCompanyRatings"));
const getTotalProductsbyBrands_1 = __importDefault(require("../controllers/charts/getTotalProductsbyBrands"));
const getTotalReviewsperYear_1 = __importDefault(require("../controllers/charts/getTotalReviewsperYear"));
const getAverageRatings_1 = __importDefault(require("../controllers/charts/getAverageRatings"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/get-brands-with-most-ratings", getTotalCompanyRatings_1.default);
router.get("/get-brands-with-most-products", getTotalProductsbyBrands_1.default);
router.get("/get-total-reviews-per-year", getTotalReviewsperYear_1.default);
router.get("/get-average-ratings", getAverageRatings_1.default);
exports.default = router;
