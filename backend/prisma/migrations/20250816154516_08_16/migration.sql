/*
  Warnings:

  - You are about to drop the column `positive` on the `CommentVotes` table. All the data in the column will be lost.
  - Added the required column `vote` to the `CommentVotes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CommentVotes" DROP COLUMN "positive",
ADD COLUMN     "vote" INTEGER NOT NULL;
