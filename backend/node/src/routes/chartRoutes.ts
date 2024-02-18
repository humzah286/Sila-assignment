
import getTopBrandsWithMostRatedProducts from '../controllers/charts/getTotalCompanyRatings'
import getTotalProductsbyBrands from '../controllers/charts/getTotalProductsbyBrands';
import getTotalReviewsperYear from '../controllers/charts/getTotalReviewsperYear';
import getAverageRatings from '../controllers/charts/getAverageRatings';

import express from "express";
const router = express.Router();

import verifyJWT from "../middleware/authJWT";


router.get("/get-brands-with-most-ratings", getTopBrandsWithMostRatedProducts);
router.get("/get-brands-with-most-products", getTotalProductsbyBrands)
router.get("/get-total-reviews-per-year", getTotalReviewsperYear);
router.get("/get-average-ratings", getAverageRatings);

export default router;
