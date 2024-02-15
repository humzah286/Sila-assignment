import { PrismaClient } from '@prisma/client';
import { readFile } from 'fs/promises';
import { createReadStream } from 'fs';
import csvParser from 'csv-parser';
const path = require('path');
const fs = require('fs');
const { pipeline } = require('stream');
const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/StreamArray');

const prisma = new PrismaClient();

const basePath = "/data/"

const batch_size = 3000

// async function readJsonFile(filePath: string): Promise<any[]> {
//   const data = await readFile(filePath, 'utf8');
//   return JSON.parse(data);
// }

async function process_csv(filePath: string, processData: Function): Promise<void> {

  let index = 0;
  let dataArray: any = []

  return new Promise((resolve, reject) => {
    createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => {
        index++;
        if (index < batch_size) dataArray.push(data)
        else {
          processData(dataArray)
          index = 0
          dataArray = []
        }
      })
      .on('end', () => {
        if (dataArray.length > 0) {
          processData(dataArray)
        }
        resolve();
      })
      .on('error', (error) => reject(error));
  });
}

const process_json = (filePath: String, processing_function: Function) => {

  const readStream = fs.createReadStream(filePath.toString());
  console.log("Reading file, ", filePath.toString());

  const processingStream = streamArray();

  let index = 0;
  let dataArray: any = []

  processingStream.on('data', ({ key, value }: { key: number, value: JSON }) => {
    index++;
    if (index < batch_size) {
      dataArray.push(value)
    } else {
      processing_function(dataArray)
      index = 0
      dataArray = []
    }

  });

  // Handling errors and the end of the stream
  processingStream.on('error', console.error);
  processingStream.on('end', () => {
    if (dataArray.length > 0) {
      processing_function(dataArray)
    }
    console.log('Done processing JSON')
  });

  // Setting up the pipeline
  pipeline(
    readStream,
    parser(),
    processingStream,
    (err: any) => {
      if (err) {
        console.error('Pipeline failed.', err);
      } else {
        console.log('Pipeline succeeded.');
      }
    }
  );

}

const populateRatings = (filePath: string) => {

  const add_rating_data = async (data: any) => {

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
  }

  const add_rating_data_batch = async (data: any) => {
    let ratings = data.map((d: any) => {
      return {
        item: d.item,
        user: d.user,
        rating: parseFloat(d.rating),
        timestamp: parseInt(d.timestamp)
      }
    })

    prisma.rating.createMany({
      data: ratings
    }).then((ratings) => {
      console.log(`Created ${ratings.count} ratings`);
    }).catch((e) => {
      console.error(e);
    });
  }

  process_csv(filePath, add_rating_data_batch)
}


const populateProducts = (filePath: string) => {
  console.log("Populating products")

  const add_meta_data = async (data: any) => {

    let maxLengthAllowed = 300;
    if (data.price && data.price.length > maxLengthAllowed) {
      // Truncate the price or handle accordingly
      console.log("THIS PRICE IS TOO LONG: ", data.price.length, data.price)
      return
    }

    // check length for product as well
    if (data.title && data.title.length > maxLengthAllowed) {
      console.log("THIS TITLE IS TOO LONG: ", data.title.length, data.title)
      return
    }

    if (!data.date || data.date.length > 20) {
      console.log("THIS DATE IS TOO LONG: ", data.date.length, data.date)
      return
    }

    if (typeof data.rank === 'string') {
      data.rank = [data.rank]
    }

    try {

      let found = await prisma.product.findUnique({
        where: {
          asin: data.asin
        }
      })

      if (found) {
        console.log(`Product with ASIN: ${data.asin} already exists`);
        return
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
  }

  const validateValue = (value: any) => {
    if (value.price && value.price.length > 300) {
      return false
    }

    if (value.title && value.title.length > 300) {
      return false
    }

    if (!value.date || value.date.length > 20) {
      return false
    }

    if (typeof value.rank === 'string') {
      value.rank = [value.rank]
    }

    return true
  }

  const add_meta_data_batch = async (data: any) => {

    let temp = data.filter((d: any) => {
      return validateValue(d)
    })

    let products = temp.map((d: any) => {
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
      }
    })

    prisma.product.createMany({
      data: products
    }).then((products) => {
      console.log(`Created ${products.count} products`);
    }).catch((e) => {
      console.error(e);
    });
  }

  process_json(filePath, add_meta_data_batch)
}

const populateReviews = (filePath: string) => {
  console.log("Populating reviews")

  const add_review_data = async (data: any) => {

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
  }

  const validateValue = (value: any) => {
    if (value.id && value.id.length > 100) {
      return false
    }

    return true
  }

  const add_review_data_batch = async (data: any) => {
    let temp = data.filter((d: any) => {
      return validateValue(d)
    })

    let reviews = temp.map((d: any) => {
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
      }
    })
    
    prisma.review.createMany({
      data: reviews
    }).then((reviews) => {
      console.log(`Created ${reviews.count} reviews`);
    }).catch((e) => {
      console.error(e);
    });
  }

  process_json(filePath, add_review_data_batch)
}

async function main() {
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
