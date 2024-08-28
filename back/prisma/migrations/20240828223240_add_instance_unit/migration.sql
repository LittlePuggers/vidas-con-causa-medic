/*
  Warnings:

  - You are about to drop the column `qty` on the `Instance` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `Instance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `Instance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Instance` DROP COLUMN `qty`,
    ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `unit` VARCHAR(191) NOT NULL;
