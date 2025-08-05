/*
  Warnings:

  - The primary key for the `PostTags` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "PostTags" DROP CONSTRAINT "PostTags_pkey",
ADD CONSTRAINT "PostTags_pkey" PRIMARY KEY ("postId", "tagId");
