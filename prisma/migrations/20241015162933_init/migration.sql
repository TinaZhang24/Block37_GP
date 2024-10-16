/*
  Warnings:

  - You are about to drop the column `email` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `partySize` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `date` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "partySize",
ADD COLUMN     "date" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CustomerToReservation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CustomerToReservation_AB_unique" ON "_CustomerToReservation"("A", "B");

-- CreateIndex
CREATE INDEX "_CustomerToReservation_B_index" ON "_CustomerToReservation"("B");

-- AddForeignKey
ALTER TABLE "_CustomerToReservation" ADD CONSTRAINT "_CustomerToReservation_A_fkey" FOREIGN KEY ("A") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToReservation" ADD CONSTRAINT "_CustomerToReservation_B_fkey" FOREIGN KEY ("B") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
