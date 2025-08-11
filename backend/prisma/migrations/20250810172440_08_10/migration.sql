/*
  Warnings:

  - You are about to drop the column `positive` on the `PostVotes` table. All the data in the column will be lost.
  - Added the required column `vote` to the `PostVotes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PostVotes" DROP CONSTRAINT "PostVotes_userId_fkey";

-- AlterTable
ALTER TABLE "PostVotes" DROP COLUMN "positive",
ADD COLUMN     "vote" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PostVotes" ADD CONSTRAINT "PostVotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
