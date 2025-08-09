/*
  Warnings:

  - You are about to drop the column `commentedOnId` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `votedOnId` on the `Votes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "commentedOnId_commentId";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "commentedOnId_postId";

-- DropForeignKey
ALTER TABLE "Votes" DROP CONSTRAINT "votedOnId_commentId";

-- DropForeignKey
ALTER TABLE "Votes" DROP CONSTRAINT "votedOnId_postId";

-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "commentedOnId",
ADD COLUMN     "commentId" TEXT,
ADD COLUMN     "postId" TEXT;

-- AlterTable
ALTER TABLE "Votes" DROP COLUMN "votedOnId",
ADD COLUMN     "commentId" TEXT,
ADD COLUMN     "postId" TEXT;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
