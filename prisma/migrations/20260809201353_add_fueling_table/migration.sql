-- CreateTable
CREATE TABLE "fuelings" (
    "id" UUID NOT NULL,
    "vehicleId" UUID NOT NULL,
    "driverId" UUID NOT NULL,
    "requestId" UUID NOT NULL,
    "contract_fuel_id" UUID NOT NULL,
    "fuel_type" "FuelType" NOT NULL,
    "odometer" INTEGER NOT NULL,
    "liters" DECIMAL(6,2) NOT NULL,
    "price_per_liter" DECIMAL(6,3) NOT NULL,
    "total_amount" DECIMAL(10,2) NOT NULL,
    "distance_traveled" INTEGER NOT NULL,
    "fuel_efficiency" DECIMAL(5,2) NOT NULL,
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
ALTER TABLE "fuelings" ADD CONSTRAINT "fuelings_contract_fuel_id_fkey" FOREIGN KEY ("contract_fuel_id") REFERENCES "contract_fuels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
