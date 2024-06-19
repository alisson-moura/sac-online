/*
  Warnings:

  - The values [ADMIN,GESTOR,ASSISTENTE,CLIENTE] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('Admin', 'Gestor', 'Assistente', 'Cliente');
ALTER TABLE "invites" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "members" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "invites" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TABLE "members" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "invites" ALTER COLUMN "role" SET DEFAULT 'Assistente';
ALTER TABLE "members" ALTER COLUMN "role" SET DEFAULT 'Assistente';
COMMIT;

-- AlterTable
ALTER TABLE "invites" ALTER COLUMN "role" SET DEFAULT 'Assistente';

-- AlterTable
ALTER TABLE "members" ALTER COLUMN "role" SET DEFAULT 'Assistente';
