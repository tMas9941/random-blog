-- AlterTable
ALTER TABLE "Comments" ADD COLUMN     "parentCommentId" TEXT,
ALTER COLUMN "postId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_parentCommentId_fkey" FOREIGN KEY ("parentCommentId") REFERENCES "Comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
