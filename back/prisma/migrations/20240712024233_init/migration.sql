/*
  Warnings:

  - Added the required column `bestUsedBy` to the `Medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `concentration` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Medicine` ADD COLUMN `bestUsedBy` VARCHAR(191) NOT NULL,
    ADD COLUMN `concentration` VARCHAR(191) NOT NULL;
