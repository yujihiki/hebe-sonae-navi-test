-- CreateTable
CREATE TABLE "public"."DiagnosisResult" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payload" JSONB NOT NULL,

    CONSTRAINT "DiagnosisResult_pkey" PRIMARY KEY ("id")
);
