/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Roles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Roles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Roles" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Roles_userId_key" ON "Roles"("userId");

-- AddForeignKey
ALTER TABLE "Roles" ADD CONSTRAINT "Roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
