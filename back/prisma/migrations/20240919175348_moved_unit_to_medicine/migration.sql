/*
  Warnings:

  - You are about to drop the column `unit` on the `Instance` table. All the data in the column will be lost.
  - Added the required column `unit` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Instance` DROP COLUMN `unit`;

-- AlterTable
ALTER TABLE `Medicine` ADD COLUMN `unit` VARCHAR(191) NOT NULL;
