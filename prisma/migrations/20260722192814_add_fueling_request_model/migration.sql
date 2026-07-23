-- CreateEnum
CREATE TYPE "RequesStatusSchema" AS ENUM ('PENDING', 'COMPLETED', 'CANCELED');

-- AlterTable
ALTER TABLE "vehicles" ALTER COLUMN "averageConsumption" SET DATA TYPE DECIMAL(5,2);

-- CreateTable
CREATE TABLE "FuelingRequest" (
    "id" UUID NOT NULL,
    "vehicleId" UUID NOT NULL,
    "driverId" UUID NOT NULL,
    "contractFuelId" UUID NOT NULL,
    "liters" DECIMAL(5,2) NOT NULL,
    "fuelType" "FuelType" NOT NULL,
    "odometer" INTEGER NOT NULL,
    "status" "RequesStatusSchema" NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "FuelingRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FuelingRequest" ADD CONSTRAINT "FuelingRequest_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FuelingRequest" ADD CONSTRAINT "FuelingRequest_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FuelingRequest" ADD CONSTRAINT "FuelingRequest_contractFuelId_fkey" FOREIGN KEY ("contractFuelId") REFERENCES "contract_fuels"("id") ON DELETE CASCADE ON UPDATE CASCADE;
