/*
  Warnings:

  - The `coordinates` column on the `Car_Wash` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Car_Wash" ALTER COLUMN "image_url" DROP NOT NULL,
ALTER COLUMN "review_score" DROP NOT NULL,
DROP COLUMN "coordinates",
ADD COLUMN     "coordinates" DOUBLE PRECISION[];
