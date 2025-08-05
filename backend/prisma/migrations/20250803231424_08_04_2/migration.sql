/*
  Warnings:

  - The primary key for the `PostTags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tagId` on the `PostTags` table. All the data in the column will be lost.
  - Added the required column `tagName` to the `PostTags` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PostTags" DROP CONSTRAINT "PostTags_tagId_fkey";

-- AlterTable
ALTER TABLE "PostTags" DROP CONSTRAINT "PostTags_pkey",
DROP COLUMN "tagId",
ADD COLUMN     "tagName" TEXT NOT NULL,
ADD CONSTRAINT "PostTags_pkey" PRIMARY KEY ("postId", "tagName");

-- AddForeignKey
ALTER TABLE "PostTags" ADD CONSTRAINT "PostTags_tagName_fkey" FOREIGN KEY ("tagName") REFERENCES "Tags"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
