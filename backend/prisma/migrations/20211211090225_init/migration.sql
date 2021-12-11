-- CreateEnum
CREATE TYPE "CarWashType" AS ENUM ('CONTACT', 'MANUAL', 'SELF_SERVICE', 'FERRY', 'ROBOT');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "car_number" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car_Wash" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "review_score" INTEGER NOT NULL,
    "coordinates" TEXT NOT NULL,
    "type" "CarWashType" NOT NULL,

    CONSTRAINT "Car_Wash_pkey" PRIMARY KEY ("id")
);
