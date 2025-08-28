/*
  Warnings:

  - You are about to drop the column `roleName` on the `Users` table. All the data in the column will be lost.
  - Added the required column `role` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_roleName_fkey";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "roleName",
ADD COLUMN     "role" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_role_fkey" FOREIGN KEY ("role") REFERENCES "Roles"("name") ON DELETE CASCADE ON UPDATE CASCADE;
