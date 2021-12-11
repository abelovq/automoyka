/*
  Warnings:

  - Added the required column `duration` to the `Car_Wash` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car_Wash" ADD COLUMN     "boxs_count" INTEGER NOT NULL DEFAULT 4,
ADD COLUMN     "duration" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Busy_boxes" (
    "id" SERIAL NOT NULL,
    "wash_id" INTEGER NOT NULL,
    "client_id" INTEGER NOT NULL,
    "time_start" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Busy_boxes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Busy_boxes" ADD CONSTRAINT "Busy_boxes_wash_id_fkey" FOREIGN KEY ("wash_id") REFERENCES "Car_Wash"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Busy_boxes" ADD CONSTRAINT "Busy_boxes_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
