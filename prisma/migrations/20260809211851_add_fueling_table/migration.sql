-- CreateTable
CREATE TABLE "fuelings" (
    "id" UUID NOT NULL,
    "vehicleId" UUID NOT NULL,
    "driverId" UUID NOT NULL,
    "requestId" UUID NOT NULL,
    "contractFuelId" UUID NOT NULL,
    "fuelType" "FuelType" NOT NULL,
    "odometer" INTEGER NOT NULL,
    "liters" DECIMAL(6,2) NOT NULL,
    "pricePerLiter" DECIMAL(6,3) NOT NULL,
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "distanceTraveled" INTEGER NOT NULL,
    "fuelEfficiency" DECIMAL(5,2) NOT NULL,
    "observations" VARCHAR(150),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "fuelings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fuelings" ADD CONSTRAINT "fuelings_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fuelings" ADD CONSTRAINT "fuelings_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fuelings" ADD CONSTRAINT "fuelings_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "fueling_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fuelings" ADD CONSTRAINT "fuelings_contractFuelId_fkey" FOREIGN KEY ("contractFuelId") REFERENCES "contract_fuels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
