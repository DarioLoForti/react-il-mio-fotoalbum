/*
  Warnings:

  - You are about to drop the column `image_profile` on the `message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `message` DROP COLUMN `image_profile`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `image_profile` VARCHAR(191) NULL;
