-- CreateEnum
CREATE TYPE "VehicleFuelType" AS ENUM ('DIESEL_S10', 'DIESEL_COMUM', 'GASOLINA', 'ETANOL', 'FLEX');

-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('ETANOL', 'DIESEL_COMUM', 'DIESEL_S10', 'GASOLINA_ADITIVADA', 'GASOLINA_COMUM');

-- CreateEnum
CREATE TYPE "ConservationStatus" AS ENUM ('GOOD', 'UNDER_MAINTENANCE', 'DEFFECTED');

-- CreateTable
CREATE TABLE "drivers" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "phone" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" UUID NOT NULL,
    "plate" VARCHAR(7) NOT NULL,
    "model" VARCHAR(100) NOT NULL,
    "brand" VARCHAR(50) NOT NULL,
    "year" INTEGER NOT NULL,
    "fuelType" "VehicleFuelType" NOT NULL DEFAULT 'GASOLINA',
    "tankCapacity" DECIMAL(10,2) NOT NULL,
    "conservationStatus" "ConservationStatus" NOT NULL DEFAULT 'GOOD',
    "observation" VARCHAR(500) NOT NULL,
    "averageConsumption" DECIMAL(4,2) NOT NULL,
    "currentOdometer" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gas_stations" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "cnpj" VARCHAR(18) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "address" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "gas_stations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contracts" (
    "id" UUID NOT NULL,
    "contractNumber" INTEGER NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "gasStationId" UUID NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contract_fuels" (
    "id" UUID NOT NULL,
    "contractId" UUID NOT NULL,
    "fuelType" "FuelType" NOT NULL,
    "pricePerLiter" DECIMAL(5,2) NOT NULL,
    "litersContracted" DECIMAL(11,2) NOT NULL,
    "litersAvailable" DECIMAL(11,2) NOT NULL,
    "litersConsumed" DECIMAL(11,2) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "contract_fuels_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_plate_key" ON "vehicles"("plate");

-- CreateIndex
CREATE UNIQUE INDEX "gas_stations_cnpj_key" ON "gas_stations"("cnpj");

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_gasStationId_fkey" FOREIGN KEY ("gasStationId") REFERENCES "gas_stations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract_fuels" ADD CONSTRAINT "contract_fuels_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contracts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
