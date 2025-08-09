/*
  Warnings:

  - You are about to drop the column `parentCommentId` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `commentId` on the `Votes` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Votes` table. All the data in the column will be lost.
  - Added the required column `commentedOnId` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `votedOnId` to the `Votes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_parentCommentId_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_postId_fkey";

-- DropForeignKey
ALTER TABLE "Votes" DROP CONSTRAINT "Votes_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Votes" DROP CONSTRAINT "Votes_postId_fkey";

-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "parentCommentId",
DROP COLUMN "postId",
ADD COLUMN     "commentedOnId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Votes" DROP COLUMN "commentId",
DROP COLUMN "postId",
ADD COLUMN     "votedOnId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "commentedOnId_postId" FOREIGN KEY ("commentedOnId") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "commentedOnId_commentId" FOREIGN KEY ("commentedOnId") REFERENCES "Comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "votedOnId_postId" FOREIGN KEY ("votedOnId") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "votedOnId_commentId" FOREIGN KEY ("votedOnId") REFERENCES "Comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
