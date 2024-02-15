
import { PrismaClient } from '@prisma/client';
import { createReadStream } from 'fs';
import csvParser from 'csv-parser';
import fs from 'fs';
import { pipeline } from 'stream';
import { parser } from 'stream-json';
import { streamArray } from 'stream-json/streamers/StreamArray';

const prisma = new PrismaClient()

const batch_size = 3000


const process_csv = async (filePath: string, processData: Function): Promise<void> => {

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

const process_json = (filePath: String, processData: Function) => {

    const readStream = fs.createReadStream(filePath.toString());

    const processingStream = streamArray();

    let index = 0;
    let dataArray: any = []

    processingStream.on('data', ({ key, value }: { key: number, value: JSON }) => {
        index++;
        if (index < batch_size) {
            dataArray.push(value)
        } else {
            processData(dataArray)
            index = 0
            dataArray = []
        }

    });

    // Handling errors and the end of the stream
    processingStream.on('error', console.error);
    processingStream.on('end', () => {
        if (dataArray.length > 0) {
            processData(dataArray)
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

export { populateRatings, populateProducts, populateReviews }
