/*
  Warnings:

  - The primary key for the `RolePermissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roleId` on the `RolePermissions` table. All the data in the column will be lost.
  - The primary key for the `Roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Roles` table. All the data in the column will be lost.
  - Added the required column `roleName` to the `RolePermissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RolePermissions" DROP CONSTRAINT "RolePermissions_roleId_fkey";

-- AlterTable
ALTER TABLE "RolePermissions" DROP CONSTRAINT "RolePermissions_pkey",
DROP COLUMN "roleId",
ADD COLUMN     "roleName" TEXT NOT NULL,
ADD CONSTRAINT "RolePermissions_pkey" PRIMARY KEY ("roleName", "action", "subject");

-- AlterTable
ALTER TABLE "Roles" DROP CONSTRAINT "Roles_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Roles_pkey" PRIMARY KEY ("name");

-- AddForeignKey
ALTER TABLE "RolePermissions" ADD CONSTRAINT "RolePermissions_roleName_fkey" FOREIGN KEY ("roleName") REFERENCES "Roles"("name") ON DELETE CASCADE ON UPDATE CASCADE;
