/*
  Warnings:

  - You are about to drop the column `prfileUserId` on the `Profiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profileUserId]` on the table `Profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileUserId` to the `Profiles` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PermissionActions" AS ENUM ('CREATE', 'READ', 'UPDATE', 'DELETE');

-- CreateEnum
CREATE TYPE "PermissionSubjects" AS ENUM ('POSTS', 'COMMENTS', 'SETTINGS');

-- CreateEnum
CREATE TYPE "PermissionTarget" AS ENUM ('OWN', 'ALL');

-- DropForeignKey
ALTER TABLE "Profiles" DROP CONSTRAINT "Profiles_prfileUserId_fkey";

-- DropIndex
DROP INDEX "Profiles_prfileUserId_key";

-- AlterTable
ALTER TABLE "Profiles" DROP COLUMN "prfileUserId",
ADD COLUMN     "profileUserId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permissions" (
    "id" TEXT NOT NULL,
    "action" "PermissionActions" NOT NULL,
    "subject" "PermissionSubjects" NOT NULL,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolePermissions" (
    "roleId" TEXT NOT NULL,
    "target" "PermissionTarget" NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "RolePermissions_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_profileUserId_key" ON "Profiles"("profileUserId");

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_profileUserId_fkey" FOREIGN KEY ("profileUserId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermissions" ADD CONSTRAINT "RolePermissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermissions" ADD CONSTRAINT "RolePermissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
