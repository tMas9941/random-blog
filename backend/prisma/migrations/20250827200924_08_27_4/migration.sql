/*
  Warnings:

  - You are about to drop the column `userId` on the `Roles` table. All the data in the column will be lost.
  - Added the required column `roleName` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Roles" DROP CONSTRAINT "Roles_userId_fkey";

-- DropIndex
DROP INDEX "Roles_userId_key";

-- AlterTable
ALTER TABLE "Roles" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "roleName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_roleName_fkey" FOREIGN KEY ("roleName") REFERENCES "Roles"("name") ON DELETE CASCADE ON UPDATE CASCADE;
