/*
  Warnings:

  - Added the required column `image_profile` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `message` ADD COLUMN `image_profile` VARCHAR(191) NOT NULL;
