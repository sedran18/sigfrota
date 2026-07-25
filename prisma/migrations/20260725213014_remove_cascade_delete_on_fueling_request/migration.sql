-- DropForeignKey
ALTER TABLE "FuelingRequest" DROP CONSTRAINT "FuelingRequest_contractFuelId_fkey";

-- DropForeignKey
ALTER TABLE "FuelingRequest" DROP CONSTRAINT "FuelingRequest_driverId_fkey";

-- DropForeignKey
ALTER TABLE "FuelingRequest" DROP CONSTRAINT "FuelingRequest_vehicleId_fkey";

-- AddForeignKey
ALTER TABLE "FuelingRequest" ADD CONSTRAINT "FuelingRequest_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FuelingRequest" ADD CONSTRAINT "FuelingRequest_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FuelingRequest" ADD CONSTRAINT "FuelingRequest_contractFuelId_fkey" FOREIGN KEY ("contractFuelId") REFERENCES "contract_fuels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
