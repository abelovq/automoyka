/*
  Warnings:

  - Added the required column `num_box` to the `Busy_boxes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `num_car` to the `Busy_boxes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Busy_boxes" ADD COLUMN     "num_box" INTEGER NOT NULL,
ADD COLUMN     "num_car" TEXT NOT NULL;
