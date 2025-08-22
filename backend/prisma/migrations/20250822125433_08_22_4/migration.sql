/*
  Warnings:

  - You are about to drop the column `userId` on the `Profiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[prfileUserId]` on the table `Profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `prfileUserId` to the `Profiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profiles" DROP CONSTRAINT "Profiles_userId_fkey";

-- DropIndex
DROP INDEX "Profiles_userId_key";

-- AlterTable
ALTER TABLE "Profiles" DROP COLUMN "userId",
ADD COLUMN     "prfileUserId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_prfileUserId_key" ON "Profiles"("prfileUserId");

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_prfileUserId_fkey" FOREIGN KEY ("prfileUserId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
