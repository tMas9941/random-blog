/*
  Warnings:

  - You are about to drop the `Votes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Votes" DROP CONSTRAINT "Votes_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Votes" DROP CONSTRAINT "Votes_postId_fkey";

-- DropForeignKey
ALTER TABLE "Votes" DROP CONSTRAINT "Votes_userId_fkey";

-- DropTable
DROP TABLE "Votes";

-- CreateTable
CREATE TABLE "PostVotes" (
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "positive" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "PostVotes_pkey" PRIMARY KEY ("userId","postId")
);

-- CreateTable
CREATE TABLE "CommentVotes" (
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "positive" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "CommentVotes_pkey" PRIMARY KEY ("userId","commentId")
);

-- AddForeignKey
ALTER TABLE "PostVotes" ADD CONSTRAINT "PostVotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostVotes" ADD CONSTRAINT "PostVotes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentVotes" ADD CONSTRAINT "CommentVotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentVotes" ADD CONSTRAINT "CommentVotes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
