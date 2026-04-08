/*
  Warnings:

  - Added the required column `channel` to the `Prenotazione` table without a default value. This is not possible if the table is not empty.
  - Added the required column `depositOspite` to the `Prenotazione` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mailOspite` to the `Prenotazione` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityOspite` to the `Prenotazione` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quotationOspite` to the `Prenotazione` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Prenotazione` ADD COLUMN `channel` BOOLEAN NOT NULL,
    ADD COLUMN `depositOspite` DOUBLE NOT NULL,
    ADD COLUMN `mailOspite` VARCHAR(191) NOT NULL,
    ADD COLUMN `noteOspite` VARCHAR(191) NULL,
    ADD COLUMN `quantityOspite` INTEGER NOT NULL,
    ADD COLUMN `quotationOspite` DOUBLE NOT NULL;
