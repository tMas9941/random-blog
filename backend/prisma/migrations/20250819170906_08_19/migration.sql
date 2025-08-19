/*
  Warnings:

  - You are about to drop the column `vote` on the `CommentVotes` table. All the data in the column will be lost.
  - You are about to drop the column `vote` on the `PostVotes` table. All the data in the column will be lost.
  - Added the required column `value` to the `CommentVotes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `PostVotes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CommentVotes" DROP COLUMN "vote",
ADD COLUMN     "value" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "PostVotes" DROP COLUMN "vote",
ADD COLUMN     "value" BOOLEAN NOT NULL;
