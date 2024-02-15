import path from 'path';
import prisma from './client';

import { populateProducts, populateReviews, populateRatings } from './helper';


const main = async () => {
  console.log(`Start seeding ...`);

  const productsFilePath = path.join(__dirname, '..', 'data', 'output.json');
  populateProducts(productsFilePath)

  const reviewsfilePath = path.join(__dirname, '..', 'data', 'Appliances_5.json');
  populateReviews(reviewsfilePath)

  const ratingsFilePath = path.join(__dirname, '..', 'data', 'Appliances-reviews.csv');
  populateRatings(ratingsFilePath)

  console.log(`Seeding finished.`);
}

main()
.catch((e) => {
  console.error(e);
  process.exit(1);
})
.finally(async () => {
  await prisma.$disconnect();
});
