-- DropForeignKey
ALTER TABLE "PostTags" DROP CONSTRAINT "PostTags_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostTags" DROP CONSTRAINT "PostTags_tagName_fkey";

-- AddForeignKey
ALTER TABLE "PostTags" ADD CONSTRAINT "PostTags_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTags" ADD CONSTRAINT "PostTags_tagName_fkey" FOREIGN KEY ("tagName") REFERENCES "Tags"("name") ON DELETE CASCADE ON UPDATE CASCADE;
