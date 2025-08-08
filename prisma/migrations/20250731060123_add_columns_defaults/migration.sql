/*
  Warnings:

  - You are about to drop the column `createdAt` on the `DiagnosisResult` table. All the data in the column will be lost.
  - You are about to drop the column `payload` on the `DiagnosisResult` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."DiagnosisResult" DROP COLUMN "createdAt",
DROP COLUMN "payload",
ADD COLUMN     "adviceResult" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "allergy" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "care" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "coldSensitive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "diagnosisDatetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "disability" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "dislikeInsects" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "emergencyBagResult" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "familyInfo" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "firePreventionConcern" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "furnitureSecuringConcern" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "germSensitive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasCar" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "heatSensitive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hnMemberId" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "homeBattery" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "illness" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "insuranceConcern" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "otherPower" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "petCatCount" INTEGER DEFAULT 0,
ADD COLUMN     "petDogCount" INTEGER DEFAULT 0,
ADD COLUMN     "petEvacuationConcern" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "petOtherCount" INTEGER DEFAULT 0,
ADD COLUMN     "pickyEater" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "portablePower" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "postDisasterActionConcern" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "relationship" TEXT DEFAULT '',
ADD COLUMN     "rollingStock" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "safetyConfirmationConcern" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "solarPower" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "storageLocationConcern" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "suppliesResult" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "sweetTooth" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "typhoonPreparationConcern" BOOLEAN NOT NULL DEFAULT false;
