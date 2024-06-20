-- CreateEnum
CREATE TYPE "OrganizationStatus" AS ENUM ('ACTIVE', 'DEACTIVATED');

-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "status" "OrganizationStatus" NOT NULL DEFAULT 'ACTIVE';
