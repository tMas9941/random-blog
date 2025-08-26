-- DropForeignKey
ALTER TABLE "CommentVotes" DROP CONSTRAINT "CommentVotes_userId_fkey";

-- AddForeignKey
ALTER TABLE "CommentVotes" ADD CONSTRAINT "CommentVotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
