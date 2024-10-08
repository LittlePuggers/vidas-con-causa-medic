-- DropForeignKey
ALTER TABLE `Instance` DROP FOREIGN KEY `Instance_medicineId_fkey`;

-- AddForeignKey
ALTER TABLE `Instance` ADD CONSTRAINT `Instance_medicineId_fkey` FOREIGN KEY (`medicineId`) REFERENCES `Medicine`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
