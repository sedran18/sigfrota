/*
  Warnings:

  - You are about to drop the `FuelingRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FuelingRequest" DROP CONSTRAINT "FuelingRequest_contractFuelId_fkey";

-- DropForeignKey
ALTER TABLE "FuelingRequest" DROP CONSTRAINT "FuelingRequest_driverId_fkey";

-- DropForeignKey
ALTER TABLE "FuelingRequest" DROP CONSTRAINT "FuelingRequest_vehicleId_fkey";

-- DropTable
DROP TABLE "FuelingRequest";

-- CreateTable
CREATE TABLE "fueling_requests" (
    "id" UUID NOT NULL,
    "vehicleId" UUID NOT NULL,
    "driverId" UUID NOT NULL,
    "contractFuelId" UUID NOT NULL,
    "liters" TEXT NOT NULL,
    "fuelType" "FuelType" NOT NULL,
    "odometer" INTEGER NOT NULL,
    "status" "RequestStatusSchema" NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "fueling_requests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fueling_requests" ADD CONSTRAINT "fueling_requests_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fueling_requests" ADD CONSTRAINT "fueling_requests_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fueling_requests" ADD CONSTRAINT "fueling_requests_contractFuelId_fkey" FOREIGN KEY ("contractFuelId") REFERENCES "contract_fuels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
