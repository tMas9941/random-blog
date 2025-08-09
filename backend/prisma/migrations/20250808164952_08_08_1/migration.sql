/*
  Warnings:

  - Added the required column `userId` to the `Votes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Votes" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
