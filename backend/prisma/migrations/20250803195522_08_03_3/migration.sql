/*
  Warnings:

  - The primary key for the `Tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Tags` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostTags" DROP CONSTRAINT "PostTags_tagId_fkey";

-- AlterTable
ALTER TABLE "Tags" DROP CONSTRAINT "Tags_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Tags_pkey" PRIMARY KEY ("name");

-- AddForeignKey
ALTER TABLE "PostTags" ADD CONSTRAINT "PostTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tags"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
