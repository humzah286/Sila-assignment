-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `overall` DOUBLE NOT NULL,
    `verified` BOOLEAN NOT NULL,
    `reviewTime` VARCHAR(191) NOT NULL,
    `reviewerID` VARCHAR(191) NOT NULL,
    `asin` VARCHAR(191) NOT NULL,
    `style` JSON NULL,
    `reviewerName` VARCHAR(191) NOT NULL,
    `reviewText` LONGTEXT NOT NULL,
    `summary` LONGTEXT NOT NULL,
    `unixReviewTime` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rating` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item` VARCHAR(191) NOT NULL,
    `user` VARCHAR(191) NOT NULL,
    `rating` DOUBLE NOT NULL,
    `timestamp` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `asin` VARCHAR(191) NOT NULL,
    `title` LONGTEXT NOT NULL,
    `brand` VARCHAR(191) NULL,
    `main_cat` VARCHAR(191) NULL,
    `description` JSON NULL,
    `feature` JSON NULL,
    `rank` JSON NULL,
    `date` VARCHAR(191) NULL,
    `price` VARCHAR(191) NULL,

    PRIMARY KEY (`asin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
