/*
  Warnings:

  - The primary key for the `Permissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Permissions` table. All the data in the column will be lost.
  - The primary key for the `RolePermissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `permissionId` on the `RolePermissions` table. All the data in the column will be lost.
  - Added the required column `action` to the `RolePermissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `RolePermissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RolePermissions" DROP CONSTRAINT "RolePermissions_permissionId_fkey";

-- AlterTable
ALTER TABLE "Permissions" DROP CONSTRAINT "Permissions_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Permissions_pkey" PRIMARY KEY ("action", "subject");

-- AlterTable
ALTER TABLE "RolePermissions" DROP CONSTRAINT "RolePermissions_pkey",
DROP COLUMN "permissionId",
ADD COLUMN     "action" "PermissionActions" NOT NULL,
ADD COLUMN     "subject" "PermissionSubjects" NOT NULL,
ADD CONSTRAINT "RolePermissions_pkey" PRIMARY KEY ("roleId", "action", "subject");

-- AddForeignKey
ALTER TABLE "RolePermissions" ADD CONSTRAINT "RolePermissions_action_subject_fkey" FOREIGN KEY ("action", "subject") REFERENCES "Permissions"("action", "subject") ON DELETE CASCADE ON UPDATE CASCADE;
