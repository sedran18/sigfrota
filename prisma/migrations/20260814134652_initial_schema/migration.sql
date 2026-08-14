-- CreateEnum
CREATE TYPE "VehicleFuelType" AS ENUM ('DIESEL_S10', 'DIESEL_COMUM', 'GASOLINA', 'ETANOL', 'FLEX');

-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('ETANOL', 'DIESEL_COMUM', 'DIESEL_S10', 'GASOLINA_ADITIVADA', 'GASOLINA_COMUM');

-- CreateEnum
CREATE TYPE "ConservationStatus" AS ENUM ('GOOD', 'UNDER_MAINTENANCE', 'DEFFECTED');

-- CreateEnum
CREATE TYPE "RequestStatusSchema" AS ENUM ('PENDING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drivers" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "phone" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" UUID NOT NULL,
    "plate" VARCHAR(7) NOT NULL,
    "model" VARCHAR(100) NOT NULL,
    "brand" VARCHAR(50) NOT NULL,
    "year" INTEGER NOT NULL,
    "fuel_type" "VehicleFuelType" NOT NULL DEFAULT 'GASOLINA',
    "tank_capacity" DECIMAL(10,2) NOT NULL,
    "conservation_status" "ConservationStatus" NOT NULL DEFAULT 'GOOD',
    "observation" VARCHAR(500),
    "average_consumption" DECIMAL(5,2) NOT NULL,
    "current_odometer" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gas_stations" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "cnpj" VARCHAR(18) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "address" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "gas_stations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contracts" (
    "id" UUID NOT NULL,
    "contract_number" TEXT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "gas_station_id" UUID NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contract_fuels" (
    "id" UUID NOT NULL,
    "contractId" UUID NOT NULL,
    "fuel_type" "FuelType" NOT NULL,
    "price_per_liter" DECIMAL(5,2) NOT NULL,
    "liters_contracted" DECIMAL(11,2) NOT NULL,
    "liters_available" DECIMAL(11,2) NOT NULL,
    "liters_consumed" DECIMAL(11,2) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "contract_fuels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fueling_requests" (
    "id" UUID NOT NULL,
    "vehicle_id" UUID NOT NULL,
    "driver_id" UUID NOT NULL,
    "contract_fuel_id" UUID NOT NULL,
    "created_by" UUID NOT NULL,
    "liters" TEXT NOT NULL,
    "fuel_type" "FuelType" NOT NULL,
    "odometer" INTEGER NOT NULL,
    "status" "RequestStatusSchema" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "fueling_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fuelings" (
    "id" UUID NOT NULL,
    "vehicle_id" UUID NOT NULL,
    "driver_id" UUID NOT NULL,
    "request_id" UUID NOT NULL,
    "contract_fuel_id" UUID NOT NULL,
    "created_by" UUID NOT NULL,
    "fuel_type" "FuelType" NOT NULL,
    "odometer" INTEGER NOT NULL,
    "liters" DECIMAL(6,2) NOT NULL,
    "price_per_liter" DECIMAL(6,3) NOT NULL,
    "total_amount" DECIMAL(10,2) NOT NULL,
    "distance_traveled" INTEGER NOT NULL,
    "fuel_efficiency" DECIMAL(5,2) NOT NULL,
    "observations" VARCHAR(150),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "fuelings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_plate_key" ON "vehicles"("plate");

-- CreateIndex
CREATE UNIQUE INDEX "gas_stations_cnpj_key" ON "gas_stations"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "fuelings_request_id_key" ON "fuelings"("request_id");

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_gas_station_id_fkey" FOREIGN KEY ("gas_station_id") REFERENCES "gas_stations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract_fuels" ADD CONSTRAINT "contract_fuels_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contracts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fueling_requests" ADD CONSTRAINT "fueling_requests_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fueling_requests" ADD CONSTRAINT "fueling_requests_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fueling_requests" ADD CONSTRAINT "fueling_requests_contract_fuel_id_fkey" FOREIGN KEY ("contract_fuel_id") REFERENCES "contract_fuels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fueling_requests" ADD CONSTRAINT "fueling_requests_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fuelings" ADD CONSTRAINT "fuelings_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fuelings" ADD CONSTRAINT "fuelings_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fuelings" ADD CONSTRAINT "fuelings_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "fueling_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fuelings" ADD CONSTRAINT "fuelings_contract_fuel_id_fkey" FOREIGN KEY ("contract_fuel_id") REFERENCES "contract_fuels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fuelings" ADD CONSTRAINT "fuelings_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
